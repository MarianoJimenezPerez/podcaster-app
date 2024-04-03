export const transformHtmlToText = (html: string): string => {
  const doc: Document = new DOMParser().parseFromString(html, 'text/html');
  if (doc && doc.body) {
    return doc.body.textContent || '';
  } else {
    return '';
  }
};
