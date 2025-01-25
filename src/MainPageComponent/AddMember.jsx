



import axios from 'axios';
import React, { StrictMode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Base_url = import.meta.env.VITE_BASE_URL;

const AddMember = ({ title}) => {
    const nav = useNavigate();

    const [totalData , setTotalData] = useState([]);


    

    const ChangeEdit = (keyId) => {
        nav(`/editUp/AXRYVSSED/${keyId}`);
    }


    const deleteIt = (keyId) => {
        if (confirm('Are you Sure ? ')) {
            axios.delete(`${Base_url}/user/api/${keyId}`)
            .then((res)=>{
                alert(res.data.message);
                console.log(res.data.message);
            })
            .catch((err)=>{
                alert('Error while deleting ' + err);
            })
            setVisibleContent(visibleContent !== 4 ? 4 : 1)
        }
    };

    const FetchData =async()=>{
        try{
            const res = await axios.get(`${Base_url}/user/api/`);
            setTotalData(res.data.data);
        }
        catch(err){
            alert(err);
        }
    }


    useEffect(()=>{
        FetchData();
    } , []);

    return (
        <StrictMode>

            <div className="col-12 mt-5 sec2">
                <div className="row">

                    <div className="col-11 m-auto">
                        <div className="row">
                            <div className="col-6">
                                <h3>{title}</h3>
                            </div>

                            <div className="col-2 ms-auto">
                                <button className='btn btn-success w-75' onClick={() => { nav('/signUp/AXRYVSSSC') }}>Add Member</button>
                            </div>
                        </div>

                    </div>

                    <div className="col-11 m-auto mt-4">
                        <table className='table table-hover'>
                            <thead className='table-light'>
                                <tr>
                                    <th>#</th>
                                    <th>Member Name</th>
                                    <th>Code Name</th>
                                    <th>Member password</th>
                                    <th>Appointment</th>
                                    <th>Appointer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    totalData.map((val, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{val.name}</td>
                                                <td>{val.code}</td>
                                                <td>{val.password}</td>
                                                <td>{val.BName}</td>
                                                <td>{val.leader}</td>
                                                <td>
                                                    <button className='btn btn-primary' onClick={() => ChangeEdit(val._id)} >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className='btn btn-danger' onClick={()=>deleteIt(val._id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </StrictMode>
    )
}

export default AddMember;