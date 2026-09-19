const getYoutubeVideos = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_V1}/api/youtube-videos`
    );
    const data = await res.json();
    return data?.videos ?? [];
  } catch (error) {
    return [];
  }
};

export default getYoutubeVideos;