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
