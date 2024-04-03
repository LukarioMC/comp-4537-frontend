import React, { useEffect, useState } from 'react'
import axios from 'axios'

const adminDataAPI = 'https://comp-4537-pv5-project-backend-b23c9c33cda3.herokuapp.com/users'

const AdminPage = () => {
  const [adminData, setAdminData] = useState([])

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(adminDataAPI)
        setAdminData(response.data)
      } catch (error) {
        console.error('Error fetching admin data', error)
      }
    }

    fetchAdminData()
  }, [])

  const resetCalls = async (userId) => {
    console.log(`Resetting calls for user ID: ${userId}`)
    // Placeholder for the actual API call to reset the user's call count
    // Example: await axios.post(`/reset-calls/${userId}`)
  }

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px'
  }

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '80%',
    maxWidth: '600px'
  }

  const thTdStyle = {
    border: '1px solid #ddd',
    textAlign: 'left',
    padding: '8px'
  }

  const thStyle = {
    ...thTdStyle,
    backgroundColor: '#f2f2f2'
  }

  const buttonStyle = {
    cursor: 'pointer',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: 'white'
  }

  return (
    <div style={pageStyle}>
      <h1>Admin Dashboard</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>API Calls</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminData.map((item, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{item.email}</td>
              <td style={thTdStyle}>{item.apiCallCounter}</td>
              <td style={thTdStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => resetCalls(item.id)} // Assuming 'id' is the unique identifier for a user
                >
                  Reset Calls
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPage
