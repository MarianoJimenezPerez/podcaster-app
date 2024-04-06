import axios from 'axios';

export const getFeed = async (feedUrl: string, signal?: AbortSignal) => {
  const allOriginUrl = 'https://api.allorigins.win/raw?url=' + feedUrl;

  try {
    const response = await axios.get(allOriginUrl, {
      responseType: 'text',
      withCredentials: false,
      signal
    });

    return response.data;
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
