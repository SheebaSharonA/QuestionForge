import React, { useState } from 'react';
import './input.css';
import Question from './question';

function Input() {
  const [job, setJob] = useState('');
  const [submittedJob, setSubmittedJob] = useState(''); // For storing submitted job

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job:', job);
    setSubmittedJob(job); // Update submitted job only on submit
  };

  return (
    <div>
      <h2>Generate Interview Questions</h2>
      <form>
        <input 
          type="text" 
          placeholder="Enter a job role (e.g., doctor)" 
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>Generate</button>
      </form>

      {/* Show the Question component only after submission */}
      {submittedJob && <Question job={submittedJob} />}
    </div>
  );
}

export default Input;
