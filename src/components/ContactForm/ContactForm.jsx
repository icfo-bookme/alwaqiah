"use client";

import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Public contact-inquiries API — no auth / CSRF needed, CORS is open
const CONTACT_API = `${process.env.NEXT_PUBLIC_BASE_URL_V1}/api/contact-inquiries`;

// Must match the backend rule: max 20 chars, regex ^\+?[0-9\s\-()]{6,20}$
const PHONE_PATTERN = /^\+?[0-9\s\-()]{6,20}$/;

// Backend sends its own English success message — shown as-is, Bangla fallback if missing
const SUCCESS_FALLBACK_BN = "ধন্যবাদ! আপনার বার্তা পৌঁছে গেছে। আমরা শীঘ্রই যোগাযোগ করব।";
// 500 / network failure — generic only, server message may leak internals
const GENERIC_ERROR_BN = "কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।";

// Backend 422 messages (exact strings) mapped to Bangla; unknown messages fall back to server text
const SERVER_ERROR_BN = {
    "Your name is required.": "আপনার নাম দেওয়া আবশ্যক।",
    "Name must be a valid text.": "নামটি অবশ্যই সঠিক টেক্সট হতে হবে।",
    "Name may not be greater than 150 characters.": "নাম ১৫০ অক্ষরের বেশি হতে পারবে না।",
    "Phone number is required.": "ফোন নম্বর দেওয়া আবশ্যক।",
    "Phone number must be a valid text.": "ফোন নম্বরটি অবশ্যই সঠিক টেক্সট হতে হবে।",
    "Phone number may not be greater than 20 characters.": "ফোন নম্বর ২০ অক্ষরের বেশি হতে পারবে না।",
    "Phone number may only contain digits, spaces, +, - and ( )": "ফোন নম্বরে শুধু ডিজিট, স্পেস, +, - ও ( ) চিহ্ন ব্যবহার করা যাবে।",
    "Please provide a valid email address.": "সঠিক ইমেইল ঠিকানা দিন।",
    "Email may not be greater than 150 characters.": "ইমেইল ১৫০ অক্ষরের বেশি হতে পারবে না।",
    "Message must be a valid text.": "বার্তাটি অবশ্যই সঠিক টেক্সট হতে হবে।",
    "Message is too long.": "বার্তাটি অনেক বড় হয়ে গেছে।",
};

const localizeError = (msg) => SERVER_ERROR_BN[msg] || msg;

// Server field names → react-hook-form field names
const SERVER_FIELD_MAP = {
    name: "firstName",
    phone: "phoneNumber",
    email: "email",
    message: "additionalInfo",
};

const ContactForm = ({ title }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const payload = {
            name: data.firstName?.trim() || "",
            phone: data.phoneNumber?.trim() || "",
            email: data.email?.trim() || "",            // optional — backend converts "" to NULL
            message: data.additionalInfo?.trim() || "", // optional — backend converts "" to NULL
        };

        try {
            const res = await fetch(CONTACT_API, {
                method: "POST",
                headers: {
                    // Accept: application/json is MANDATORY — without it a failed
                    // validation returns 302 HTML instead of 422 JSON
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            let json = null;
            try {
                json = await res.json();
            } catch {
                json = null;
            }

            // Success — HTTP 201 { status: "success", message, inquiry }
            if (res.ok && json?.status === "success") {
                toast.success(json.message || SUCCESS_FALLBACK_BN);
                reset();
                return;
            }

            // Validation error — HTTP 422 { message, errors: { field: ["..."] } }
            // The top-level message is only a summary; always map errors[field][0] to the field
            if (res.status === 422 && json?.errors) {
                let mapped = 0;
                for (const [field, messages] of Object.entries(json.errors)) {
                    const formField = SERVER_FIELD_MAP[field];
                    if (formField) {
                        setError(formField, {
                            type: "server",
                            message: localizeError(messages?.[0] ?? ""),
                        });
                        mapped += 1;
                    }
                }
                if (mapped === 0) toast.error(GENERIC_ERROR_BN);
                return;
            }

            // HTTP 500 / unexpected — never render json.message (may leak internals)
            toast.error(GENERIC_ERROR_BN);
        } catch (error) {
            console.error("Contact inquiry failed:", error);
            toast.error(GENERIC_ERROR_BN);
        }
    };

    return (
        <div style={{
            boxShadow: 'inset 0 4px 8px rgba(67, 56, 202, 0.4)'
        }} className="md:max-w-lg w-full mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {title === "show" &&
                <div className="text-center mb-8">
                    <h1 className="text-xl text-blue-800 font-bold mb-2">
                        আমাদের সাথে যোগাযোগ করুন
                    </h1>
                    <p className="text-gray-600 text-sm">পবিত্র হজ ও ওমরাহ সংক্রান্ত যেকোনো তথ্যের জন্য ফরমটি পূরণ করুন</p>
                </div>
            }

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Full Name */}
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        আপনার নাম <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        maxLength={150}
                        {...register("firstName", {
                            required: "আপনার নাম দেওয়া আবশ্যক",
                            maxLength: {
                                value: 150,
                                message: "নাম ১৫০ অক্ষরের বেশি হতে পারবে না",
                            },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        মোবাইল নম্বর <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        placeholder="01712345678 / +880 1712-345678"
                        {...register("phoneNumber", {
                            required: "মোবাইল নম্বর দেওয়া আবশ্যক",
                            maxLength: {
                                value: 20,
                                message: "ফোন নম্বর ২০ অক্ষরের বেশি হতে পারবে না",
                            },
                            pattern: {
                                value: PHONE_PATTERN,
                                message: "সঠিক ফোন নম্বর দিন (যেমন: 01712345678)",
                            },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                    )}
                </div>

                {/* Email Address */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        ইমেইল এড্রেস (ঐচ্ছিক)
                    </label>
                    <input
                        type="email"
                        id="email"
                        maxLength={150}
                        {...register("email", {
                            // optional field — pattern only runs when non-empty
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "সঠিক ইমেইল ঠিকানা দিন",
                            },
                        })}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                {/* Additional Info */}
                <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                        অতিরিক্ত তথ্য / প্রশ্ন
                    </label>
                    <textarea
                        id="additionalInfo"
                        {...register("additionalInfo")}
                        rows={4}
                        maxLength={65535}
                        placeholder="আপনি হজ বা ওমরাহ প্যাকেজ সম্পর্কে কী জানতে চান বিস্তারিত লিখুন..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                </div>

                {/* Submit Button — disabled + spinner while in flight (server has no
                    idempotency key, so double submits must be prevented here) */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    style={{
                        background: "linear-gradient(90deg, #313881, #0678B4)",
                        opacity: isSubmitting ? 0.7 : 1,
                    }}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            পাঠানো হচ্ছে...
                        </span>
                    ) : "মেসেজ পাঠান"}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;