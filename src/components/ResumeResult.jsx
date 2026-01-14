const ResumeResult = ({ data }) => {
  const gpt = data?.gpt_feedback;

  if (!gpt || gpt.error) {
    return (
      <div className="mt-8 bg-red-50 p-4 rounded">
        <p className="text-red-600">Resume analysis failed.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow space-y-8">

      <h2 className="text-2xl font-bold text-orange-500">
        Resume Analysis
      </h2>

      {/* Score */}
      <p className="text-lg">
        <span className="font-semibold">Resume Score:</span>{" "}
        {gpt.resume_score}%
      </p>

      {/* Missing Sections */}
      <div>
        <h3 className="font-semibold">Missing Sections</h3>
        <ul className="list-disc ml-6">
          {gpt.missing_sections.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* ATS Keywords */}
      <div>
        <h3 className="font-semibold">Missing ATS Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {gpt.ats_keywords_missing.map((k, i) => (
            <span key={i} className="px-3 py-1 bg-red-100 rounded">
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div>
        <h3 className="font-bold text-lg text-green-600">
          Strengths
        </h3>
        <ul className="list-disc ml-6">
          {gpt.strengths.map((s, i) => (
            <li key={i}>
              <b>{s.title}:</b> {s.detail}
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div>
        <h3 className="font-bold text-lg text-red-600">
          Weaknesses
        </h3>
        <ul className="list-disc ml-6">
          {gpt.weaknesses.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </div>

      {/* Skill Matrix */}
      <div>
        <h3 className="font-bold text-lg">Skill Matrix</h3>
        <p><b>Proficient:</b> {gpt.skill_matrix.proficient.join(", ")}</p>
        <p><b>Familiar:</b> {gpt.skill_matrix.familiar.join(", ")}</p>
        <p><b>Learning:</b> {gpt.skill_matrix.learning.join(", ")}</p>
      </div>

      {/* Experience Improvements */}
      <div>
        <h3 className="font-bold text-lg text-orange-600">
          Experience Improvements
        </h3>

        {gpt.experience_improvements.length === 0 ? (
          <p className="text-gray-500 mt-2">
            No formal work experience detected. Add internships, freelance work,
            academic projects, or volunteering to improve ATS ranking.
          </p>
        ) : (
          gpt.experience_improvements.map((exp, i) => (
            <div key={i} className="mt-4 border-l-4 border-orange-400 pl-4">
              <p className="font-semibold">
                {exp.role} @ {exp.company}
              </p>
              <ul className="list-disc ml-6 mt-2">
                {exp.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {/* Project Improvements */}
      <div>
        <h3 className="font-bold text-lg text-orange-600">
          Project Improvements
        </h3>

        {gpt.project_improvements.length === 0 ? (
          <p className="text-gray-500 mt-2">
            No projects detected. Add at least 2–3 real projects to significantly
            improve your resume score and ATS visibility.
          </p>
        ) : (
          gpt.project_improvements.map((p, i) => (
            <div key={i} className="mt-4 bg-gray-50 p-4 rounded">
              <p className="font-semibold">{p.project}</p>
              <ul className="list-disc ml-6 mt-2">
                {p.improvements.map((imp, j) => (
                  <li key={j}>{imp}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      {/* Certifications */}
      {gpt.certification_fixes.length > 0 && (
        <div className="bg-yellow-50 p-4 rounded">
          <h3 className="font-bold text-yellow-700">
            Certification Recommendations
          </h3>
          <ul className="list-disc ml-6 mt-2">
            {gpt.certification_fixes.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Final Recommendation */}
      <div className="bg-orange-50 p-4 rounded">
        <h3 className="font-bold">Overall Recommendation</h3>
        <p>{gpt.overall_recommendation}</p>
      </div>

    </div>
  );
};

export default ResumeResult;
