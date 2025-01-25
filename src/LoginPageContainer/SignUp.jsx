

import axios from 'axios';
import React, { StrictMode, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Base_url = import.meta.env.VITE_BASE_URL;

const SignUp = () => {

  const nav = useNavigate();

  const [data, setData] = useState({
    name: "",
    code: "",
    password: "",
    login:"--:--:--",
    logout:"--:--:--",
    status:"----",
    BName:"",
    leader:""
  })


  const ChangeData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const PostData = (e) => {
    e.preventDefault();

    const Submitting=async()=>{
      try{
        await axios.post(`${Base_url}/user/api/signup` , data)
        .then((res)=>{
          alert(res.data.message);
          nav(`/admin/AXRYVSCDFV/`);
        })
        .catch((err)=>{
          alert(err.response.data.Error);
        })
      }
      catch(err){
        console.log(err);
      }
    }

    Submitting();

  }


  return (
    <StrictMode>

      <div className="container-fluid LoginPageContainer">
        <div className="row">

          <div className="col-4 py-4 bg-info m-auto formContainer">

            <h3 className='text-center'>Add Member</h3>


            {/* form data  */}

            <form className='mt-5' onSubmit={(e) => PostData(e)}>
              <div className="row">

                <div className="form-group col-10 m-auto my-3">
                  <div className="row">

                    <div className="col-4 m-auto">
                      <label>User Name : </label>
                    </div>

                    <div className="col-8">
                      <input type="text" placeholder='Enter name ' required={true} name="name" value={data.name} className='form-control' onChange={(e) => ChangeData(e)} />
                    </div>

                  </div>
                </div>

                <div className="form-group col-10 m-auto my-3">
                  <div className="row">

                    <div className="col-4 m-auto">
                      <label>User code : </label>
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
                      <input type="text" placeholder='Enter Appointed Name ' required={true} name='BName' value={data.BName} onChange={(e) => ChangeData(e)} className='form-control' />
                    </div>

                  </div>
                </div>

                <div className="form-group col-10 m-auto my-3">
                  <div className="row">

                    <div className="col-4 m-auto">
                      <label>Appointer Name : </label>
                    </div>

                    <div className="col-8">
                      <input type="text" placeholder='Enter Appointer Name ' required={true} name='leader' value={data.leader} onChange={(e) => ChangeData(e)} className='form-control' />
                    </div>

                  </div>
                </div>




                <div className="col-12 text-center mt-4">
                  <button className='btn btn-success px-4 mx-3 w-25 fw-bold' onClick={() => PostData()}>
                    Add
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

export default SignUp;