


import axios from 'axios';
import React, { StrictMode, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../StoreToken/auth';

const Base_url = import.meta.env.VITE_BASE_URL;

const UserLayout = () => {

  const ID = useParams();
  const nav = useNavigate();


  const [user, setUser] = useState({});
  const { LogoutUser } = useAuth();


  const [isLoading, setIsLoading] = useState(false);
  // console.log(user);

  const FetchId = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(`${Base_url}/user/api/${ID.id}`);
      setUser(res.data.data);
    }
    catch (err) {
      console.error("Error while Fetching data", err);
    }
    finally {
      setIsLoading(false);
    }
  }

  const DeleteFile = async () => {
    setIsLoading(true);
    if (confirm('Are you sure ?')) {
      let time = new Date().toLocaleTimeString();

      await axios.patch(`${Base_url}/user/api/edit/${ID.id}`, {
        logout: time,
        status: "Deactive"
      })
        .then(() => {
          alert("Successfully Logout");
          setIsLoading(false);
          LogoutUser()
          nav('/');
        })
    }
    else {
      alert("Cancelled !!");
    }
  }

  useEffect(() => {
    FetchId();
  }, []);



  return (
    <StrictMode>



      {
        isLoading &&
        <div className="col-12 loader_container">
          <div className="spinner-border text-danger loader" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }

      

      <div className="container-fluid UserContainer">
        <div className="row">

          <div className="m-auto userProfileCard py-4">
            <div className="row">

              {/* Profile Photo */}
              <div className="col-6 m-auto imageContainer mt-4">
                <img src='/AppLogo.jpg' alt="abc" />
              </div>

              {/* name */}
              <div className="col-10 m-auto my-4">
                <h4 className='text-center'>{user.name}</h4>
              </div>

              {/* detail about member */}
              <div className="col-11 m-auto userDetail">
                <div className="row">

                  <div className="col-12">
                    <div className="row">

                      <div className="col-11 m-auto detail">
                        <div className="row">

                          <div className="col-md-4 col-6 start">
                            <p>Appointment : </p>
                          </div>

                          <div className="col-md-4 col-6">
                            <p>{user.BName}</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-11 m-auto detail">
                        <div className="row">

                          <div className="col-md-4 col-6 start">
                            <p>Login Time : </p>
                          </div>

                          <div className="col-md-4 col-6">
                            <p>{user.login}</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-11 m-auto detail">
                        <div className="row">

                          <div className="col-md-4 col-6 start">
                            <p>Logout Time : </p>
                          </div>

                          <div className="col-md-4 col-6">
                            <p>{user.logout}</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-11 m-auto detail">
                        <div className="row">

                          <div className="col-md-4 col-6 start">
                            <p>Appt Name : </p>
                          </div>

                          <div className="col-md-4 col-6">
                            <p>{user.leader}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>



              {/* Logout button */}
              <div className="col-8 m-auto text-center mt-4">

                <button className='btn btn-danger' onClick={() => DeleteFile()}>
                  Logout
                </button>

              </div>


            </div>
          </div>


        </div>
      </div>

    </StrictMode>
  )
}

export default UserLayout;