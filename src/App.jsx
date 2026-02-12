import { useState } from 'react'
import './App.css'
import ResumeResult from './components/ResumeResult.jsx';
import JDMatchResult from './components/JDMatchResult.jsx';
import Modal from './components/Modal.jsx';

function App() {
  const [resumeFile, setResumeFile] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [jobResumeFile, setJobResumeFile] = useState("");
  const [jobResumeFileName, setJobResumeFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [resumeResult, setResumeResult] = useState(null);
  const [jdResult, setJdResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading_desc, setLoading_desc] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const HOST = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const handleResumeChange = (type) => (e) => {
    if (e.target.files?.length) {
      if (type === "resume") {
        setResumeFile(e.target.files[0]);
        setResumeFileName(e.target.files[0].name);
      } else if (type === "job-resume") {
        setJobResumeFile(e.target.files[0]);
        setJobResumeFileName(e.target.files[0].name);
      }
    }
  };

  const analyseResume = async () => {
    if (!resumeFile) return alert("Upload resume first");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", resumeFile);

      const res = await fetch(`${HOST}/resume/analyze`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResumeResult(data);
      setJdResult(null);
      setIsModalOpen(true);
      setLoading(false);
    } catch (error) {
      alert("An error occurred while analysing the resume.");
      setLoading(false);
    }
  };

  const analyseJDMatch = async () => {
    if (!jobResumeFile || !jobDescription.trim())
      return alert("Upload resume & paste JD");

    setLoading_desc(true);
    try {
      const formData = new FormData();
      formData.append("file", jobResumeFile);
      formData.append("job_description", jobDescription);

      const res = await fetch(`${HOST}/resume/jd-match`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setJdResult(data);
      setResumeResult(null);
      setIsModalOpen(true);
      setLoading_desc(false);
    } catch (error) {
      alert("An error occurred while analysing the JD match.");
      setLoading_desc(false);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full p-4 md:p-8 bg-gradient-to-b from-indigo-200 to-indigo-100">

        <h2 className="text-center font-bold text-3xl text-indigo-500 mb-6">
          Resume Analyzer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] w-full gap-8 md:gap-4">

          {/* Resume Only */}
          <div className="mt-5 md:me-5">
            <div className="mb-6">
              <label className="block text-indigo-700 font-semibold mb-2">
                Upload Resume
              </label>

              <label
                htmlFor="resume-file"
                className={`block w-full border-2 border-dashed rounded-lg p-4 text-indigo-600 cursor-pointer text-center hover:bg-indigo-50 transition ${resumeFile ? "border-green-400" : "border-indigo-300"}`}
              >
                {resumeFileName || "Click to upload resume"}
              </label>

              <input
                type="file"
                id="resume-file"
                className="hidden"
                onChange={handleResumeChange("resume")}
              />
            </div>

            <button disabled={loading} className={`w-full text-white font-semibold py-3 rounded-xl text-lg transition shadow-md ${loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-400 hover:bg-indigo-500 cursor-pointer"}`} onClick={analyseResume}>
              {loading ? "Analysing..." : "Analyse Resume"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="flex w-full items-center md:hidden">
              <hr className="flex-grow border-indigo-300" />
              <span className="px-3 text-indigo-500 font-semibold">OR</span>
              <hr className="flex-grow border-indigo-300" />
            </div>

            <div className="hidden md:flex flex-col items-center h-full">
              <hr className="w-px h-64 bg-indigo-300 border-0" />
              <span className="py-3 text-indigo-500 font-semibold">OR</span>
              <hr className="w-px h-64 bg-indigo-300 border-0" />
            </div>
          </div>

          {/* Resume + JD */}
          <div className="mt-5 md:ml-5">
            <div className="mb-6">
              <label className="block text-indigo-700 font-semibold mb-2">
                Upload Resume
              </label>

              <label
                htmlFor="job-resume-file"
                className={`block w-full border-2 border-dashed rounded-lg p-4 text-indigo-600 cursor-pointer text-center hover:bg-indigo-50 transition ${jobResumeFile ? "border-green-400" : "border-indigo-300"}`}
              >
                {jobResumeFileName || "Click to upload resume"}
              </label>

              <input
                type="file"
                id="job-resume-file"
                className="hidden"
                onChange={handleResumeChange("job-resume")}
              />
            </div>

            <div className="mb-6">
              <label className="block text-indigo-700 font-semibold mb-2">
                Paste Job Description
              </label>
              <textarea
                rows="5"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                className="w-full border-2 border-indigo-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              disabled={loading_desc}
              onClick={analyseJDMatch}
              className={`w-full text-white font-semibold py-3 rounded-xl text-lg transition shadow-md ${loading_desc ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-400 hover:bg-indigo-500 cursor-pointer"}`}
            >
              {loading_desc ? "Analysing..." : "Analyse Job Description"}
            </button>

          </div>

        </div>
        {/* RESULTS */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {resumeResult && <ResumeResult data={resumeResult} />}
          {jdResult && <JDMatchResult data={jdResult} />}
        </Modal>

      </div>
    </>
  );
}

export default App;
