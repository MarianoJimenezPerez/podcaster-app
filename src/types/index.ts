export interface ImImage {
  label: string;
  attributes: {
    height: string;
  };
}
export interface ImPrice {
  label: string;
  attributes: {
    amount: string;
    currency: string;
  };
}
export interface Link {
  attributes: {
    rel: string;
    type: string;
    href: string;
  };
}

export interface ImArtist {
  label: string;
  attributes?: {
    href: string;
  };
}

export interface ImReleaseDate {
  label: string;
  attributes: { label: string };
}
export interface Podcast {
  'im:name': { label: string };
  'im:image': ImImage[];
  summary: { label: string };
  'im:price': ImPrice;
  'im:contentType': {
    attributes: {
      term: string;
      label: string;
    };
  };
  rights?: {
    label: string;
  };
  title: { label: string };
  link: Link;
  id: {
    label: string;
    attributes: {
      'im:id': string;
    };
  };
  'im:artist': ImArtist;
  category: {
    attributes: {
      'im:id': string;
      term: string;
      scheme: string;
      label: string;
    };
  };
  'im:releaseDate': ImReleaseDate;
}
export interface PodcastDetail {
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
  description: string;
}
export interface EpisodeFromFeed {
  guid: { _text: string; _cdata: string };
  title: { _text: string };
  description: { _text: string };
  pubDate: { _text: string };
  'itunes:duration'?: { _text: string };
}

export interface EpisodeDetail {
  guid: string | null;
  title: string | null;
  description: string | null;
  pubDate: string | null;
  duration: string | null;
}
export interface Episode {
  guid: string | null;
  title: string | null;
  description: string | null;
  enclosure: string | null;
}
