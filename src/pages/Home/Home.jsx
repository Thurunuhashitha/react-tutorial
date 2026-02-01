import React, { useState } from 'react'
import './style.css'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import axios from 'axios'
import Button from '../../components/button/button'
import { useNavigate } from 'react-router-dom'


export default function Home() {


  const navigate = useNavigate()

  // ===================== STATE =====================
  const [companies, setCompanies] = useState([])

  const [showCompanies, setShowCompanies] = useState(false)

  const [openCompany, setOpenCompany] = useState(null)
  const [openDepartment, setOpenDepartment] = useState(null)
  const [openEmployee, setOpenEmployee] = useState(null)

  // ===================== API CALL =====================
  function getData() {
    // If data already loaded → just toggle visibility
    if (companies.length > 0) {
      setShowCompanies(!showCompanies)
      return
    }

    axios
      .get('https://student-api.acpt.lk/api/companies')
      .then((response) => {
        const data = response.data.data || response.data
        setCompanies(data)
        setShowCompanies(true)

        setOpenCompany(null)
        setOpenDepartment(null)
        setOpenEmployee(null)
      })
      .catch((error) => {
        console.log('Error:', error)
      })
  }

  // ===================== CLICK HANDLERS =====================
  function clickCompany(index) {
    setOpenCompany(openCompany === index ? null : index)
    setOpenDepartment(null)
    setOpenEmployee(null)
  }

  function clickDepartment(index) {
    setOpenDepartment(openDepartment === index ? null : index)
    setOpenEmployee(null)
  }

  function clickEmployee(index) {
    setOpenEmployee(openEmployee === index ? null : index)
  }

  // ===================== UI =====================
  return (
    <Box className='nav'>

      <Box className='backIcon' onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
        <ArrowBackIcon />
      </Box>

      <br /><br />

      {/* LOAD BUTTON WITH ARROW */}
      <Button onClick={getData} text="Load Companies">
        <h3 style={{ margin: 0 }}>
          {showCompanies ? '▼' : '▶'} 
        </h3>
      </Button>

      {/* COMPANIES LIST */}
      {showCompanies && companies.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <h2>Companies List</h2>
          <br />

          {companies.map((company, companyIndex) => (
            <Box key={companyIndex} sx={{ marginBottom: 2 }}>

              {/* COMPANY */}
              <Box
                onClick={() => clickCompany(companyIndex)}
                sx={{
                  padding: 2,
                  border: '2px solid blue',
                  borderRadius: 2,
                  backgroundColor:
                    openCompany === companyIndex ? 'lightblue' : 'lightgray',
                  cursor: 'pointer'
                }}
              >
                <h3>
                  {openCompany === companyIndex ? '▼' : '▶'} {company.company}
                </h3>
              </Box>

              {/* COMPANY DETAILS */}
              {openCompany === companyIndex && (
                <Box sx={{ padding: 2, marginLeft: 3 }}>
                  <p><strong>Location:</strong> {company.location}</p>

                  <h4>Departments</h4>

                  {company.departments?.map((department, deptIndex) => (
                    <Box key={deptIndex} sx={{ marginBottom: 2 }}>

                      {/* DEPARTMENT */}
                      <Box
                        onClick={() => clickDepartment(deptIndex)}
                        sx={{
                          padding: 1.5,
                          border: '1px solid gray',
                          backgroundColor:
                            openDepartment === deptIndex ? 'lightyellow' : 'whitesmoke',
                          cursor: 'pointer'
                        }}
                      >
                        <strong>
                          {openDepartment === deptIndex ? '▼' : '▶'} {department.name}
                        </strong>
                      </Box>

                      {/* EMPLOYEES */}
                      {openDepartment === deptIndex && (
                        <Box sx={{ marginLeft: 3, marginTop: 1 }}>
                          <strong>Employees</strong>

                          {department.employees?.map((employee, empIndex) => (
                            <Box key={empIndex} sx={{ marginTop: 1 }}>

                              {/* EMPLOYEE */}
                              <Box
                                onClick={() => clickEmployee(empIndex)}
                                sx={{
                                  padding: 1,
                                  border: '1px solid gray',
                                  backgroundColor:
                                    openEmployee === empIndex ? 'lightgreen' : 'whitesmoke',
                                  cursor: 'pointer'
                                }}
                              >
                                {openEmployee === empIndex ? '▼' : '▶'}{' '}
                                <strong>{employee.name}</strong>
                              </Box>

                              {/* EMPLOYEE DETAILS */}
                              {openEmployee === empIndex && (
                                <Box sx={{ marginLeft: 3, marginTop: 1 }}>
                                  <p><strong>Position:</strong> {employee.position}</p>

                                  {employee.skills?.length > 0 && (
                                    <Box>
                                      <strong>Skills:</strong>
                                      <Box sx={{ display: 'flex', gap: 1, marginTop: 1 }}>
                                        {employee.skills.map((skill, i) => (
                                          <span
                                            key={i}
                                            style={{
                                              padding: '4px 8px',
                                              backgroundColor: 'blue',
                                              color: 'white',
                                              borderRadius: 4,
                                              fontSize: 12
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
      )}

      {!showCompanies && companies.length === 0 && (
        <p>No companies loaded yet. Click the button above.</p>
      )}

    </Box>
  )
}
