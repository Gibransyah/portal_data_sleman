export interface Dashboard {
  id: string;
  title: string;
  description?: string;
  category?: string;
  image?: string;
  link?: string;
  featured?: boolean;
  slug?: string;
}

export interface HighlightCard {
  id: string;
  title: string;
  icon?: string;
  metrics: Metric[];
  bgColor?: string;
  textColor?: string;
}

export interface Metric {
  label: string;
  value: string;
  year?: string;
}

export interface LatestDashboard {
  id: string;
  title: string;
  description: string;
  image: string;
  logo1?: string;
  logo2?: string;
  buttonText?: string;
  buttonLink?: string;
  bgColor?: string;
}

export interface NavItem {
  label: string;
  href: string;
  dropdown?: NavItem[];
}

export interface ContactInfo {
  address: string;
  addressDetail: string;
  phone: string;
  email: string;
}

export interface DashboardLink {
  title: string;
  items: string[];
}

export interface SocialMedia {
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export interface MapData {
  id: string;
  title: string;
  year: string;
  dataCategory: string;
}

