import { Link } from 'react-router-dom'

function SideBar() {
  const role = sessionStorage.getItem('role')
  console.log('Role ', role)
  const isadmin = role === 'Admin'
  const isdoctor = role === 'Doctor'
  const isreception = role === 'Reception'
  return (
    <div className='list-group list-group-flush'>
      {isadmin ? (
        <>
          <Link
            to='/doctors'
            className='list-group-item list-group-item-action p-2 text-left'
          >
            Doctors
          </Link>
          <Link
            to='/receptions'
            className='list-group-item list-group-item-action p-2 text-left'
          >
            Receptions
          </Link>
          <Link
            to='/patients'
            className='list-group-item list-group-item-action p-2 text-left'
          >
            Patients
          </Link>
          <Link
            to='/bills'
            className='list-group-item list-group-item-action p-2 text-left'
          >
            Bills
          </Link>
        </>
      ) : null}

      {isdoctor ? (
        <>
          <Link
            to='/uhome'
            className='list-group-item list-group-item-action p-2 text-left'
          >
            Profile
          </Link>
          <Link
            to='/patients'
            className='list-group-item list-group-item-action p-2 text-left'
          >
            Patients
          </Link>
          <Link
            to='/appointments'
            className='list-group-item list-group-item-action p-2 text-left'
          >
            Appointments
          </Link>          
        </>
      ) : null}
      {isreception ? (
        <>
          <Link
            to='/uhome'
            className='list-group-item list-group-item-action p-2 text-left'
          >
            Profile
          </Link>
          <Link
            to='/patients'
            className='list-group-item list-group-item-action p-2 text-left'
          >
            Patients
          </Link>          
          <Link
            to='/myappointments'
            className='list-group-item list-group-item-action p-2 text-left'
          >
            Appointments
          </Link>
          <Link
            to='/bills'
            className='list-group-item list-group-item-action p-2 text-left'
          >
            Bills
          </Link>
        </>
      ) : null}
    </div>
  )
}

export default SideBar
