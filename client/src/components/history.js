import Navbar from "./navbar";
import '../styles/history.css';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

const History =()=>{
    const [expenses, setExpense] = useState([])
    const usernamename =Cookies.get('clientusername');
    const fetchUserData = () => {
                 fetch(`http://localhost:8081/results/${usernamename}`)
                        .then(response => {
                          return response.json()
                        })
                        .then(data => {
                         
                         setExpense(data);
                         
                        })
     }
     useEffect(() => {
       fetchUserData()
     }, [])  
     console.log(expenses);
    return (
     <>
    <Navbar/>
<div className="historybody">
  <table >
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Language</th>
        <th>Total Question</th>
        <th>Correct Answer</th>
      </tr>
    </thead>
    <tbody>
    {expenses.map((item,index) => (
            <tr key={index}>
              <td >{index + 1}</td>
              <td>{item.name}</td>
              <td >{item.language}</td>
              <td >{item.total}</td>
              <td >{item.correct}</td>

            </tr>
          ))}
    
    </tbody>
  </table>
</div>
    </>
    );
}

export default History;