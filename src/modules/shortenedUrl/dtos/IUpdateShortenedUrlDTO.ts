interface ICreateShortenedUrlDTO {
  originalUrl?: string;
  dateDeletion?: Date;
  clickCount?: number;
  enabled?: boolean;
}

export default ICreateShortenedUrlDTO;
