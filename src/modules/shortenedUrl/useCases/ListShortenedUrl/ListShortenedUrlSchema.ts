import Z from 'zod';

const ListShortenedSchema = Z.object({
  limit: Z.number().optional().default(50),
  offset: Z.number().optional().default(0),
});

export default ListShortenedSchema;
