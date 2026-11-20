import type { NavItem, SocialLink, SocialProfileKey } from "@/types/profile";

/**
 * Single source of truth for personal information.
 * Update this file to change contact details, availability and identity site-wide.
 */
export const siteConfig = {
  name: "Nazmul Islam Mazumdar",
  displayName: "Nazmul Islam",
  firstName: "Nazmul",
  logo: "Nazmul",
  title: "Full Stack Web Developer",
  eyebrow: "Computer Science & Engineering Student",
  shortBio:
    "Computer Science and Engineering student and aspiring Full Stack Web Developer, building thoughtful web experiences with clean architecture.",
  description:
    "Nazmul Islam Mazumdar is a Computer Science and Engineering student at Port City International University and an aspiring Full Stack Web Developer building modern, scalable and user-focused web applications.",
  longBio:
    "I'm Nazmul Islam Mazumdar, a Computer Science and Engineering student at Port City International University and an aspiring Full Stack Web Developer. I enjoy building web applications, understanding how systems work behind the scenes, and turning ideas into practical digital experiences. I'm continuously improving my programming, problem-solving, and software engineering skills.",
  availability: "Open to Opportunities",
  availabilityNote: "Open to internships, junior roles and collaborations.",
  email: "mrnazmul68@gmail.com",
  phone: "01332637252",
  phoneHref: "tel:+8801332637252",
  whatsappNumber: "8801332637252", // International format, no plus sign
  whatsappMessage:
    "Hi Nazmul! I found your portfolio and would love to connect.",
  university: "Port City International University",
  department: "Computer Science and Engineering",
  semester: "1st Semester",
  location: "Bangladesh",
  // Version query busts the old Next.js image-optimizer/browser cache.
  profileImage: "/images/profile/nazmul-portrait.webp?v=2",
  profileImageDark:
    "/images/profile/Red-Black-Gradient-nazmul-portrait.webp",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  socials: {
    github: "https://github.com/mrnazmul68",
    linkedin: "https://www.linkedin.com/in/nazmul-islam-mazumdar-340bb8390/",
    facebook: "https://www.facebook.com/nazmul.mazumdar.2025",
    instagram: "https://www.instagram.com/nzmu_lislam/",
  } satisfies Record<SocialProfileKey, string>,
  nav: [
    { label: "Home", href: "/#home", section: "home" },
    { label: "About", href: "/#about", section: "about" },
    { label: "Skills", href: "/#skills", section: "skills" },
    { label: "Projects", href: "/#projects", section: "projects" },
    { label: "Blog", href: "/#blog", section: "blog" },
    { label: "Contact", href: "/#contact", section: "contact" },
  ] satisfies NavItem[],
  interests: [
    "Web Development",
    "Programming",
    "Technology",
    "Problem Solving",
    "Learning New Technologies",
  ],
  currentFocus: [
    "Strengthening JavaScript and TypeScript fundamentals",
    "Building full-stack applications end to end",
    "Learning system design, cloud infrastructure and DevOps",
    "Writing about what I learn along the way",
  ],
  copyright: "Designed and built with curiosity by Nazmul.",
} as const;

export type SiteConfig = typeof siteConfig;

export const socialLinks: SocialLink[] = [
  { key: "github", label: "GitHub", href: siteConfig.socials.github },
  { key: "linkedin", label: "LinkedIn", href: siteConfig.socials.linkedin },
  { key: "facebook", label: "Facebook", href: siteConfig.socials.facebook },
  { key: "instagram", label: "Instagram", href: siteConfig.socials.instagram },
  { key: "email", label: "Email", href: `mailto:${siteConfig.email}` },
];
