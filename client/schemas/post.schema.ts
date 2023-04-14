import { object, string, TypeOf } from "zod";

const postSchema = object({
  title: string().min(1, "Title is required"),
  content: string().min(1, "Content is required"),
  category: string().min(1, "Category is required"),
  image: string().min(1, "Image is required"),
});

export type PostInput = TypeOf<typeof postSchema>;

export { postSchema };
