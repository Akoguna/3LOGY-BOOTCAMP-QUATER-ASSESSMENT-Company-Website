import { useState, useEffect } from "react";

const SnippetForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    language: "javascript",
    code: "",
    description: "",
    tags: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        language: initialData.language || "javascript",
        code: initialData.code || "",
        description: initialData.description || "",
        tags: initialData.tags ? initialData.tags.join(", ") : ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : []
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">Language</label>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="csharp">C#</option>
          <option value="typescript">TypeScript</option>
          <option value="java">Java</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="sql">SQL</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">Code</label>
        <textarea
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          rows={8}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-xl px-4 py-3"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
        >
          {initialData ? "Update Snippet" : "Create Snippet"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SnippetForm;