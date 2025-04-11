import { useState } from "react";
import API from "../api";

export default function JobForm() {
  const token = JSON.parse(localStorage.getItem("user"));
  const [job, setJob] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    link: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", job,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJob({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: "",
        link: ""
      });
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={job.company}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={job.role}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="appliedDate"
        value={job.appliedDate}
        onChange={handleChange}
      />
      <input
        type="url"
        name="link"
        placeholder="Job Link"
        value={job.link}
        onChange={handleChange}
      />
      <select name="status" value={job.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
}
