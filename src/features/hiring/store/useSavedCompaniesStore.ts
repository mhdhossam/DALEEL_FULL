import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedCompaniesState {
  savedCompanyIds: string[];
  toggleSaveCompany: (companyId: string) => void;
  isSaved: (companyId: string) => boolean;
}

export const useSavedCompaniesStore = create<SavedCompaniesState>()(
  persist(
    (set, get) => ({
      savedCompanyIds: [],
      toggleSaveCompany: (companyId) => {
        const { savedCompanyIds } = get();
        if (savedCompanyIds.includes(companyId)) {
          set({ savedCompanyIds: savedCompanyIds.filter((id) => id !== companyId) });
        } else {
          set({ savedCompanyIds: [...savedCompanyIds, companyId] });
        }
      },
      isSaved: (companyId) => get().savedCompanyIds.includes(companyId),
    }),
    {
      name: "saved-companies-storage",
    }
  )
);
