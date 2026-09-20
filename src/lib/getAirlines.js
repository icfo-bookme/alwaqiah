const getAirlines = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_V1}/api/airlines`);
    const data = await res.json();
    return data?.airlines || [];
  } catch (error) {
    console.error('Error fetching airlines:', error);
    return [];
  }
};

export default getAirlines;