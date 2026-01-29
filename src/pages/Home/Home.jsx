import React, { useState } from 'react';
import './style.css'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import Button from '../../components/button/button'

export default function Home() {

  const [companies, setCompanies] = useState([]);
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(null);
  const [selectedDepartmentIndex, setSelectedDepartmentIndex] = useState(null);
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(null);

  function getData() {
    axios
      .get('https://student-api.acpt.lk/api/companies')
      .then((response) => {
        console.log('Full response:', response.data);
        const companiesData = response.data.data || response.data;
        setCompanies(Array.isArray(companiesData) ? companiesData : []);
        // Reset selections when loading new data
        setSelectedCompanyIndex(null);
        setSelectedDepartmentIndex(null);
        setSelectedEmployeeIndex(null);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  function handleCompanyClick(index) {
    setSelectedCompanyIndex(selectedCompanyIndex === index ? null : index);
    setSelectedDepartmentIndex(null);
    setSelectedEmployeeIndex(null);
  }

  function handleDepartmentClick(index) {
    setSelectedDepartmentIndex(selectedDepartmentIndex === index ? null : index);
    setSelectedEmployeeIndex(null);
  }

  function handleEmployeeClick(index) {
    setSelectedEmployeeIndex(selectedEmployeeIndex === index ? null : index);
  }

  return (
    <Box className='nav'>
      <Box className='backIcon'>
        <ArrowBackIcon />
      </Box>
      <br /><br />
      <Box>
        <Button onClick={getData} text="Click me to Load Companies"> 
        </Button> 
      </Box>

      {/* Display companies data */}
      <Box sx={{ marginTop: 3 }}>
        {companies && companies.length > 0 ? (
          <Box>
            <h2>Companies List:</h2>
            {companies.map((company, companyIndex) => (
              <Box 
                key={companyIndex} 
                sx={{ 
                  marginBottom: 2
                }}
              >
                {/* Company Card - Always visible */}
                <Box
                  onClick={() => handleCompanyClick(companyIndex)}
                  sx={{ 
                    padding: 2, 
                    border: '2px solid #1976d2',
                    borderRadius: 2,
                    backgroundColor: selectedCompanyIndex === companyIndex ? '#e3f2fd' : '#f5f5f5',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#e3f2fd'
                    }
                  }}
                >
                  <h3 style={{ margin: 0 }}>
                    {selectedCompanyIndex === companyIndex ? '▼' : '▶'} {company.company || 'N/A'}
                  </h3>
                </Box>

                {/* Company Details - Show when company is selected */}
                {selectedCompanyIndex === companyIndex && (
                  <Box sx={{ 
                    padding: 2, 
                    marginLeft: 3,
                    marginTop: 1,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    backgroundColor: '#fff'
                  }}>
                    <p><strong>Location:</strong> {company.location || 'N/A'}</p>
                    
                    {/* Departments List */}
                    {company.departments && Array.isArray(company.departments) && company.departments.length > 0 && (
                      <Box sx={{ marginTop: 2 }}>
                        <h4>Departments:</h4>
                        {company.departments.map((department, deptIndex) => (
                          <Box key={deptIndex} sx={{ marginBottom: 2 }}>
                            {/* Department Card */}
                            <Box
                              onClick={() => handleDepartmentClick(deptIndex)}
                              sx={{ 
                                padding: 1.5, 
                                border: '1px solid #666',
                                borderRadius: 1,
                                backgroundColor: selectedDepartmentIndex === deptIndex ? '#fff3e0' : '#fafafa',
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: '#fff3e0'
                                }
                              }}
                            >
                              <strong style={{ margin: 0 }}>
                                {selectedDepartmentIndex === deptIndex ? '▼' : '▶'} {department.name || 'N/A'}
                              </strong>
                            </Box>

                            {/* Employees List - Show when department is selected */}
                            {selectedDepartmentIndex === deptIndex && 
                             department.employees && 
                             Array.isArray(department.employees) && 
                             department.employees.length > 0 && (
                              <Box sx={{ 
                                marginLeft: 3, 
                                marginTop: 1,
                                padding: 1.5,
                                border: '1px dashed #999',
                                borderRadius: 1,
                                backgroundColor: '#fff'
                              }}>
                                <strong>Employees:</strong>
                                {department.employees.map((employee, empIndex) => (
                                  <Box key={empIndex} sx={{ marginTop: 1 }}>
                                    {/* Employee Card */}
                                    <Box
                                      onClick={() => handleEmployeeClick(empIndex)}
                                      sx={{ 
                                        padding: 1, 
                                        border: '1px solid #999',
                                        borderRadius: 1,
                                        backgroundColor: selectedEmployeeIndex === empIndex ? '#e8f5e9' : '#fafafa',
                                        cursor: 'pointer',
                                        '&:hover': {
                                          backgroundColor: '#e8f5e9'
                                        }
                                      }}
                                    >
                                      <p style={{ margin: 0 }}>
                                        {selectedEmployeeIndex === empIndex ? '▼' : '▶'} <strong>{employee.name || 'N/A'}</strong>
                                      </p>
                                    </Box>

                                    {/* Employee Details - Show when employee is selected */}
                                    {selectedEmployeeIndex === empIndex && (
                                      <Box sx={{ 
                                        marginLeft: 3, 
                                        marginTop: 1,
                                        padding: 1.5,
                                        border: '1px solid #4caf50',
                                        borderRadius: 1,
                                        backgroundColor: '#f1f8f4'
                                      }}>
                                        <p><strong>Position:</strong> {employee.position || 'N/A'}</p>
                                        
                                        {/* Skills */}
                                        {employee.skills && Array.isArray(employee.skills) && employee.skills.length > 0 && (
                                          <Box>
                                            <strong>Skills:</strong>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 0.5 }}>
                                              {employee.skills.map((skill, skillIndex) => (
                                                <span 
                                                  key={skillIndex}
                                                  style={{
                                                    padding: '4px 8px',  
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