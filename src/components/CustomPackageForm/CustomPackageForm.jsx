"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL_V1}/api/custom-package-requests`;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s\-()]{6,20}$/;
const GENERIC_ERROR = "Something went wrong, please try again.";
const SUCCESS_FALLBACK = "Custom package request submitted successfully.";
// Form field names == API field names, so 422 errors map 1:1
const FORM_FIELDS = new Set(["airline_id", "name", "phone", "email", "travel_date", "makkah_hotel", "madinah_hotel", "preferred_transport", "adults", "children", "male", "female", "food_preference", "additional_note"]);
// Known backend 422 messages → Bangla; unknown messages fall back to server text
const SERVER_ERROR_BN = {
  "Name is required.": "আপনার নাম দেওয়া আবশ্যক।",
  "Your name is required.": "আপনার নাম দেওয়া আবশ্যক।",
  "Name must be a valid text.": "নামটি অবশ্যই সঠিক টেক্সট হতে হবে।",
  "Name may not be greater than 150 characters.": "নাম ১৫০ অক্ষরের বেশি হতে পারবে না।",
  "Phone number is required.": "ফোন নম্বর দেওয়া আবশ্যক।",
  "Phone number must be a valid text.": "ফোন নম্বরটি অবশ্যই সঠিক টেক্সট হতে হবে।",
  "Phone number may not be greater than 20 characters.": "ফোন নম্বর ২০ অক্ষরের বেশি হতে পারবে না।",
  "Phone number may only contain digits, spaces, +, - and ( )": "ফোন নম্বরে শুধু ডিজিট, স্পেস, +, - ও ( ) চিহ্ন ব্যবহার করা যাবে।",
  "Please provide a valid email address.": "সঠিক ইমেইল ঠিকানা দিন।",
  "Email may not be greater than 150 characters.": "ইমেইল ১৫০ অক্ষরের বেশি হতে পারবে না।",
};
// Defaults: adults 1 (min 1), children/male/female 0 (min 0)
const DEFAULT_VALUES = { airline_id: "", name: "", phone: "", email: "", travel_date: "", makkah_hotel: "", madinah_hotel: "", preferred_transport: "", adults: 1, children: 0, male: 0, female: 0, food_preference: "", additional_note: "" };

const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

const FieldError = ({ message }) => (message ? <p className="mt-1 text-sm text-red-600">{message}</p> : null);

