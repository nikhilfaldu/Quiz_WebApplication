import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
 
  const [record, setRecord] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);




  const navigate = useNavigate();

  const user = Cookies.get('user');

  if (!user) {
    navigate('/');
}


  const getData = () => {
    fetch("http://localhost:8081/userdetals")
      .then((response) => response.json())
      .then((res) => setRecord(res))
      .catch(error => console.error('Error fetching data:', error));
  };
  useEffect(() => {
    getData();
  }, [])


  const usercount = record.length;
 
  
  const handleSearch = () => {
    const filtered = record.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecords(filtered);
    setSearchClicked(true);
  };

  return (
    <div className="col main pt-5 mt-3">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        {/* Breadcrumb items */}
        <ol className="breadcrumb">
          <li className="breadcrumb-item">  
            <Link to="/dashboard">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/userdetails">Userdetails</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>

      {/* Alert */}
      <div className="alert alert-warning fade collapse" role="alert" id="myAlert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about employee
      </div>

      {/* Total Admin */}
      <div className=" mb-3">
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card bg-success text-white h-100">
            <div className="card-body bg-success" style={{ backgroundColor: "#57b960" }}>
              <h6 className="text-uppercase">Total user</h6>
              <h1 className="display-4">{usercount}</h1>
            </div>
          </div>
        </div>
      </div>
      <hr />

      
      {/* Search */}
      <div className="mb-3">
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

      {/* Filtered Records */}
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {searchClicked
            ? filteredRecords.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                </tr>
              ))
            : record.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
