import httpRequest from '@/utils/conection/httpRequest';

export const getPodcasts = async () => {
  const TOP_PODCASTS_URL = '/us/rss/toppodcasts/limit=100/genre=1310/json'; // blocking maximium items, in the future limit could be a prop

  try {
    const response = await httpRequest.get(TOP_PODCASTS_URL);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
