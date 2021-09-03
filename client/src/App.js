import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {

  const [name,setName] = useState('');
  const [age,setAge] = useState(0);
  const [country,setCountry] = useState('');
  const [position,setPosition] = useState('');
  const [wage,setwage] = useState(0);
  const[employeeList,setEmployeeList] = useState([]);

  const addEmployee = () => {

    axios.post('http://localhost:3001/create',
    {
      name:name,
      age:age,
      country:country,
      position:position,
      wage:wage
    }
    ).
    then(()=> {
        console.log("success");
    })

  }

  const getEmployee = () => {

    axios.get('http://localhost:3001/employees').then((res)=> {
        console.log(res);
        setEmployeeList(res);
    })

  }

  return (
    <div className="App">
      <div className="information">
          <label>Name:</label>
          <input type="text" onChange={(x) => setName(x.target.value)}></input>
          <label>Age: </label>
          <input type="number"onChange={(x) => setAge(x.target.value)}></input>
          <label>Country: </label>
          <input type="text"onChange={(x) => setCountry(x.target.value)}></input>
          <label>Position: </label>
          <input type="text"onChange={(x) => setPosition(x.target.value)}></input>
          <label>Wage: </label>
          <input type="number"onChange={(x) => setwage(x.target.value)}></input>
          <button onClick={addEmployee}>Add Employee</button>


          <div className="employees">
            <button onClick={getEmployee}> Show Employees</button>
          </div>

      </div>      
    </div>
  );
}

export default App;
