"use client";
import { useState } from "react";

export default function Home() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) return;

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDesc);

    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold mb-10 text-center">📄 AI Resume Analyzer</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          required
          className="block w-full p-3 border border-gray-300 rounded-lg"
        />
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Paste job description here..."
          rows={6}
          className="w-full p-4 border border-gray-300 rounded-lg"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-blue-700"
        >
          Analyze
        </button>
      </form>

      {result && (
        <div className="mt-10 bg-gray-100 dark:bg-gray-700 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">🔍 Result</h2>
          <p><strong>Match Score:</strong> {result.match_score}%</p>
          <p><strong>Common Keywords:</strong> {result.common_keywords.join(", ")}</p>
          <p><strong>Missing Keywords:</strong> {result.missing_keywords.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
