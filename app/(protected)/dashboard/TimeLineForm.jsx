"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TimelineForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [msg, setMsg] = useState("");
  const [timelines, setTimelines] = useState([]);
  
  const [formData, setFormData] = useState({
    eventDate: "",
    entitle: "",
    zntitle: "",
    endescription: "",
    zndescription: "",
  });

  // Fetch existing timelines
  useEffect(() => {
    fetchTimelines();
  }, []);

  const fetchTimelines = async () => {
    try {
      const res = await fetch("/api/timeline");
      if (res.ok) {
        const data = await res.json();
        setTimelines(data.timelines || []);
      }
    } catch (error) {
      console.error("Error fetching timelines:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/timeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMsg("✅ Event added successfully!");
      // Reset form
      setFormData({
        eventDate: "",
        entitle: "",
        zntitle: "",
        endescription: "",
        zndescription: "",
      });
      
      // Refresh the timeline list
      await fetchTimelines();
      router.refresh();
      
    } catch (error) {
      setMsg(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this timeline event?")) {
      return;
    }

    setDeletingId(id);
    setMsg("");

    try {
      const res = await fetch(`/api/timeline?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete");

      setMsg("🗑️ Event deleted successfully!");
      
      // Remove from local state
      setTimelines(timelines.filter(timeline => timeline._id !== id));
      router.refresh();
      
    } catch (error) {
      setMsg(`❌ Error: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Add Timeline Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 space-y-6">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">Add Timeline Event</h2>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-neutral-300">Event Date</label>
          <input
            type="date"
            name="eventDate"
            required
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Section */}
          <div className="space-y-4">
            <h3 className="text-blue-600 font-semibold text-sm uppercase tracking-wider">English (EN)</h3>
            <input
              type="text"
              name="entitle"
              placeholder="Title (e.g., Project Launch)"
              required
              maxLength={100}
              value={formData.entitle}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent dark:text-white focus:border-blue-500 outline-none"
            />
            <textarea
              name="endescription"
              placeholder="Description..."
              required
              maxLength={300}
              rows={4}
              value={formData.endescription}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent dark:text-white focus:border-blue-500 outline-none resize-none"
            />
          </div>

          {/* Chinese Section */}
          <div className="space-y-4">
            <h3 className="text-red-600 font-semibold text-sm uppercase tracking-wider">Chinese (ZN)</h3>
            <input
              type="text"
              name="zntitle"
              placeholder="标题 (e.g., 项目启动)"
              required
              maxLength={100}
              value={formData.zntitle}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent dark:text-white focus:border-red-500 outline-none"
            />
            <textarea
              name="zndescription"
              placeholder="描述..."
              required
              maxLength={300}
              rows={4}
              value={formData.zndescription}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent dark:text-white focus:border-red-500 outline-none resize-none"
            />
          </div>
        </div>

        {msg && <p className={`text-sm font-medium animate-pulse ${msg.includes('✅') || msg.includes('🗑️') ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Publish Event"}
        </button>
      </form>

      {/* Existing Timelines List */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Timeline Events</h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
              {timelines.length} event{timelines.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {timelines.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-4">
                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-300 mb-2">No timeline events yet</h3>
              <p className="text-neutral-500 dark:text-neutral-400">Create your first timeline event using the form above</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {timelines.map((timeline) => (
                <div key={timeline._id} className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-full">
                          {formatDate(timeline.eventDate)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                            {timeline.entitle}
                          </h4>
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            {timeline.endescription}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                            {timeline.zntitle}
                          </h4>
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            {timeline.zndescription}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <button
                        onClick={() => handleDelete(timeline._id)}
                        disabled={deletingId === timeline._id}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete event"
                      >
                        {deletingId === timeline._id ? (
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}