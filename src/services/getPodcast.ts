import httpRequest from '@/utils/conection/httpRequest';
import axios from 'axios';

export const getPodcast = async (podcastId: string, signal?: AbortSignal) => {
  const PODCAST_DETAIL_URL = `/lookup?id=${podcastId}&entity=podcast`;

  try {
    const response = await httpRequest.get(PODCAST_DETAIL_URL, { signal });
    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request aborted:', error.message);
      return { success: false, error: 'Request aborted' };
    } else {
      console.error(error);
      return error;
    }
  }
};
