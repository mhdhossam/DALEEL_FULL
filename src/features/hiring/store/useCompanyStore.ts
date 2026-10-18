import { create } from "zustand";
import { Company } from "../types";
import { hiringService } from "../services/hiring.service";

interface CompanyState {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
  fetchCompanies: () => Promise<void>;
  getCompanyById: (id: string) => Promise<Company | undefined>;
}

export const useCompanyStore = create<CompanyState>((set, get) => ({
  companies: [],
  isLoading: false,
  error: null,

  fetchCompanies: async () => {
    set({ isLoading: true, error: null });
    try {
      const companies = await hiringService.getCompanies();
      set({ companies, isLoading: false });
    } catch (err) {
      set({ error: "فشل تحميل الشركات. يرجى المحاولة لاحقاً.", isLoading: false });
    }
  },

  getCompanyById: async (id: string) => {
    const existing = get().companies.find(c => c.id === id);
    if (existing) return existing;
    
    set({ isLoading: true });
    const company = await hiringService.getCompanyById(id);
    set({ isLoading: false });
    return company;
  },
}));
