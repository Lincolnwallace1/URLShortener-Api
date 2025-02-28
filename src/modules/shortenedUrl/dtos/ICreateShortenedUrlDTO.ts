interface ICreateShortenedUrlDTO {
  originalUrl: string;
  shortenedUrl: string;
  user?: number;
}

export default ICreateShortenedUrlDTO;
