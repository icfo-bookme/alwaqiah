const getPackages = async (type) => {
  try {
    const query = type ? `?type=${encodeURIComponent(type)}` : '';
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_V1}/api/packages${query}`);
    const data = await res.json();
    // API returns { status, count, packages: [...] } — extract the packages array
    return  data?.packages || [];
  } catch (error) {
    return [];
  }
};

export default getPackages;