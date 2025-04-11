import { useEffect, useState } from "react";
import API from "../api";
import { jwtDecode } from "jwt-decode";


export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editJob, setEditJob] = useState({
    company: "",
    role: "",
    status: "Applied"
  });
  const token = JSON.parse(localStorage.getItem("user"));
  const decodedToken = jwtDecode(token);
  const fetchJobs = async () => {
    try {
      const res = await await API.get(`/jobs/user/${decodedToken.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await API.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const startEditing = (job) => {
    setEditingId(job._id);
    setEditJob({
      company: job.company,
      role: job.role,
      status: job.status
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditJob({ ...editJob, [name]: value });
  };

  const saveUpdate = async () => {
    try {
      await API.put(`/jobs/${editingId}`, editJob, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditingId(null);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (!jobs.length) {
    return <p>No jobs added yet.</p>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div className="job-card" key={job._id}>
          {editingId === job._id ? (
            <>
              <input
                name="company"
                value={editJob.company}
                onChange={handleEditChange}
              />
              <input
                name="role"
                value={editJob.role}
                onChange={handleEditChange}
              />
              <select
                name="status"
                value={editJob.status}
                onChange={handleEditChange}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
              <button onClick={saveUpdate}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{job.company}</h3>
              <p><strong>Role:</strong> {job.role}</p>
              <p><strong>Status:</strong> {job.status}</p>
              <div className="actions">
                <button onClick={() => startEditing(job)}>Edit</button>
                <button className="delete" onClick={() => deleteJob(job._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
