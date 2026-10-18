import axios from "axios";

const publicApi = axios.create({
  baseURL: "/api/public",
  headers: { "Content-Type": "application/json" },
});

export interface CourseDetail {
  description: string;
  content: string[];
  requirements: string[];
  audience: string[];
  reviews: Array<{ name: string; rating: number; text: string }>;
}

export interface PublicCourse {
  id: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  price: string;
  students: number;
  instructor: string;
  image?: string | null;
  card_image?: string | null;
  cloud_url?: string | null;
  details?: CourseDetail | null;
}

export interface Scholarship {
  id: number;
  title: string;
  org: string;
  deadline: string | null;
  location: string;
  requirements: string[];
  desc: string;
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  banner: string;
  description: string;
  shortDescription: string;
  industry: string;
  location: string;
  website?: string;
  teamSize?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image?: string;
  position?: string;
}

const rows = <T,>(data: any): T[] => (Array.isArray(data) ? data : data?.results ?? []);

export async function getPublicCourses(): Promise<PublicCourse[]> {
  const { data } = await publicApi.get("/courses/");
  return rows<PublicCourse>(data);
}

export async function getPublicCourse(id: string | number): Promise<PublicCourse> {
  const { data } = await publicApi.get(`/courses/${id}/`);
  return data;
}

export async function getScholarships(): Promise<Scholarship[]> {
  const { data } = await publicApi.get("/scholarships/");
  return rows<Scholarship>(data);
}

export async function getCompanies(): Promise<Company[]> {
  const { data } = await publicApi.get("/companies/");
  return rows<Company>(data);
}

export async function getCompany(id: string | number): Promise<Company> {
  const { data } = await publicApi.get(`/companies/${id}/`);
  return data;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data } = await publicApi.get("/team-members/");
  return rows<TeamMember>(data);
}
