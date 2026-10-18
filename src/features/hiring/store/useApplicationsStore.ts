import { create } from "zustand";
import { Application, ApplicationStatus } from "../types";
import { hiringService } from "../services/hiring.service";
import { initialApplications } from "../data";

interface ApplicationsState {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  submitApplication: (app: Omit<Application, "id" | "status" | "appliedDate">) => Promise<void>;
  updateStatus: (id: string, status: ApplicationStatus) => Promise<void>;
  fetchApplications: () => Promise<void>;
}

export const useApplicationsStore = create<ApplicationsState>((set, get) => ({
  applications: initialApplications,
  isLoading: false,
  error: null,

  fetchApplications: async () => {
    set({ isLoading: true });
    await new Promise(r => setTimeout(r, 500));
    set({ isLoading: false });
  },

  submitApplication: async (appData) => {
    set({ isLoading: true, error: null });
    try {
      const newApp = await hiringService.applyToCompany(appData);
      set((state) => ({
        applications: [newApp, ...state.applications],
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || "فشل إرسال الطلب.", isLoading: false });
      throw err;
    }
  },

  updateStatus: async (id, status) => {
    set({ isLoading: true });
    try {
      await hiringService.updateApplicationStatus(id, status);
      set((state) => ({
        applications: state.applications.map((a) =>
          a.id === id ? { ...a, status } : a
        ),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: "فشل تحديث الحالة.", isLoading: false });
    }
  },
}));
