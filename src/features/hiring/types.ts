export type ApplicationStatus = "Pending" | "Reviewed" | "Accepted" | "Rejected";

export interface Company {
  id: string;
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

export interface Application {
  id: string;
  companyId: string;
  companyName: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  cvUrl: string;
  status: ApplicationStatus;
  appliedDate: string;
}

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface UploadState {
  status: UploadStatus;
  progress: number;
  file: File | null;
  error?: string;
}
