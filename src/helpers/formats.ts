const formatImageURL = (imgHash: string) => {
  const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

  const fullImageUrl = `${BASE_IMAGE_URL}/${imgHash}`;

  return fullImageUrl;
};

export { formatImageURL };
