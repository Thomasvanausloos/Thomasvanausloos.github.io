import { z } from "zod";

const baseSchema = z.object({
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  title: z.string({
    required_error: "Required frontmatter missing: title",
    invalid_type_error: "title must be a string",
  }),
  date: z.date({
    required_error: "Required frontmatter missing: date",
    invalid_type_error:
      "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.",
  }),
});

/*
  Blog posts could be of two types —
  1. The posts you write in markdown files in content/blog/*.md
  2. External posts in other websites

  That's why the frontmatter schema for blog posts is one of the two possible types.
  If you don't want to link posts written in external websites, you could
  simplify this to just use the markdown schema.
*/
export const blog = z.discriminatedUnion("external", [
  // markdown
  baseSchema.extend({
    external: z.literal(false),
    description: z.optional(z.string()),
    ogImagePath: z.optional(z.string()),
    canonicalUrl: z.optional(z.string()),
  }),
  // external link
  baseSchema.extend({
    external: z.literal(true),
    url: z.string({
      required_error:
        "external is true but url is missing. url must be set for posts marked as external.",
      invalid_type_error: "external should be string.",
    }),
  }),
]);

export const project = z.object({
  title: z.string({
    required_error: "Required frontmatter missing: title",
    invalid_type_error: "title must be a string",
  }),
  date_from: z.date({
    required_error: "Required frontmatter missing: date_from",
    invalid_type_error:
      "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.",
  }),
  date_until: z.date({
    required_error: "Required frontmatter missing: date_until",
    invalid_type_error:
      "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.",
  }),
  technologies: z.array(z.string()).nonempty(),
  company: z.string({ required_error: "Required frontmatter missing: company" }),
  company_logo: z.string({ required_error: "Required frontmatter missing: company_logo" }),
  company_url: z.string({ required_error: "Required frontmatter missing: company_url" }),
  client: z.string({ required_error: "Required frontmatter missing: client" }),
  description: z.string({ required_error: "Required frontmatter missing: description" })
});

export const techStack = z.object({
  order: z.number(),
  category: z.string({ required_error: "Required techstack-frontmatter missing: category" }),
  technologies: z.array(z.object({
    logoUrl: z.string({ required_error: "Required techstack-frontmatter missing: logoUrl" }),
    description: z.string({ required_error: "Required techstack-frontmatter missing: description" })
  })).nonempty(),
});

export const employer = z.object({
  date_from: z.date({
    required_error: "Required employer-frontmatter missing: date_from",
    invalid_type_error:
      "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.",
  }),
  date_until: z.date({
    required_error: "Required employer-frontmatter missing: date_until",
    invalid_type_error:
      "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.",
  }),
  company: z.string({ required_error: "Required employer-frontmatter missing: company" }),
  company_logo: z.string({ required_error: "Required employer-frontmatter missing: company_logo" }),
  company_url: z.string({ required_error: "Required employer-frontmatter missing: company_url" }),
  description: z.string({ required_error: "Required employer-frontmatter missing: description" })
});

export const education = z.object({
  order: z.number(),
  institute: z.string({ required_error: "Required education-frontmatter missing: institute" }),
  description: z.string({ required_error: "Required education-frontmatter missing: description" }),
  period: z.string({ required_error: "Required education-frontmatter missing: period" }),
});

export const courses = z.object({
  order: z.number(),
  institute: z.string({ required_error: "Required course-frontmatter missing: institute" }),
  title: z.string({ required_error: "Required course-frontmatter missing: title" }),
  year: z.string({ required_error: "Required course-frontmatter missing: year" }),
});

export const aboutMe = z.object({
  paragraphs: z.array(z.string()).nonempty(),
});