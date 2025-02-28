import Z from 'zod';

const UpdateShortenedUrlSchema = Z.object({
  url: Z.string().url(),
});

export default UpdateShortenedUrlSchema;
