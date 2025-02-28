interface IGetShortenedUrlResponse {
  id: number;
  originalUrl: string;
  shortenedUrl: string;
  dateDeletion?: Date;
  clickCount: number;
  updatedAt: Date;
}

export default IGetShortenedUrlResponse;
