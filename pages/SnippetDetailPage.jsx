import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import snippetService from "../services/snippetService";
import toast from "react-hot-toast";

const SnippetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const data = await snippetService.getById(id);
        setSnippet(data);
      } catch (err) {
        toast.error("Failed to load snippet");
      } finally {
        setLoading(false);
      }
    };
    fetchSnippet();
  }, [id]);

  const copyCode = () => {
    if (snippet?.code) {
      navigator.clipboard.writeText(snippet.code);
      toast.success("Code copied to clipboard!");
    }
  };

  if (loading) return <div className="p-8">Loading snippet...</div>;
  if (!snippet) return <div>Snippet not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button
        onClick={() => navigate("/snippets")}
        className="mb-6 text-indigo-600 hover:underline flex items-center gap-2"
      >
        ← Back to Snippets
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{snippet.title}</h1>
            <span className="inline-block px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              {snippet.language}
            </span>
          </div>
          <button
            onClick={copyCode}
            className="px-5 py-2 bg-gray-900 text-white rounded-xl hover:bg-black flex items-center gap-2"
          >
            📋 Copy Code
          </button>
        </div>

        {snippet.description && <p className="text-lg text-gray-600 mb-8">{snippet.description}</p>}

        <pre className="bg-gray-950 text-gray-100 p-8 rounded-2xl overflow-auto font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {snippet.code}
        </pre>
      </div>
    </div>
  );
};

export default SnippetDetailPage;