'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import {
    FaKaaba,
    FaMosque,
    FaCalendarDays,
    FaUserGroup
} from 'react-icons/fa6';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import CTAButtons from '../ui/CTAButtons';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export default function Packages({ packages }) {
    const [selectedDescription, setSelectedDescription] = useState(null);
    const [modalTitle, setModalTitle] = useState('Package Details');
    const [activeTab, setActiveTab] = useState('umrah');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            // Fix background scroll and prevent "jump"
            const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarCompensation}px`;
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
        };
    }, [isModalOpen]);

    const openModal = (description, title = 'Package Details') => {
        setSelectedDescription(description);
        setModalTitle(title);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDescription(null);
        setModalTitle('Package Details');
    };

    const truncateText = (text, wordLimit = 30, charLimit = 200) => {
        if (!text) return "";

        const words = text.trim().split(/\s+/);
        let truncated = words.slice(0, wordLimit).join(" ");

        if (truncated.length > charLimit) {
            truncated = truncated.substring(0, charLimit);
        }

        return truncated + (words.length > wordLimit || text.length > charLimit ? "..." : "");
    };

    return (
        <div className='bg-[#FFFFFF] pb-10'>
            <div className="max-w-5xl mx-auto md:px-4 ">
                <div className={`  text-center mb-12`}>
                    <h1 className="text-xl  text-center text-blue-950  pt-2 md:pt-5 lg:text-3xl font-bold mb-1">
                        আল-ওয়াকিয়া হজ কাফেলা-র  হজ ও ওমরাহ <span className="text-red-700">প্যাকেজসমূহ </span>
                    </h1>
                    <div className="mt-3 w-24 h-1 rounded-full mx-auto bg-gradient-to-r from-[#313881] to-[#0678B4]"></div>
                    {/* Umrah / Hajj Tabs */}
                    <div className="flex justify-center gap-3 mt-6 mb-4">
                        <button
                            onClick={() => setActiveTab('umrah')}
                            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 ${activeTab === 'umrah'
                                ? 'bg-gradient-to-r from-[#313881] to-[#0678B4] text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-blue-300'
                                }`}
                        >
                            <FaKaaba className='hidden md:block' />
                            ওমরাহ প্যাকেজ
                        </button>
                        <button
                            onClick={() => setActiveTab('hajj')}
                            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 ${activeTab === 'hajj'
                                ? 'bg-gradient-to-r from-[#313881] to-[#0678B4] text-white shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-blue-300'
                                }`}
                        >
                            <FaMosque className='hidden md:block' />
                            হজ প্যাকেজ
                        </button>
                    </div>

                </div>
                <div className={`${roboto.className}`}>
                    {packages && packages.length > 0 ? (
                        (() => {
                            const filteredPackages = packages.filter(
                                (pkg) => (pkg.package_type || '').toLowerCase() === activeTab
                            );

                            return (
                                <div className="grid grid-cols-1 gap-8">
                                    {filteredPackages.map((pkg) => {
                                        const price = pkg.price ? Math.round(parseFloat(pkg.price)) : null;
                                        const features = Array.isArray(pkg.features) ? pkg.features : [];

                                        return (
                                            <div style={{
                                                boxShadow: `
                                                    inset 0 4px 8px rgba(67, 56, 202, 0.1),   /* top */
                                                    inset 0 -4px 8px rgba(67, 56, 202, 0.1),  /* bottom */
                                                    inset 4px 0 8px rgba(67, 56, 202, 0.1),   /* left */
                                                    inset -4px 0 8px rgba(67, 56, 202, 0.1)   /* right */
  `
                                            }}
                                                key={pkg.id}
                                                className="bg-white  rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg"
                                            >


                                                <div className="flex flex-col md:flex-row">
                                                    {/* Image Section */}
                                                    <div className="md:w-2/5 relative h-64 md:h-auto">
                                                        {pkg.is_featured && (
                                                            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#313881] to-[#0678B4] text-white px-3 py-1 rounded-full text-xs font-semibold z-10 shadow-md">
                                                                Featured
                                                            </div>
                                                        )}
                                                        <Image
                                                            src={pkg.thumbnail_url}
                                                            alt={pkg.title || "Package Image"}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                        />
                                                    </div>

                                                    {/* Details Section */}
                                                    <div className="md:w-3/5 p-6 flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex justify-between items-start mb-2 gap-2">
                                                                <h5 className="text-2xl font-bold text-blue-950">{pkg.title}</h5>
                                                                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full capitalize whitespace-nowrap">
                                                                    {pkg.package_type}
                                                                </span>
                                                            </div>

                                                            <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-900">
                                                                <span className="flex items-center">
                                                                    <FaCalendarDays className="mr-1.5 text-[#0678B4]" />
                                                                    <strong className="mr-1">Duration:</strong> {pkg.duration_days} days
                                                                </span>
                                                                <span className="text-blue-950">•</span>
                                                                <span className="flex items-center">
                                                                    <FaUserGroup className="mr-1.5 text-[#0678B4]" />
                                                                    {pkg.price_label || "per person"}
                                                                </span>
                                                            </div>

                                                            {/* Features List */}
                                                            {features.length > 0 && (
                                                                <div className="mb-4">
                                                                    <p className="font-semibold text-gray-900 mb-2">প্যাকেজ সুবিধাসমূহ:</p>
                                                                    <ul className="space-y-2">
                                                                        {features
                                                                            .slice()
                                                                            .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                                                                            .map((feature) => {
                                                                                return (
                                                                                    <li
                                                                                        key={feature.id}
                                                                                        className="flex items-start text-sm text-gray-700"
                                                                                    >
                                                                                        <i
                                                                                            className={`${feature.icon || 'fa-solid fa-circle-check'} mr-2 mt-1 flex-shrink-0 text-[#0678B4]`}
                                                                                        />
                                                                                        <span>{feature.title}</span>
                                                                                    </li>
                                                                                );
                                                                            })}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {(pkg.short_description || pkg.description) && (
                                                                <div className="mb-2">
                                                                    <p className="text-gray-900">
                                                                        <strong className="mr-1"> Details:</strong>  {truncateText(pkg.short_description || pkg.description)}
                                                                        <button
                                                                            onClick={() => openModal(pkg.short_description || pkg.description, pkg.title)}
                                                                            className="text-blue-800 hover:text-blue-600 font-bold ml-2 text-base"
                                                                        >
                                                                            See more
                                                                        </button>
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <hr className="my-4" />

                                                        {/* Pricing & Actions */}
                                                        <div className="flex flex-col sm:flex-row items-center justify-between">
                                                            <div className="mb-4 sm:mb-0 flex gap-4 ">
                                                                {/* Price */}
                                                                {price !== null && (
                                                                    <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                                                                        {/* Price Label */}
                                                                        <p className="text-sm text-red-600 font-medium">Price</p>

                                                                        {/* Price Section */}
                                                                        <div className="flex items-center">
                                                                            <p className="text-xl font-bold text-blue-950">
                                                                                {price} TK
                                                                            </p>
                                                                        </div>
                                                                        <div className='flex items-center justify-center'>
                                                                            {/* Price Note */}
                                                                            <p className="text-xs text-gray-500">{pkg.price_label || "Per person"}</p>
                                                                        </div>

                                                                    </div>

                                                                )}
                                                            </div>

                                                            <CTAButtons className="flex gap-3" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })()
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <svg
                                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Packages Available</h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                We are currently updating our packages. Please check back later or contact us for more information.
                            </p>
                        </div>
                    )}

                    {/* Modal */}
                    {isModalOpen && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4"
                            onClick={closeModal}
                        >
                            <div
                                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center p-6 border-b">
                                    <h3 className="text-xl font-bold text-gray-800">{modalTitle || 'Package Details'}</h3>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700 text-2xl"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="p-6 overflow-y-auto">
                                    <p className="text-gray-700 whitespace-pre-line">{selectedDescription}</p>
                                </div>
                                <div className="p-6 border-t bg-gray-50 flex justify-end">
                                    <button
                                        onClick={closeModal}
                                        className="bg-gradient-to-r from-[#313881] to-[#0678B4] hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div></div>
    );
}
