import { useNavigate } from "react-router-dom";

const SnippetCard = ({ snippet, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const copyCode = () => {
    navigator.clipboard.writeText(snippet.code);
    alert("Code copied!");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 
            onClick={() => navigate(`/snippets/${snippet.id}`)}
            className="text-xl font-semibold cursor-pointer hover:text-indigo-600"
          >
            {snippet.title}
          </h3>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
            {snippet.language}
          </span>
        </div>

        {snippet.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{snippet.description}</p>
        )}

        <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl text-xs overflow-auto max-h-32 font-mono mb-4">
          {snippet.code?.substring(0, 150)}...
        </pre>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(snippet)}
            className="flex-1 py-2 text-sm border border-gray-300 rounded-xl hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(snippet.id)}
            className="flex-1 py-2 text-sm border border-red-200 text-red-600 rounded-xl hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;

