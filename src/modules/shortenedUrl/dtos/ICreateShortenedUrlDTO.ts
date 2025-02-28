interface ICreateShortenedUrlDTO {
  originalUrl: string;
  shortnedUrl: string;
  user?: number;
}

export default ICreateShortenedUrlDTO;
