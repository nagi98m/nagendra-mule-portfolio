const optionalPublicValue = (value: string | undefined) => value?.trim() || null;

export const profileConfig = {
  name: "Nagendra Mule",
  initials: "NM",
  role: "Python Backend & Generative AI Engineer",
  experience: "4.9+ years",
  location: "India",
  siteUrl: optionalPublicValue(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000",
  resumeUrl: null as string | null,
  socials: {
    github: "https://github.com/nagi98m",
    linkedin: optionalPublicValue(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    email: optionalPublicValue(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  },
  certifications: [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", credentialUrl: null as string | null },
    { name: "AWS Certified AI Practitioner", issuer: "Amazon Web Services", credentialUrl: null as string | null },
    { name: "AWS Certified Data Engineer – Associate", issuer: "Amazon Web Services", credentialUrl: null as string | null },
    { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", credentialUrl: null as string | null },
  ],
} as const;

export const aiApiUrl = optionalPublicValue(process.env.NEXT_PUBLIC_API_URL) || "http://localhost:8000";
