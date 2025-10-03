import { useState } from 'react';
import '../styles/resumeMatcher.css';
import {getDocument} from 'pdfjs-dist';

const ResumeMatcher = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');
  const [matchScore, setMatchScore] = useState(null);
  const [missingKeywords, setMissingKeywords] = useState([]);

  const extractKeywords = (text) => {
    const stopWords = ['the', 'and', 'with', 'for', 'to', 'a', 'in', 'on', 'of', 'at'];
    return [...new Set(
      text
        .toLowerCase()
        .split(/[\s,.;:()]+/)
        .filter(word => word.length > 3 && !stopWords.includes(word))
    )];
  };

  const calculateMatch = () => {
    const resumeWords = extractKeywords(resumeText);
    const jobWords = extractKeywords(jobText);
    const matched = resumeWords.filter(word => jobWords.includes(word));
    const missing = jobWords.filter(word => !resumeWords.includes(word));
    const score = Math.round((matched.length / jobWords.length) * 100);

    setMatchScore(score);
    setMissingKeywords(missing);
  };

  const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file || file.type !== 'application/pdf') return;

  const reader = new FileReader();
  reader.onload = async () => {
    const typedArray = new Uint8Array(reader.result);
    const pdf = await getDocument(typedArray).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      text += pageText + '\n';
    }

    setResumeText(text);
  };
  reader.readAsArrayBuffer(file);
};
  return (
    <div className="resume-matcher">
      <h3>📄 Resume Matcher</h3>

      <input type="file" accept=".pdf" onChange={handleFileUpload} />

      <textarea
        rows="6"
        placeholder="Or paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <textarea
        rows="6"
        placeholder="Paste job description here..."
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
      />

      <button onClick={calculateMatch}>Compare</button>

      {matchScore !== null && (
        <div className="match-results">
          <p><strong>Match Score:</strong> {matchScore}%</p>
          <p><strong>Missing Keywords:</strong> {missingKeywords.join(', ') || 'None 🎉'}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeMatcher;