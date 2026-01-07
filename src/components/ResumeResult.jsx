const ResumeResult = ({ data }) => {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-orange-500 mb-4">
        Resume Analysis Result
      </h2>

      <p><span className="font-semibold">Resume Score:</span> {data.resume_score}%</p>

      <div className="mt-4">
        <h3 className="font-semibold">Missing Sections</h3>
        <ul className="list-disc ml-6">
          {data.missing_sections.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Missing ATS Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {data.ats_keywords_missing.map((k, i) => (
            <span key={i} className="px-3 py-1 bg-red-100 rounded">
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">GPT Feedback</h3>
        <p className="text-gray-700">{data.gpt_feedback}</p>
      </div>
    </div>
  );
};

export default ResumeResult;
