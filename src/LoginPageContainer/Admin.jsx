


import axios from 'axios';
import React, { StrictMode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Base_url = import.meta.env.VITE_BASE_URL;

const Admin = () => {
    const nav = useNavigate();

    // const [adminData, setAdminData] = useState([]);

    const [Fdata, setFdata] = useState({
        code: "",
        password: ""
    });



    const HandleFormData = (e) => {
        const { name, value } = e.target;
        setFdata({ ...Fdata, [name]: value });
    }


    const SubmitData = (e) => {
        e.preventDefault();

        // let match = adminData.filter((item) => {
        //     return item.code === Fdata.code && item.password === Fdata.password
        // });


        // if (!match[0]) {
        //     alert("Login Failed try later");
        //     nav('/');
        // }
        // else {
        //     if (match[0].password === Fdata.password && match[0].code === Fdata.code){

        //         alert('Login Successfully !!!');
        //         nav('/admin/AXRYVSCDFV');
        //     }
        // }

        const Verify = async () => {
           try{
               await axios.post(`${Base_url}/admin/getadmin`, Fdata)
               .then((response)=>{
                   alert(response.data.message);
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

        Verify();

    }


    // const FetchData = async () => {
    //     let res = await axios.get('http://localhost:8080/admin/getadmin');
    //     setAdminData(res.data.data)
    // }

    // useEffect(() => {
    //     FetchData()
    // }, [])


    return (
        <StrictMode>

            <div className="container-fluid AdminContainer">
                <div className="row">

                    <div className="col-4 py-4 bg-info m-auto formContainer">

                        <h3 className='text-center'>Admin Login</h3>

                        <div className="row">
                            <form className='mt-5' onSubmit={(e) => SubmitData(e)}>

                                <div className="form-group col-10 m-auto my-2">
                                    <div className="row">

                                        <div className="col-4 m-auto">
                                            <label>User code : </label>
                                        </div>

                                        <div className="col-8">
                                            <input type="text" placeholder='Enter code' required={true} name='code' value={Fdata.code} onChange={(e) => HandleFormData(e)} className='form-control' />
                                        </div>

                                    </div>
                                </div>

                                <div className="form-group col-10 m-auto my-2">
                                    <div className="row">

                                        <div className="col-4 m-auto">
                                            <label>Password : </label>
                                        </div>

                                        <div className="col-8">
                                            <input type="password" placeholder='Enter correct password' required={true} name='password' value={Fdata.password} onChange={(e) => HandleFormData(e)} className='form-control' />
                                        </div>

                                    </div>
                                </div>


                                <div className="col-12 text-center mt-4">
                                    <button className='btn btn-success px-4 mx-3'>Admin Login</button>
                                </div>


                            </form>
                        </div>

                    </div>

                </div>
            </div>



        </StrictMode>
    )
}

export default Admin;