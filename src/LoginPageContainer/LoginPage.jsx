


import axios from 'axios';
import React, { StrictMode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../StoreToken/auth';

const Base_url = import.meta.env.VITE_BASE_URL;


const LoginPage = () => {

    const storetoken = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${storetoken}`
        }
    };

    const nav = useNavigate();

    // const [data, setData] = useState([]);


    const [Fdata, setFData] = useState({
        code: "",
        password: "",
        login: ""
    })



    const HandleChange = (e) => {
        const { name, value } = e.target;
        setFData({ ...Fdata, [name]: value });
        // console.log(name +"   "+value);
    }

    const { storeTokenLs } = useAuth()

    const [clickButton, setClickButton] = useState(null);


    const Submitting = (e) => {
        e.preventDefault();



        const LoginOperation = async () => {
            try {
                let currentTime = new Date().toLocaleTimeString();

                await axios.post(`${Base_url}/user/api`, Fdata)
                    .then((res) => {
                        axios.patch(`${Base_url}/user/api/edit/${res.data.id}`, {
                            login: currentTime,
                            logout: "--:--:--",
                            status: "Active"
                        })
                        alert("Login Successfully !!!!!");
                        storeTokenLs(res.data.token);
                        nav(`/user/${res.data.id}`);

                    })
                    .catch(err => alert("Username or password is wrong , Login Failed !!!!"));
            }
            catch (err) {
                alert(err.response.data.Error);
            }
        }

        LoginOperation();
    }


    const Verification = () => {
        axios.get(`${Base_url}/user/api/token` , config)
            .then((res) => {
                alert("You have already Login !!!!!");
                const res_id = res.data.id;
                if (res_id !== null) {
                    nav(`/user/${res.data.id}`);
                }
            })
    }

    useEffect(() => {
        if(storetoken !== null){
            Verification();
        }
    }, [])


    return (
        <StrictMode>

            <div className="container-fluid LoginPageContainer">
                <div className="row">

                    <div className="col-4 py-4 bg-info m-auto formContainer">

                        <h3 className='text-center'>Login Page</h3>

                        <div className="row">
                            <form onSubmit={(e) => Submitting(e)} className='mt-5'>

                                <div className="form-group col-10 m-auto my-2">
                                    <div className="row">

                                        <div className="col-4 m-auto">
                                            <label>User code : </label>
                                        </div>

                                        <div className="col-8">
                                            <input type="code" placeholder='Enter code' name='code' value={Fdata.code} onChange={(e) => HandleChange(e)} className='form-control' />
                                        </div>

                                    </div>
                                </div>

                                <div className="form-group col-10 m-auto my-2">
                                    <div className="row">

                                        <div className="col-4 m-auto">
                                            <label>Password : </label>
                                        </div>

                                        <div className="col-8">
                                            <input type="password" placeholder='Enter correct password' name='password' value={Fdata.password} onChange={(e) => HandleChange(e)} className='form-control' />
                                        </div>

                                    </div>
                                </div>


                                <div className="col-12 text-center mt-4">
                                    <button className='btn btn-success px-4 py-2 mx-3 w-50' onClick={() => setClickButton("Button1")}>User Login</button>
                                </div>


                            </form>

                        </div>




                        <div className="col-12 my-4">
                            <h5 className='text-center'>
                                or
                            </h5>
                        </div>

                        <div className="col-10 m-auto">
                            <div className="row">
                                <div className="col-12 m-auto">
                                    <p className='text-center fw-bold'>This is for Admin only !!!</p>
                                </div>

                                <div className='col-6 m-auto text-center'>
                                    <button className='btn btn-danger px-4' onClick={() => nav('/admin/user')}> Go To Admin Login</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </StrictMode>
    )
}

export default LoginPage;