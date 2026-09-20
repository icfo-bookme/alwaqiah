import Image from 'next/image';
import CTAButtons from '../ui/CTAButtons';

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString.replace(' ', 'T'));
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString.replace(' ', 'T'));
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

const TABLE_HEADINGS = ['এয়ারলাইন', 'ফ্লাইট', 'যাত্রা', 'ফেরা'];

export default function Schedules({ flights = [] }) {
    const sortedFlights = [...flights].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

    return (
        <div>
            {/* Header */}
            <div className="px-4 bg-gray-50 sm:px-6 py-8 border-b border-gray-200 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-950">
                    হজ ও ওমরাহ ফ্লাইট সময়সূচী
                </h2>
                <p className="text-sm sm:text-base font-semibold text-red-700 mt-1">“বিশেষ প্রয়োজনে সময়সূচী পরিবর্তন হতে পারে।’’</p>
            </div>

            {/* Flights Section */}
            {sortedFlights.length > 0 ? (
            <div className={`bg-gray-100 rounded-lg shadow-md max-w-5xl mx-auto my-6 w-full`}>
                <div className="p-4 sm:p-6 w-full ">
                    <table className="w-full table-auto divide-y divide-gray-200 min-w-full">
                        <thead>
                            <tr>
                                {TABLE_HEADINGS.map((heading) => (
                                    <th
                                        key={heading}
                                        className="px-2 py-3 text-sm sm:text-base text-white bg-gradient-to-r from-[#2E3B83] to-[#37789e] uppercase text-center"
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedFlights.map((flight) => (
                                <tr key={flight.id} className="hover:bg-gray-50 border border-gray-300 text-center text-sm text-black">
                                    {/* Airline */}
                                    <td className="px-2 py-3">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            {flight.airline_logo_url && (
                                                <Image
                                                    src={flight.airline_logo_url}
                                                    alt={flight.airline_name || 'Airline logo'}
                                                    width={44}
                                                    height={44}
                                                    className="object-contain rounded bg-white"
                                                />
                                            )}
                                            <span className="text-blue-950 font-bold text-sm">{flight.airline_name}</span>
                                        </div>
                                    </td>

                                    {/* Flight Number */}
                                    <td className="px-2 py-3 font-semibold text-blue-950">
                                        {flight.flight_number}
                                    </td>

                                    {/* Departure */}
                                    <td className="px-2 py-3">
                                        <p className="font-semibold">{formatDate(flight.departure_at)}</p>
                                        <p className="text-base">{formatTime(flight.departure_at)}</p>
                                        <p className="text-xs text-gray-500 mt-1">{flight.departure_airport}</p>
                                    </td>

                                    {/* Return */}
                                    <td className="px-2 py-3">
                                        <p className="font-semibold">{formatDate(flight.return_at)}</p>
                                        <p className="text-base">{formatTime(flight.return_at)}</p>
                                        <p className="text-xs text-gray-500 mt-1">{flight.return_departure_airport}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            ) : (
                <div className={`bg-gray-100 rounded-lg shadow-md max-w-5xl mx-auto my-6 w-full`}>
                    <div className="text-center py-12">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">কোনো ফ্লাইট সময়সূচী পাওয়া যায়নি</h3>
                        <p className="text-gray-600 max-w-md mx-auto px-4">
                            আমরা বর্তমানে আমাদের ফ্লাইট সময়সূচী আপডেট করছি। কিছুক্ষণ পর আবার চেক করুন বা আরও তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।
                        </p>
                    </div>
                </div>
            )}

            {/* Buttons */}
            <CTAButtons className="flex flex-row items-center justify-center gap-4 mt-6 mb-10" />
        </div>
    );
}