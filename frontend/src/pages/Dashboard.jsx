import React from "react";
import Navbar from "../components/Navbar";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <JobForm />
      <JobList />
    </>
  );
};

export default Dashboard;
