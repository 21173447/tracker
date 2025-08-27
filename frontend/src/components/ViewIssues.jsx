import { useEffect, useState } from "react";
import { useIssueStore } from "../../store/issue";

export default function ViewIssues() {
  const { issues, fetchIssues, updateIssue, deleteIssue } = useIssueStore();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Open",
  });

  // Load issues on mount
  useEffect(() => {
    fetchIssues();
  }, []);

  // Start editing an issue
  const handleEdit = (issue) => {
    setEditingId(issue._id);
    setFormData({
      title: issue.title,
      description: issue.description,
      status: issue.status,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    try {
      await updateIssue(id, formData);
      setEditingId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      try {
        await deleteIssue(id);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">All Issues</h2>
      {issues.length === 0 && <p>No issues found.</p>}

      <div className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="border p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
          >
            {editingId === issue._id ? (
              <div className="flex-1 space-y-2">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  rows={2}
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            ) : (
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-lg">{issue.title}</h3>
                <p>{issue.description}</p>
                <p className="text-sm text-gray-600">Status: {issue.status}</p>
              </div>
            )}

            <div className="flex space-x-2 mt-2 md:mt-0">
              {editingId === issue._id ? (
                <>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => handleUpdate(issue._id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(issue)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(issue._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
