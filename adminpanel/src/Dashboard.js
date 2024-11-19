import React, { useEffect, useState } from "react";
import qs from 'qs';
import './Dashboar.css';
import Cookies from 'js-cookie';

import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [record, setRecord] = useState([]);

  const userrr = Cookies.get('user');
  if (!userrr) {
    navigate('/');
}
  const getData = () => {
    fetch("http://localhost:8081/api/questions")
      .then((response) => response.json())
      .then((res) => setRecord(res));
  };

  const languages = Array.from(new Set(record.map(entry => entry.language)));

console.log(languages);
  useEffect(() => {
    getData();
    // const intervalId = setInterval(getData, 10000);

    // // Cleanup the interval when the component is unmounted
    // return () => clearInterval(intervalId);
  }, []);

  

  const ableRowsCount = languages.length;


  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="col main pt-5 mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a>Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
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
      <div className="mb-3">
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card bg-success text-white h-100">
            <div
              className="card-body bg-success"
              style={{ backgroundColor: "#57b960" }}
            >
              <h6 className="text-uppercase">Total Subject</h6>
              <h1 className="display-4">{ableRowsCount}</h1>
            </div>
          </div>
        </div>
      </div>
      <hr />

 

      <div className="table-responsive">

      {languages.map((item) => (
  <article className="badge" style={{ backgroundColor: getRandomColor() }} key={item}>
    <Link to={`/quiz/${item}`} style={{ textDecoration: 'none' }} >
      <div className="rounded"  >
        {item}
      </div>
    </Link>
  </article>
))}

<article className="badge" style={{ backgroundColor: getRandomColor() }} >
    <Link to='/Addlanguage' style={{ textDecoration: 'none' }} >
      <div className="rounded"  >
       <h3>+ ADD</h3> 
       
      </div>
    </Link>
  </article>
      </div>
      <a id="more"></a>
      <hr />
    </div>
  );
};

export default Dashboard;