import { defineCollection, z } from 'astro:content'

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      }).optional(),
  }),
})

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    duration: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      }).optional(),
    date: z
      .string()
      .or(z.date())
      .transform((val: string | number | Date) => new Date(val).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })),
    draft: z.boolean().default(false).optional(),
    lang: z.string().default('en-US').optional(),
    tag: z.string().optional().optional(),
    redirect: z.string().optional(),
    video: z.boolean().default(false).optional(),
  }),
})

const work = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    link: z.string().optional(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

// const projects = defineCollection({
//   type: 'content',
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     date: z.coerce.date(),
//     draft: z.boolean().optional(),
//     demoURL: z.string().optional(),
//     repoURL: z.string().optional(),
//   }),
// })

// export const collections = { blog, work, projects }

export const collections = { pages, blog, work }
