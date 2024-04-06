import axios from 'axios';
import { xml2json } from 'xml-js';

export const getPodcastDescription = async (feedUrl: string) => {
  const allOriginUrl = 'https://api.allorigins.win/raw?url=' + feedUrl;
  try {
    const xmlResponse = await axios.get(allOriginUrl);
    const jsonResponse = xml2json(xmlResponse.data, { compact: true, spaces: 4 });
    const parsedResponse = JSON.parse(jsonResponse);

    // sometimes the api have ._cdata, and sometimes ._text property
    if (parsedResponse.rss.channel.description._cdata) {
      return parsedResponse.rss.channel.description._cdata;
    } else if (parsedResponse.rss.channel.description._text) {
      return parsedResponse.rss.channel.description._text;
    } else {
      return 'No description found.';
    }
  } catch (error) {
    console.error(error);
    return 'Something went wrong. Try again later';
  }
};
