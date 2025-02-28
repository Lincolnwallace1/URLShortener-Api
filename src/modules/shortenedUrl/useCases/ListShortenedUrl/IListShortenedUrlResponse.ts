interface IListShortenedUrl {
  metaData: {
    limit: number;
    offset: number;
    total: number;
  };
  records: {
    shortenedUrls: {
      id: number;
      originalUrl: string;
      shortenedUrl: string;
      dateDeletion?: Date;
      clickCount: number;
      updatedAt: Date;
    };
  }[];
}

export default IListShortenedUrl;
