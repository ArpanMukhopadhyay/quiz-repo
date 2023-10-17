import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IssueList({ issues, setIssues }) {

  const [editingIssue, setEditingIssue] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await axios.get('http://localhost:3000/dummyJson');
      setIssues(response.data);
    };

    fetchIssues();
  }, [setIssues]);

  const handleUpdate = async (id) => {
    const updatedIssue = { title: updatedTitle, description: updatedDescription };
    const response = await axios.put(`http://localhost:3000/dummyJson/${id}`, updatedIssue);

    setIssues(issues.map(issue => issue.id === id ? response.data : issue));
    setEditingIssue(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/dummyJson/${id}`);
    setIssues(issues.filter((issue) => issue.id !== id));
  };

  return (
    <div>
      <h2>Issues</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            {editingIssue === issue.id ? (
              <div>
                <input 
                  value={updatedTitle} 
                  onChange={(e) => setUpdatedTitle(e.target.value)} 
                  placeholder="Updated Title" 
                />
                <input 
                  value={updatedDescription} 
                  onChange={(e) => setUpdatedDescription(e.target.value)} 
                  placeholder="Updated Description" 
                />
                <button onClick={() => handleUpdate(issue.id)}>Save</button>
                <button onClick={() => setEditingIssue(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <button onClick={() => {
                  setEditingIssue(issue.id);
                  setUpdatedTitle(issue.title);
                  setUpdatedDescription(issue.description);
                }}>Edit</button>
                <button onClick={() => handleDelete(issue.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IssueList;


