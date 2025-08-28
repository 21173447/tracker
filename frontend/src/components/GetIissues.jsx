import { useEffect, useState } from "react";
import { useIssueStore } from "../../store/issue";
import { Pencil, Trash2, Search, X, Filter, Plus, ChevronDown, ChevronUp } from "lucide-react";

export default function ViewIssues() {
  const { issues, fetchIssues, updateIssue, deleteIssue } = useIssueStore();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Open",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedColumns, setExpandedColumns] = useState({
    Open: true,
    "In Progress": true,
    Closed: true
  });

  useEffect(() => {
    fetchIssues();
  }, []);

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

  const handleUpdate = async () => {
    try {
      await updateIssue(editingId, formData);
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

  const toggleColumn = (status) => {
    setExpandedColumns(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIconColor = (status) => {
    switch (status) {
      case "Open":
        return "text-green-500";
      case "In Progress":
        return "text-blue-500";
      case "Closed":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const statuses = ["Open", "In Progress", "Closed"];
  
  const filteredIssues = issues.filter(issue => {
    return issue.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           issue.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getIssuesByStatus = (status) => {
    return filteredIssues.filter(issue => issue.status === status);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Issue Tracker</h2>
        <p className="text-gray-600">Manage and track all your project issues</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div key={status} className="bg-gray-50 rounded-xl shadow-sm border border-gray-200">
            {/* Column Header */}
            <div 
              className={`p-4 rounded-t-xl border-b flex justify-between items-center cursor-pointer ${
                status === "Open" 
                  ? "bg-green-50 border-green-200" 
                  : status === "In Progress" 
                  ? "bg-blue-50 border-blue-200" 
                  : "bg-gray-50 border-gray-200"
              }`}
              onClick={() => toggleColumn(status)}
            >
              <div className="flex items-center">
                <span className={`font-semibold ${
                  status === "Open" 
                    ? "text-green-700" 
                    : status === "In Progress" 
                    ? "text-blue-700" 
                    : "text-gray-700"
                }`}>
                  {status}
                </span>
                <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                  status === "Open" 
                    ? "bg-green-200 text-green-800" 
                    : status === "In Progress" 
                    ? "bg-blue-200 text-blue-800" 
                    : "bg-gray-200 text-gray-800"
                }`}>
                  {getIssuesByStatus(status).length}
                </span>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                {expandedColumns[status] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {/* Issues List */}
            {expandedColumns[status] && (
              <div className="p-4 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                {getIssuesByStatus(status).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No {status.toLowerCase()} issues</p>
                  </div>
                ) : (
                  getIssuesByStatus(status).map((issue) => (
                    <div
                      key={issue._id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{issue.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{issue.description}</p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}
                        >
                          {issue.status}
                        </span>
                        
                        <div className="flex space-x-2">
                          <button
                            className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            onClick={() => handleEdit(issue)}
                            aria-label="Edit issue"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            onClick={() => handleDelete(issue._id)}
                            aria-label="Delete issue"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md animate-fade-in">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-gray-800">Edit Issue</h3>
              <button
                onClick={() => setEditingId(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-200 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Issue title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-gray-200 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  rows={3}
                  placeholder="Issue description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border border-gray-200 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingId(null)}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}