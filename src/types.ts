export type ProjectCategory = 'all' | 'residential' | 'commercial' | 'interior' | 'landscape' | 'sustainable';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'residential' | 'commercial' | 'interior' | 'landscape' | 'sustainable';
  location: string;
  year: string;
  area: string;
  heroImage: string;
  blueprintImage: string;
  galleryImages: string[];
  description: string;
  architecturalPhilosophy: string;
  materials: string[];
  keyFeatures: string[];
  award?: string;
  clientType: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  deliverables: string[];
  badge: string;
  highlightStat: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  project: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
  projectThumbnail: string;
}

export interface StatItem {
  id: string;
  numericValue: number;
  suffix: string;
  label: string;
  detail: string;
}

export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
  specialty: string;
}

export interface AwardItem {
  year: string;
  title: string;
  body: string;
  project: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
