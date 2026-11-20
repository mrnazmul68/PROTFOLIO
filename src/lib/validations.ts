import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({ error: "Please enter your name." })
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please keep your name under 80 characters."),
  email: z
    .string({ error: "Please enter your email address." })
    .trim()
    .toLowerCase()
    .pipe(z.email("Please enter a valid email address."))
    .pipe(z.string().max(160, "Please keep your email under 160 characters.")),
  subject: z
    .string({ error: "Please add a short subject." })
    .trim()
    .min(3, "Please add a short subject.")
    .max(120, "Please keep the subject under 120 characters."),
  message: z
    .string({ error: "Please write a message." })
    .trim()
    .min(20, "Please add a little more detail (at least 20 characters).")
    .max(3000, "Please keep your message under 3,000 characters."),
  // Honeypot: real users never see or fill this field. The API checks it
  // after parsing and returns a generic success so bots learn nothing.
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
