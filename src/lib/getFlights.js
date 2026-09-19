const getFlights = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_V1}/api/flights`);
    const data = await res.json();
    return data?.flights || [];
  } catch (error) {
    console.error('Error fetching flights:', error);
    return [];
  }
};

export default getFlights;