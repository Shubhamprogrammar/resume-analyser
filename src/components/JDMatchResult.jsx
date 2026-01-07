const JDMatchResult = ({ data }) => {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-orange-500 mb-4">
        JD Match Result
      </h2>

      <p><span className="font-semibold">Match Percentage:</span> {data.match_percentage}%</p>

      <div className="mt-4">
        <h3 className="font-semibold">Matched Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {data.matched_keywords.map((k, i) => (
            <span key={i} className="px-3 py-1 bg-green-100 rounded">
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Missing Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {data.missing_keywords.map((k, i) => (
            <span key={i} className="px-3 py-1 bg-red-100 rounded">
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">GPT Analysis</h3>
        <p>{data.gpt_analysis}</p>
      </div>
    </div>
  );
};

export default JDMatchResult;
