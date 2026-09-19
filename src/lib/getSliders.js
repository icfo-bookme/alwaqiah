const getSliders = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_V1}/api/sliders`);
    const data = await res.json();
    return data?.sliders || [];
  } catch {
    return [];
  }
};

export default getSliders;