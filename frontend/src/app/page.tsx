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
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700 dark:text-blue-400">
        AI Resume Analyzer
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Upload Resume (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            required
            className="block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Paste Job Description
          </label>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Enter job description here.."
            rows={6}
            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition"
        >
          Analyze Resume
        </button>
      </form>

      {result && (
        <div className="mt-10 p-6 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-xl space-y-4 border border-green-300 dark:border-green-700">
          <h3 className="text-2xl font-bold">Match Results</h3>
          <p><strong>Match Score:</strong> {result.match_score}%</p>
          <p><strong>Common Keywords:</strong> {result.common_keywords.join(", ")}</p>
          <p><strong>Missing Keywords:</strong> {result.missing_keywords.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