const CustomPackageForm = ({ onClose, airlines = [], airlinesLoading = false }) => {
  const [successInfo, setSuccessInfo] = useState(null);
  const [formError, setFormError] = useState("");
  const bodyRef = useRef(null);
  const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: DEFAULT_VALUES });

  // Lock background scroll while the modal is open
  useEffect(() => {
    const scrollbar = window.innerWidth - document.body.offsetWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Scroll modal body back to top when the success view replaces the form
  useEffect(() => {
    if (successInfo) bodyRef.current?.scrollTo({ top: 0 });
  }, [successInfo]);

  const toInt = (value, fallback) => {
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const optional = (value) => (value?.trim() ? value.trim() : null);

  const onSubmit = async (data) => {
    setFormError("");
    const payload = {
      airline_id: data.airline_id ? toInt(data.airline_id, 0) || null : null,
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: optional(data.email),
      travel_date: optional(data.travel_date),
      makkah_hotel: optional(data.makkah_hotel),
      madinah_hotel: optional(data.madinah_hotel),
      preferred_transport: optional(data.preferred_transport),
      adults: Math.max(1, toInt(data.adults, 1)),
      children: Math.max(0, toInt(data.children, 0)),
      male: Math.max(0, toInt(data.male, 0)),
      female: Math.max(0, toInt(data.female, 0)),
      food_preference: optional(data.food_preference),
      additional_note: optional(data.additional_note),
    };

    try {
      // Accept: application/json is mandatory — without it a 422 returns HTML instead of JSON
      const res = await fetch(API_URL, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(payload) });

      let json = null;
      try { json = await res.json(); } catch { json = null; }

      // Success — HTTP 201 { status: "success", message, custom_package_request: { id } }
      if (res.ok && json?.status === "success") {
        setSuccessInfo({ message: json.message || SUCCESS_FALLBACK, id: json?.custom_package_request?.id ?? null });
        reset(DEFAULT_VALUES);
        return;
      }

      // Validation error — HTTP 422 { message, errors: { field: ["..."] } }
      if (res.status === 422 && json?.errors && typeof json.errors === "object") {
        const unknown = [];
        for (const [field, messages] of Object.entries(json.errors)) {
          const message = Array.isArray(messages) && messages.length ? String(messages[0]) : String(messages ?? "");
          if (!message) continue;
          if (FORM_FIELDS.has(field)) setError(field, { type: "server", message: SERVER_ERROR_BN[message] || message });
          else unknown.push(message);
        }
        setFormError(unknown.join(" ") || GENERIC_ERROR);
        return;
      }

      setFormError(GENERIC_ERROR); // 4xx / 5xx / network — generic message only
    } catch {
      setFormError(GENERIC_ERROR);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 px-4 py-6" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b">
          <div>
            <h3 className="text-xl font-bold text-gray-800">কাস্টমাইজড প্যাকেজ রিকোয়েস্ট</h3>
            <p className="text-sm text-gray-500 mt-1">আপনার পছন্দ অনুযায়ী প্যাকেজ তৈরির জন্য নিচের তথ্যগুলো দিন</p>
          </div>
          <button type="button" onClick={onClose} aria-label="বন্ধ করুন" className="text-gray-500 hover:text-gray-700 text-2xl leading-none p-1"><FaTimes /></button>
        </div>
        <div ref={bodyRef} className="p-5 overflow-y-auto">
          {successInfo ? (
            <div className="text-center py-8">
              <FaCheckCircle className="mx-auto w-16 h-16 text-green-500 mb-4" />
              <h4 className="text-lg font-bold text-gray-800 mb-2">আপনার অনুরোধ সফলভাবে জমা হয়েছে!</h4>
              <p className="text-gray-600">{successInfo.message}</p>
              {successInfo.id != null && <p className="text-sm text-gray-500 mt-1">Request ID: #{successInfo.id}</p>}
              <div className="flex items-center justify-center gap-3 mt-8">
                <button type="button" onClick={() => setSuccessInfo(null)} className="px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-300" style={{ background: "linear-gradient(90deg, #313881, #0678B4)" }}>আরেকটি অনুরোধ পাঠান</button>
                <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">বন্ধ করুন</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="cpr-airline" className={labelClass}>এয়ারলাইন পছন্দ (ঐচ্ছিক)</label>
                  <select id="cpr-airline" className={inputClass} {...register("airline_id")}>
                    <option value="">— কোনো পছন্দ নেই —</option>
                    {airlinesLoading && <option disabled>এয়ারলাইন লোড হচ্ছে...</option>}
                    {!airlinesLoading && airlines.map((airline) => <option key={airline.id} value={airline.id}>{airline.name}{airline.code ? ` (${airline.code})` : ""}</option>)}
                  </select>
                  <FieldError message={errors.airline_id?.message} />
                </div>
                <div>
                  <label htmlFor="cpr-name" className={labelClass}>আপনার নাম <span className="text-red-500">*</span></label>
                  <input type="text" id="cpr-name" maxLength={150} placeholder="যেমন: রহিম উদ্দিন" className={inputClass} {...register("name", { required: "আপনার নাম দেওয়া আবশ্যক।" })} />
                  <FieldError message={errors.name?.message} />
                </div>
                <div>
                  <label htmlFor="cpr-phone" className={labelClass}>ফোন নম্বর <span className="text-red-500">*</span></label>
                  <input type="tel" id="cpr-phone" maxLength={20} placeholder="+8801712345678" className={inputClass} {...register("phone", { required: "ফোন নম্বর দেওয়া আবশ্যক।", pattern: { value: PHONE_PATTERN, message: "ফোন নম্বরে শুধু ডিজিট, স্পেস, +, - ও ( ) চিহ্ন ব্যবহার করা যাবে।" } })} />
                  <FieldError message={errors.phone?.message} />
                </div>
                <div>
                  <label htmlFor="cpr-email" className={labelClass}>ইমেইল (ঐচ্ছিক)</label>
                  <input type="email" id="cpr-email" maxLength={150} placeholder="your.email@example.com" className={inputClass} {...register("email", { pattern: { value: EMAIL_PATTERN, message: "সঠিক ইমেইল ঠিকানা দিন।" } })} />
                  <FieldError message={errors.email?.message} />
                </div>
                <div>
                  <label htmlFor="cpr-travel-date" className={labelClass}>ভ্রমণের তারিখ (ঐচ্ছিক)</label>
                  <input type="date" id="cpr-travel-date" className={inputClass} {...register("travel_date")} />
                  <FieldError message={errors.travel_date?.message} />
                </div>
                <div>
                  <label htmlFor="cpr-makkah-hotel" className={labelClass}>মক্কার হোটেল (ঐচ্ছিক)</label>
                  <input type="text" id="cpr-makkah-hotel" placeholder="যেমন: Fairmont Clock Tower" className={inputClass} {...register("makkah_hotel")} />
                  <FieldError message={errors.makkah_hotel?.message} />
                </div>
                <div>
                  <label htmlFor="cpr-madinah-hotel" className={labelClass}>মদিনার হোটেল (ঐচ্ছিক)</label>
                  <input type="text" id="cpr-madinah-hotel" placeholder="যেমন: Anwar Al Madinah Mövenpick" className={inputClass} {...register("madinah_hotel")} />
                  <FieldError message={errors.madinah_hotel?.message} />
                </div>
                <div>
                  <label htmlFor="cpr-transport" className={labelClass}>পছন্দের পরিবহন (ঐচ্ছিক)</label>
                  <input type="text" id="cpr-transport" placeholder="যেমন: বাস / ফ্লাইট" className={inputClass} {...register("preferred_transport")} />
                  <FieldError message={errors.preferred_transport?.message} />
                </div>
                <div>
                  <label htmlFor="cpr-food" className={labelClass}>খাবারের পছন্দ (ঐচ্ছিক)</label>
                  <input type="text" id="cpr-food" placeholder="যেমন: বাংলাদেশি" className={inputClass} {...register("food_preference")} />
                  <FieldError message={errors.food_preference?.message} />
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-700 mb-1">যাত্রী সংখ্যা</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label htmlFor="cpr-adults" className="block text-xs text-gray-500 mb-1">প্রাপ্তবয়স্ক</label>
                      <input type="number" id="cpr-adults" min={1} className={inputClass} {...register("adults", { min: { value: 1, message: "কমপক্ষে ১ জন প্রাপ্তবয়স্ক হতে হবে।" } })} />
                      <FieldError message={errors.adults?.message} />
                    </div>
                    <div>
                      <label htmlFor="cpr-children" className="block text-xs text-gray-500 mb-1">শিশু</label>
                      <input type="number" id="cpr-children" min={0} className={inputClass} {...register("children", { min: { value: 0, message: "শিশু সংখ্যা ০ বা তার বেশি হতে হবে।" } })} />
                      <FieldError message={errors.children?.message} />
                    </div>
                    <div>
                      <label htmlFor="cpr-male" className="block text-xs text-gray-500 mb-1">পুরুষ</label>
                      <input type="number" id="cpr-male" min={0} className={inputClass} {...register("male", { min: { value: 0, message: "পুরুষ সংখ্যা ০ বা তার বেশি হতে হবে।" } })} />
                      <FieldError message={errors.male?.message} />
                    </div>
                    <div>
                      <label htmlFor="cpr-female" className="block text-xs text-gray-500 mb-1">মহিলা</label>
                      <input type="number" id="cpr-female" min={0} className={inputClass} {...register("female", { min: { value: 0, message: "মহিলা সংখ্যা ০ বা তার বেশি হতে হবে।" } })} />
                      <FieldError message={errors.female?.message} />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="cpr-note" className={labelClass}>অতিরিক্ত নোট (ঐচ্ছিক)</label>
                  <textarea id="cpr-note" rows={3} placeholder="যেমন: জানালার পাশের সিট পছন্দ..." className={inputClass} {...register("additional_note")} />
                  <FieldError message={errors.additional_note?.message} />
                </div>
                {formError && <div role="alert" className="md:col-span-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{formError}</div>}
                <div className="md:col-span-2">
                  <button type="submit" disabled={isSubmitting} className="w-full py-3 px-4 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg" style={{ background: "linear-gradient(90deg, #313881, #0678B4)", opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? "পাঠানো হচ্ছে..." : "রিকোয়েস্ট পাঠান"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CustomPackageForm;