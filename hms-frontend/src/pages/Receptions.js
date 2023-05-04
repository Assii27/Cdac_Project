import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import receptionservice from '../services/receptionservice'

function Receptions() {
  const [Receptions, setReceptions] = useState([])
  const navigate=useNavigate()

  const loadData = () => {
    receptionservice.getReceptions().then((resp) => {
      setReceptions(resp.data.data)
      console.log(Receptions)
    })
  }
  const handleDelete = (id) => {
    let result = window.confirm('Are you sure to delete this record ?')
    if (result) {
      receptionservice
        .deleteRececption(id)
        .then((resp) => {
          alert('Reception deleted successfully')
          loadData()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <Header />
      <div className='container-fluid'>
        <div className='row'>
          <div
            className='col-sm-2 bg-transparent p-0 border-right border-primary'
            style={{ height: 'calc(100vh - 80px)' }}
          >
            <SideBar />
          </div>
          <div className='col-sm-10'>
            <Link
              to='/addreception'
              className='float-right btn btn-sm btn-primary m-2'
            >
              Add New
            </Link>
            <h4 className='text-left p-2 border-bottom border-success'>
              All Receptions
            </h4>
            <table className='table table-sm table-light table-striped table-hover'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Receptions.filter(x=>x.isactive).map((x) => (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.address}</td>
                    <td>{x.phone}</td>
                    <td>{x.gender}</td>
                    <td>
                      <button
                        onClick={(e) =>
                          navigate('/editreception',{state:x.id})
                        }
                        className='btn btn-primary mr-2 btn-sm'
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(x.id)}
                        className='btn btn-danger btn-sm'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Receptions
