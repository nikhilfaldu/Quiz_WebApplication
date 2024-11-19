import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./navbar";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);

  useEffect(() => {
    // Check if the cookie is not set
    if (!Cookies.get("clientlogin")) {
      // Redirect to the login page
      navigate("/login"); // Replace '/login' with the actual login page URL
    }
  }, [navigate]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setRecord(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const languages = Array.from(new Set(record.map((entry) => entry.language)));

  return (
    <body className="dashbody">
      <div className="dashmain">
        <Navbar />
        <div className="index">
          <h1></h1>
          <h5>
            <b>The Time</b> your game is most vulnerable is when you're ahead.
            Never let up." -- Rod Laver, Adidas
          </h5>
          <main className="wrapper">
            {languages.map((item) => (
              <article
                className="badge"
                style={{ backgroundColor: getRandomColor() }}
                key={item}
              >
                <Link
                  to={`/quiz/${item}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="rounded">{item}</div>
                </Link>
              </article>
            ))}
          </main>
        </div>
      </div>
    </body>
  );
};

export default Dashboard;
