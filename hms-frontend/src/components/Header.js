import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from "reactstrap";

function Header() {
  const uname = sessionStorage.getItem('uname')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = () => {
    dispatch({ type: 'LogOut' })
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <div className='jumbotron p-3 mb-0 bg-dark text-white rounded-0 '>
      <h5 className='float-left m-2'>Welcome ! {uname}</h5>
      <Button
        onClick={() => logout()}
        color="danger"
        className="float-right mr-3"
      >
        Logout
      </Button>
      <h4 className='text-center'>Hospital Management Portal</h4>
    </div>
  )
}

export default Header
