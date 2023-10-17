import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IssueForm from './components/IssueForm';
import IssueList from './components/IssueList';
import './App.css';


function App() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/dummyJson');
      setIssues(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>GitBucketHub</h1>
      <IssueForm setIssues={setIssues} />
      <IssueList issues={issues} setIssues={setIssues} />
    </div>
  );
}

export default App;



