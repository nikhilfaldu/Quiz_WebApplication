import React, { useEffect, useState } from "react";
import './Allinfo.css';
import Cookies from 'js-cookie';

import {useNavigate } from 'react-router-dom';
const AdminAllinfo = () => {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const navigate = useNavigate();

  const user = Cookies.get('user');

  if (!user) {
    navigate('/');
}
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8081/results");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Filter records based on search query
  useEffect(() => {
    const filtered = records.filter(item =>
      item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecords(filtered);
  }, [records, searchQuery]);

  // Handle search button click
  const handleSearch = () => {
    setSearchClicked(true);
  };

  const ableRowsCount = records.length;

  return (
    <div className="col main pt-5 mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/dashboard">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/allinfo">ALLINFO</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
      <p className="lead d-none d-sm-block">
        Add Employee Details and Records
      </p>
      <div className="alert alert-warning fade collapse" role="alert" id="myAlert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about employee
      </div>
  
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-danger ">
            <div className="card-body bg-danger">
              <h6 className="text-uppercase">Total given test</h6>
              <h1 className="display-4">{ableRowsCount}</h1>
            </div>
        </div>
      </div>
      <hr />
      <div className="bottomtable">
      <div >
        <label htmlFor="search" className="form-label">
          Search by Name
        </label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Enter name to search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Language</th>
              <th>Total Question</th>
              <th>Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            {(searchClicked ? filteredRecords : records).map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.language}</td>
                <td>{item.total}</td>
                <td>{item.correct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      <a id="more"></a>
      <hr />
    </div>
  );
};

export default AdminAllinfo;
