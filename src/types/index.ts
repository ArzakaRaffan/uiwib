// src/types/index.ts

export interface Competition {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  timeline: string;
  applyUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Training {
  id: string;
  type: "External" | "Internal";
  title: string;
  date: string;
  place: string;
  description: string;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobExpo {
  id: string;
  jobLink: string;
  title: string;
  employmentType: string;
  jobDescriptionSummary: string | null;
  jobDescriptionFull: string | null;
  skills: string | null;
  educationLevel: string | null;
  // Tab 1
  minYearsOfExperience: number | null;
  broadExpertise: string | null;
  specificExpertise: string | null;
  // Tab 2
  glintStatus: string | null;
  salaryRangeIdr: string | null;
  locationGroup: string | null;
  l1Category: string | null;
  l2Category: string | null;
  // Source
  source: string;
  city: string;
  province: string | null;
  companyName: string;
  companyAddress: string | null;
  companyLogoUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaPartner {
  id: string;
  name: string;
  logoUrl: string;
  row: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyPartner {
  id: string;
  name: string;
  logoUrl: string;
  row: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
