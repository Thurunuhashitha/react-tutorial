import React, { useState } from 'react';
import './style.css'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import Button from '../../components/button/button'

export default function Home() {

  // Step 1: Create state variables to store data
  const [companies, setCompanies] = useState([]); // Store all companies data
  
  // Step 2: Create state variables to track what user clicked
  const [openCompany, setOpenCompany] = useState(null); // Which company is open? (null = none)
  const [openDepartment, setOpenDepartment] = useState(null); // Which department is open?
  const [openEmployee, setOpenEmployee] = useState(null); // Which employee is open?

  // Step 3: Function to get data from API
  function getData() {
    axios
      .get('https://student-api.acpt.lk/api/companies') // Get data from internet
      .then((response) => {
        // When data arrives, save it
        const data = response.data.data || response.data;
        setCompanies(data);
        
        // Close everything when new data loads
        setOpenCompany(null);
        setOpenDepartment(null);
        setOpenEmployee(null);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  // Step 4: Function when user clicks a company
  function clickCompany(index) {
    // If this company is already open, close it. Otherwise, open it.
    if (openCompany === index) {
      setOpenCompany(null); // Close it
    } else {
      setOpenCompany(index); // Open it
    }
    
    // When we click a new company, close departments and employees
    setOpenDepartment(null);
    setOpenEmployee(null);
  }

  // Step 5: Function when user clicks a department
  function clickDepartment(index) {
    // If this department is already open, close it. Otherwise, open it.
    if (openDepartment === index) {
      setOpenDepartment(null); // Close it
    } else {
      setOpenDepartment(index); // Open it
    }
    
    // When we click a new department, close employees
    setOpenEmployee(null);
  }

  // Step 6: Function when user clicks an employee
  function clickEmployee(index) {
    // If this employee is already open, close it. Otherwise, open it.
    if (openEmployee === index) {
      setOpenEmployee(null); // Close it
    } else {
      setOpenEmployee(index); // Open it
    }
  }

  return (
    <Box className='nav'>
      <Box className='backIcon'>
        <ArrowBackIcon />
      </Box>
      <br /><br />
      
      {/* Step 7: Button to load data */}
      <Box>
        <Button onClick={getData} text="Click me to Load Companies"> 
        </Button> 
      </Box>

      {/* Step 8: Show companies if we have data */}
      <Box sx={{ marginTop: 3 }}>
        {companies.length > 0 ? (
          <Box>
            <h2>Companies List:</h2> <br />
            
            {/* Step 9: Loop through all companies */}
            {companies.map((company, companyIndex) => (
              <Box key={companyIndex} sx={{ marginBottom: 2 }}>
                
                {/* Step 10: Show company name (always visible) */}
                <Box
                  onClick={() => clickCompany(companyIndex)}
                  sx={{ 
                    padding: 2, 
                    border: '2px solid blue',
                    borderRadius: 2,
                    backgroundColor: openCompany === companyIndex ? 'lightblue' : 'lightgray',
                    cursor: 'pointer'
                  }}
                >
                  <h3>
                    {/* Show arrow down if open, arrow right if closed */}
                    {openCompany === companyIndex ? '▼' : '▶'} 
                    {company.company}
                  </h3>
                </Box>

                {/* Step 11: Show company details ONLY if this company is clicked */}
                {openCompany === companyIndex && (
                  <Box sx={{ 
                    padding: 2, 
                    marginLeft: 3,
                    marginTop: 1,
                    backgroundColor: 'white'
                  }}>
                    <p><strong>Location:</strong> {company.location}</p>
                    
                    <h4>Departments:</h4>
                    
                    {/* Step 12: Loop through all departments */}
                    {company.departments && company.departments.map((department, deptIndex) => (
                      <Box key={deptIndex} sx={{ marginBottom: 2 }}>
                        
                        {/* Step 13: Show department name */}
                        <Box
                          onClick={() => clickDepartment(deptIndex)}
                          sx={{ 
                            padding: 1.5, 
                            border: '1px solid gray',
                            backgroundColor: openDepartment === deptIndex ? 'lightyellow' : 'whitesmoke',
                            cursor: 'pointer'
                          }}
                        >
                          <strong>
                            {openDepartment === deptIndex ? '▼' : '▶'} 
                            {department.name}
                          </strong>
                        </Box>

                        {/* Step 14: Show employees ONLY if this department is clicked */}
                        {openDepartment === deptIndex && department.employees && (
                          <Box sx={{ 
                            marginLeft: 3, 
                            marginTop: 1,
                            padding: 1.5,
                            backgroundColor: 'white'
                          }}>
                            <strong>Employees:</strong>
                            
                            {/* Step 15: Loop through all employees */}
                            {department.employees.map((employee, empIndex) => (
                              <Box key={empIndex} sx={{ marginTop: 1 }}>
                                
                                {/* Step 16: Show employee name */}
                                <Box
                                  onClick={() => clickEmployee(empIndex)}
                                  sx={{ 
                                    padding: 1, 
                                    border: '1px solid gray',
                                    backgroundColor: openEmployee === empIndex ? 'lightgreen' : 'whitesmoke',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <p>
                                    {openEmployee === empIndex ? '▼' : '▶'} 
                                    <strong>{employee.name}</strong>
                                  </p>
                                </Box>

                                {/* Step 17: Show employee details ONLY if this employee is clicked */}
                                {openEmployee === empIndex && (
                                  <Box sx={{ 
                                    marginLeft: 3, 
                                    marginTop: 1,
                                    padding: 1.5,
                                    backgroundColor: '#f0fff0'
                                  }}>
                                    <p><strong>Position:</strong> {employee.position}</p>
                                    
                                    {/* Step 18: Show skills */}
                                    {employee.skills && employee.skills.length > 0 && (
                                      <Box>
                                        <strong>Skills:</strong>
                                        <Box sx={{ display: 'flex', gap: 1, marginTop: 0.5 }}>
                                          {employee.skills.map((skill, skillIndex) => (
                                            <span 
                                              key={skillIndex}
                                              style={{
                                                padding: '4px 8px',
                                                backgroundColor: 'blue',
                                                color: 'white',
                                                borderRadius: '4px',
                                                fontSize: '12px'
                                              }}
                                            >
                                              {skill}
                                            </span>
                                          ))}
                                        </Box>
                                      </Box>
                                    )}
                                  </Box>
                                )}
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          <p>No companies loaded yet. Click the button to load data.</p>
        )}
      </Box>
    </Box>
  )
}