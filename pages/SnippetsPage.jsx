import { useState, useEffect } from "react";
import snippetService from "../services/snippetService";
import SnippetCard from "../components/SnippetCard";
import SnippetForm from "../components/SnippetForm";
import toast from "react-hot-toast";

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  const fetchSnippets = async () => {
    try {
      const data = await snippetService.getAll();
      setSnippets(data);
    } catch (err) {
      toast.error("Failed to load snippets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleCreate = async (data) => {
    try {
      const newSnippet = await snippetService.create(data);
      setSnippets([newSnippet, ...snippets]);
      setShowForm(false);
      toast.success("Snippet created!");
    } catch (err) {
      toast.error("Failed to create snippet");
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const updated = await snippetService.update(id, data);
      setSnippets(snippets.map(s => s.id === id ? updated : s));
      setShowForm(false);
      setEditingSnippet(null);
      toast.success("Snippet updated!");
    } catch (err) {
      toast.error("Failed to update snippet");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this snippet?")) return;
    try {
      await snippetService.remove(id);
      setSnippets(snippets.filter(s => s.id !== id));
      toast.success("Snippet deleted");
    } catch (err) {
      toast.error("Failed to delete snippet");
    }
  };

  const handleEdit = (snippet) => {
    setEditingSnippet(snippet);
    setShowForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Snippets</h1>
        <button
          onClick={() => { setEditingSnippet(null); setShowForm(!showForm); }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
        >
          + New Snippet
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-2xl shadow">
          <SnippetForm
            initialData={editingSnippet}
            onSubmit={editingSnippet ? (data) => handleUpdate(editingSnippet.id, data) : handleCreate}
            onCancel={() => { setShowForm(false); setEditingSnippet(null); }}
          />
        </div>
      )}

      {loading ? (
        <p>Loading snippets...</p>
      ) : snippets.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No snippets yet. Create your first one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map(snippet => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SnippetsPage;