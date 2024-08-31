import slugify from "slugify";

export const createSlug = (input: string) => {
  return slugify(input, {
    trim: true,
    replacement: "-",
    lower: true,
  });
};
