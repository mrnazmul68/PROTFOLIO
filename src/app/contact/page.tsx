import { createMetadata } from "@/lib/seo";
import { Contact } from "@/components/sections/Contact";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Have a project in mind or just want to say hello? Get in touch with Nazmul Islam Mazumdar by email, phone or WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <Contact headingLevel="h1" />
    </div>
  );
}
