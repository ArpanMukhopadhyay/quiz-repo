import React, { useState } from 'react';
import axios from 'axios';

function IssueForm({ setIssues }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newIssue = { title, description };
    const response = await axios.post('http://localhost:3000/dummyJson', newIssue);

    setIssues(prevIssues => [...prevIssues, response.data]);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h2>Create Issue</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Add Issue</button>
      </form>
    </div>
  );
}

export default IssueForm;
