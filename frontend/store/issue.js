import { create } from 'zustand';

export const useIssueStore = create((set, get) => ({
  issues: [],
  setIssues: (issues) => set({ issues }),

  // Fetch all issues from backend
  fetchIssues: async () => {
    try {
      const res = await fetch('/api/issues');
      const data = await res.json();
      set({ issues: data });
    } catch (err) {
      console.error("Failed to fetch issues:", err);
    }
  },

  // Create new issue
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

  // Update existing issue
  updateIssue: async (id, updatedData) => {
    try {
      const res = await fetch(`/api/issues/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update issue");
      }

      // Update state locally
      set({
        issues: get().issues.map((issue) =>
          issue._id === id ? data.data : issue
        ),
      });

      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  // Delete an issue
  deleteIssue: async (id) => {
    try {
      const res = await fetch(`/api/issues/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete issue");
      }

      // Remove from state
      set({
        issues: get().issues.filter((issue) => issue._id !== id),
      });

      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
}));
