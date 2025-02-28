import Z from 'zod';

const CreateUserSchema = Z.object({
  email: Z.string().email().optional(),
  fullname: Z.string().min(3).max(255).optional(),
  password: Z.string().min(6).max(255).optional(),
});

export default CreateUserSchema;
