const getFaqs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_V1}/api/faqs`);
    const data = await res.json();
    return data?.faqs || [];
  } catch {
    return [];
  }
};

export default getFaqs;