import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder - replace with real API call when dashboard endpoint is confirmed
    setTimeout(() => {
      setStats({
        snippets: 12,
        resources: 8,
        tasks: 5
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-5xl mb-2">📝</div>
          <div className="text-3xl font-bold">{stats?.snippets}</div>
          <div className="text-gray-600">Snippets</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-5xl mb-2">🔖</div>
          <div className="text-3xl font-bold">{stats?.resources}</div>
          <div className="text-gray-600">Resources</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="text-5xl mb-2">✅</div>
          <div className="text-3xl font-bold">{stats?.tasks}</div>
          <div className="text-gray-600">Tasks</div>
        </div>
      </div>

      <p className="text-gray-600">Full dashboard with recent items coming soon.</p>
    </div>
  );
};

export default DashboardPage;