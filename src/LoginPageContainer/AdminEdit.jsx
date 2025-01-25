

import axios from 'axios';
import React, { StrictMode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Base_url = import.meta.env.VITE_BASE_URL;

const AdminEdit = () => {

    const nav = useNavigate();

    const[hide , setshow] = useState(true)


    const [data, setData] = useState({
        name: "",
        code: "",
        password: "",
    });



    const ChangeData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }


    const PostData = (e) => {
        e.preventDefault();
        axios.put(`${Base_url}/admin/getadmin/${data._id}` , data)
        .then((res)=>{
            alert('Succesfully editted');
            nav('/admin/AXRYVSCDFV');
        })
        .catch((err)=>{
            alert('Editting failed');
        })
    }


    const FetchData = async () => {
        let res = await axios.get(`${Base_url}/admin/getadmin`)
        setData(res.data.data[0])
    }



    useEffect(() => {
        FetchData();
    }, []);




    return (
        <StrictMode>


            <div className="container-fluid LoginPageContainer">
                <div className="row">

                    <div className="col-md-4 col-10 py-4 bg-info m-auto formContainer">

                        <h3 className='text-center'>Edit Member Data</h3>


                        {/* form data  */}

                        <form className='mt-5' onSubmit={(e) => PostData(e)}>
                            <div className="row">

                                <div className="form-group col-10 m-auto my-3">
                                    <div className="row">

                                        <div className="col-md-4 col-5 m-auto">
                                            <label>User Name : </label>
                                        </div>

                                        <div className="col-7">
                                            <input type="text" placeholder='Enter name ' required={true} name="name" value={data.name} className='form-control' onChange={(e) => ChangeData(e)} />
                                        </div>

                                        <div className="col-1" style={{height: "15px"
                                        }}>
                                            
                                        </div>

                                    </div>
                                </div>

                                <div className="form-group col-10 m-auto my-3">
                                    <div className="row">

                                        <div className="col-md-4 col-5 m-auto">
                                            <label>User Code : </label>
                                        </div>

                                        <div className="col-7">
                                            <input type={hide === true ? "password" : "text"} placeholder='Enter Code ' required={true} name='code' value={data.code} onChange={(e) => ChangeData(e)} className='form-control' />
                                        </div>

                                        <div className="col-1 m-auto">
                                            <div className={
                                                hide === true ? "col-3 btn btn-info py-2 px-2 rounded-pill" : "col-3 btn btn-danger py-2 px-2 rounded-pill"
                                            }
                                            onClick={()=>setshow(!hide)} 
                                            >
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="form-group col-10 m-auto my-3">
                                    <div className="row">

                                        <div className="col-md-4 col-5 m-auto">
                                            <label>Password : </label>
                                        </div>

                                        <div className="col-7">
                                            <input type={hide===true ? "password" : "text"} placeholder='Enter correct password ' required={true} name='password' value={data.password} onChange={(e) => ChangeData(e)} className='form-control' />
                                        </div>


                                        <div className="col-1 m-auto">
                                            <div className={
                                                hide === true ? "col-3 btn btn-info py-2 px-2 rounded-pill" : "col-3 btn btn-danger py-2 px-2 rounded-pill"
                                            }
                                            onClick={()=>setshow(!hide)} 
                                            >
                                            </div>
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

export default AdminEdit;