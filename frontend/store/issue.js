import { create } from 'zustand';
import { updateIssue } from '../../backend/controller/IssueController';

export const useIssueStore = create((set) => ({
  issues: [],
  setIssues: (issues) => set({ issues }),

  createIssue: async (issueData) => {
    if (!issueData.title || !issueData.description) {
      throw new Error("Title and description are required");
    }

    const res = await fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(issueData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create issue");
    }

    set((state) => ({ issues: [...state.issues, data] }));

    return data;
  },
}));



updateIssue