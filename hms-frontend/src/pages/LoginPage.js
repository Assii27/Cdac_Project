import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import loginvalidation from '../validation/loginvalidation'
import userservice from '../services/userservice'
import image from '../images/hos5.jpg'
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "reactstrap";

const styles = {
  container: {
      backgroundImage: `url(${image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
  }
};

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errmsg, setErrmsg] = useState(null)

  const [user, setUser] = useState()
  const [errors, setErrors] = useState({})
  const [cap, setCap] = useState(false);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleonChange = (value) => {
    setCap((current) => !current);
  };

  const handleReset = (e) => {
    e.preventDefault()
    document.querySelector('#f1').reset()
    setUser(null)
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(loginvalidation(user))
    console.log(Object.keys(errors))
    console.log(user)
    if (Object.keys(errors).length === 0) {
      console.log(user)
      userservice
        .validate(user)
        .then((resp) => {
          let result = resp.data
          console.log(result)
          sessionStorage.setItem('userid', result.userid)
          sessionStorage.setItem('uname', result.uname)
          sessionStorage.setItem('role', result.role)
          sessionStorage.setItem('id', result.uid)
          dispatch({ type: 'IsLoggedIn' })
          if (result.role === 'Admin') navigate('/doctors')
          else navigate('/uhome')
        })
        .catch((error) => {
          console.log('Error', error)
          setErrmsg('Invalid username or password')
        })
    }
  }



  return (
    <div className='' style={styles.container} >
      <div className='jumbotron p-4 shadow text-center border-bottom mb-0 bg-dark'>
        <h4 style={{ color: 'white' }}>Hospital Management System</h4>
      </div>
      <div className='container pt-4'>
        <div className='row '>
          <div className='col-sm-5 mx-auto '>
            <form className='card shadow mt-5 form-centre' id='f1' onSubmit={handleSubmit}>
              <div className='card-header'>
                <h5 className='text-center'>Login Page</h5>
              </div>
              <div className='card-body'>
                <div className='form-group form-row'>
                  <label className='col-sm-4 col-form-label'>User Id</label>
                  <div className='col-sm-8'>
                    <input
                      type='text'
                      name='userid'
                      required
                      className='form-control'
                      placeholder='User Id'
                      value={user?.userid}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className='form-group form-row'>
                  <label className='col-sm-4 col-form-label'>Password</label>
                  <div className='col-sm-8'>
                    <input
                      type='password'
                      required
                      className='form-control'
                      name='pwd'
                      placeholder='Password'
                      value={user?.pwd}
                      onChange={handleInput}
                    />
                  </div>
                </div>


                <div className="form-group my-3">
                <div>
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={handleonChange}
                  />
                </div>

                <Button
                  // className="btn btn-warning float-right mr-2"
                  color="warning"
                  className="float-right mr-2"
                  onClick={handleReset}
                >
                  {" "}
                  Reset
                </Button>

                <Button
                  //  className="btn btn-primary float-right mr-3"
                  color="success"
                  className="float-right mr-3"
                  disabled={!cap}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </div>

              </div>              
              {errmsg != null ? (
                <div className='alert text-danger text-center font-weight-bold'>
                  {errmsg}
                </div>
              ) : null}
            
            </form>
          </div>
        </div>
      </div>
      <div className="text-success">
          <marquee width="100%" direction="right" height="100px">
            "When <b><i>I</i></b> is replaced by <b><i>We</i></b> even <b><i>illness</i></b> becomes <b><i>Wellness"</i></b>
          </marquee>
        </div>
    </div>
    
  )
}

export default LoginPage
