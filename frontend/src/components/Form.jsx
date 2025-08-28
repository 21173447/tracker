import { useState } from "react";
import { useIssueStore } from "../../store/issue";
import { Plus, CheckCircle, XCircle } from "lucide-react";

export default function Form() {
  const { createIssue } = useIssueStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Open",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear message when user starts typing
    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    
    try {
      await createIssue(formData);
      setMessage("Issue created successfully!");
      setIsError(false);
      setFormData({ title: "", description: "", status: "Open" });
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setMessage(err.message);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Create New Issue</h2>
        <p className="text-gray-600 text-sm">Add a new task to your project tracker</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Issue Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about this issue..."
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            disabled={isSubmitting}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              Creating...
            </>
          ) : (
            <>
              <Plus size={18} />
              Create Issue
            </>
          )}
        </button>
      </form>
      
      {message && (
        <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {isError ? (
            <XCircle size={20} className="flex-shrink-0" />
          ) : (
            <CheckCircle size={20} className="flex-shrink-0" />
          )}
          <span className="text-sm">{message}</span>
        </div>
      )}
    </div>
  );
}