const JDMatchResult = ({ data }) => {
  const gpt = data?.gpt_analysis;

  if (!gpt || gpt.error) {
    return (
      <div className="mt-8 bg-red-50 p-4 rounded">
        <p className="text-red-600">Failed to analyze JD match.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-orange-500 mb-4">
        JD Match Result
      </h2>

      <p>
        <span className="font-semibold">Match Percentage:</span>{" "}
        {gpt.match_percentage}%
      </p>

      <div className="mt-6">
        <h3 className="font-semibold text-lg">Match Summary</h3>
        <p className="text-gray-700">{gpt.match_summary}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Matched Skills</h3>
        <div className="flex flex-wrap gap-2">
          {(gpt.matched_skills || []).map((k, i) => (
            <span key={i} className="px-3 py-1 bg-green-100 rounded">
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Missing Skills</h3>
        <div className="flex flex-wrap gap-2">
          {(gpt.missing_skills || []).map((k, i) => (
            <span key={i} className="px-3 py-1 bg-red-100 rounded">
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-lg text-red-600">
          Experience Gaps
        </h3>
        <ul className="list-disc ml-6">
          {(gpt.experience_gaps || []).map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 bg-orange-50 p-4 rounded">
        <h3 className="font-semibold">Hiring Recommendation</h3>
        <p>{gpt.final_hiring_recommendation}</p>
      </div>
    </div>
  );
};

export default JDMatchResult;
