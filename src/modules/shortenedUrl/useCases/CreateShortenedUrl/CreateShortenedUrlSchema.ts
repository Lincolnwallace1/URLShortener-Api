import Z from 'zod';

const CreateShortenedUrlSchema = Z.object({
  url: Z.string().url(),
});

export default CreateShortenedUrlSchema;
