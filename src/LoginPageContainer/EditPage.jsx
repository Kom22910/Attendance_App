


import axios from 'axios';
import React, { StrictMode, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
const Base_url = import.meta.env.VITE_BASE_URL;

const EditPage = () => {

  const nav = useNavigate();

  const ID = useParams();

  const [data, setData] = useState({
    name: "",
    code: "",
    password: "",
    BName: "",
    leader: ""
  })


  const ChangeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const PostData = (e) => {
    e.preventDefault();

    setIsLoading(true);
    axios.put(`${Base_url}/user/api/${ID.id}`, data)
      .then(() => {
        alert("Succesfully Editted Member Data !!!! ");
        setIsLoading(false);
        nav('/admin/AXRYVSCDFV')
      })
      .catch((err) => {
        alert("Error : " + err);
      })

    setData({
      name: "",
      code: "",
      password: "",
      BName: "",
      leader: ""
    })
  }

  const [isLoading, setIsLoading] = useState(false);

  const FetchData = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(`${Base_url}/user/api/${ID.id}`);
      setData(res.data.data);
    }
    catch (err) {
      console.error("Error while fetching data ", err);
    }
    finally {
      setIsLoading(false);
    }
  }



  useEffect(() => {
    FetchData();
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

      <div className="col-12 LoginPageContainer">
        <div className="row">

          <div className="col-md-4 col-12 py-4 bg-info m-auto formContainer">

            <h3 className='text-center'>Edit Member</h3>


            {/* form data  */}

            <form className='mt-5' onSubmit={(e) => PostData(e)}>
              <div className="row">

                <div className="form-group col-10 m-auto my-3">
                  <div className="row">

                    <div className="col-md-4 col-6 m-auto">
                      <label>User Name : </label>
                    </div>

                    <div className="col-md-8 col-7">
                      <input type="text" placeholder='Enter name ' required={true} name="name" value={data.name} className='form-control' onChange={(e) => ChangeData(e)} />
                    </div>

                  </div>
                </div>

                <div className="form-group col-10 m-auto my-3">
                  <div className="row">

                    <div className="col-4 m-auto">
                      <label>User Code : </label>
                    </div>

                    <div className="col-8">
                      <input type="text" placeholder='Enter code ' required={true} name='code' value={data.code} onChange={(e) => ChangeData(e)} className='form-control' />
                    </div>

                  </div>
                </div>

                <div className="form-group col-10 m-auto my-3">
                  <div className="row">

                    <div className="col-4 m-auto">
                      <label>Password : </label>
                    </div>

                    <div className="col-8">
                      <input type="password" placeholder='Enter correct password ' required={true} name='password' value={data.password} onChange={(e) => ChangeData(e)} className='form-control' />
                    </div>

                  </div>
                </div>

                <div className="form-group col-10 m-auto my-3">
                  <div className="row">

                    <div className="col-4 m-auto">
                      <label>Appointment : </label>
                    </div>

                    <div className="col-8">
                      <input type="text" placeholder='Enter Batch Name ' required={true} name='BName' value={data.BName} onChange={(e) => ChangeData(e)} className='form-control' />
                    </div>

                  </div>
                </div>

                <div className="form-group col-10 m-auto my-3">
                  <div className="row">

                    <div className="col-4 m-auto">
                      <label>Appt Name : </label>
                    </div>

                    <div className="col-8">
                      <input type="text" placeholder='Enter Leader Name ' required={true} name='leader' value={data.leader} onChange={(e) => ChangeData(e)} className='form-control' />
                    </div>

                  </div>
                </div>




                <div className="col-12 text-center mt-4">
                  <button className='btn btn-success px-4 mx-3 w-25 fw-bold'>
                    Edit
                  </button>
                </div>


              </div>
            </form>

          </div>



        </div>
      </div>







    </StrictMode>
  )
}

export default EditPage;