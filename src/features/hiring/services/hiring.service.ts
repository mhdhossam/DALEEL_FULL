import { Company, Application, ApplicationStatus } from "../types";
import { getCompanies, getCompany } from "@/lib/contentApi";

export const hiringService = {
  async getCompanies(): Promise<Company[]> {
    const companies = await getCompanies();
    return companies.map((company) => ({ ...company, id: String(company.id) }));
  },

  async getCompanyById(id: string): Promise<Company | undefined> {
    try {
      const company = await getCompany(id);
      return { ...company, id: String(company.id) };
    } catch {
      return undefined;
    }
  },

  async applyToCompany(
    appData: Omit<Application, "id" | "status" | "appliedDate">
  ): Promise<Application> {
    return {
      ...appData,
      id: `app-${Date.now()}`,
      status: "Pending",
      appliedDate: new Date().toISOString().split("T")[0],
    };
  },

  async updateApplicationStatus(_id: string, _status: ApplicationStatus): Promise<void> {
    return;
  },
};
