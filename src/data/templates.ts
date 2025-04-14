
import { CertificateTemplate } from "@/types/certificate";

export const certificateTemplates: CertificateTemplate[] = [
  {
    id: "classic-blue",
    name: "Classic Blue",
    image: "/classic-blue.png",
    color: "#0EA5E9",
    primaryTextColor: "#1E293B",
    secondaryTextColor: "#0EA5E9"
  },
  {
    id: "elegant-purple",
    name: "Elegant Purple",
    image: "/elegant-purple.png",
    color: "#8B5CF6",
    primaryTextColor: "#1E293B",
    secondaryTextColor: "#8B5CF6"
  },
  {
    id: "golden-award",
    name: "Golden Award",
    image: "/golden-award.png",
    color: "#F59E0B",
    primaryTextColor: "#1E293B",
    secondaryTextColor: "#92400E"
  },
  {
    id: "green-success",
    name: "Green Success",
    image: "/green-success.png",
    color: "#10B981",
    primaryTextColor: "#1E293B",
    secondaryTextColor: "#10B981"
  }
];

export function getTemplateById(id: string): CertificateTemplate {
  return certificateTemplates.find(template => template.id === id) || certificateTemplates[0];
}
