import { useState } from 'react';
import '../styles/jobParser.css';

const JobParser = ({ onExtract }) => {
  const [description, setDescription] = useState('');

  const extractFields = (text) => {
    const roleMatch = text.match(/(?<=Role:|Position:|Title:)\s*(.+)/i);
    const companyMatch = text.match(/(?<=Company:)\s*(.+)/i);
    const locationMatch = text.match(/(?<=Location:)\s*(.+)/i);

    const stopWords = ['the', 'and', 'with', 'for', 'to', 'a', 'in'];
    const keywords = [...new Set(
      text
        .toLowerCase()
        .split(/[\s,.;:()]+/)
        .filter(word => word.length > 3 && !stopWords.includes(word))
    )];

    return {
      role: roleMatch?.[1] || '',
      company: companyMatch?.[1] || '',
      location: locationMatch?.[1] || '',
      keywords,
    };
  };

  const handleParse = () => {
    const parsed = extractFields(description);
    onExtract(parsed);
  };

  return (
    <div className="job-parser">
      <h3>🧠 Paste Job Description</h3>
      <textarea
        rows="8"
        placeholder="Paste full job description here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleParse}>Extract Info</button>
    </div>
  );
};

export default JobParser;