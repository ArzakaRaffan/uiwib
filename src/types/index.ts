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
  companyLogoUrl: string;
  companyName: string;
  jobTitle: string;
  industry: string;
  salary: string | null;
  employmentType: "Full Time" | "Part Time" | "Internship";
  qualification: string;
  city: string;
  location: "Jabodetabek" | "Non-Jabodetabek" | "Remote";
  deadline: Date;
  applyUrl: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
