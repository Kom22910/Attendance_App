



import axios from 'axios';
import React, { StrictMode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Base_url = import.meta.env.VITE_BASE_URL;

const AddMember = ({ title  , loading }) => {
    const nav = useNavigate();

    const [totalData, setTotalData] = useState([]);


    const ChangeEdit = (keyId) => {
        nav(`/editUp/AXRYVSSED/${keyId}`);
    }


    const deleteIt = (keyId) => {
        if (confirm('Are you Sure ? ')) {
            axios.delete(`${Base_url}/user/api/${keyId}`)
            .then((res) => {
                    alert(res.data.message);
                    console.log(res.data.message);
                })
                .catch((err) => {
                    alert('Error while deleting ' + err);
                })

                setVisibleContent(visibleContent !== 4 ? 4 : 1)
        }
    };

    const FetchData = async () => {
        try {
            const res = await axios.get(`${Base_url}/user/api/`);
            setTotalData(res.data.data);
        }
        catch (err) {
            alert(err);
        }
    }


    useEffect(() => {
        FetchData();
    }, [totalData]);

    return (
        <StrictMode>

            <div className="col-12 mt-5 sec2">
                <div className="row">

                    <div className="col-md-11 col-12 m-auto">
                        <div className="row">
                            <div className="col-6">
                                <h3>{title}</h3>
                            </div>

                            <div className="col-md-2 col-sm-4 col-6 ms-auto buttonEdit text-end">
                                <button className='btn btn-success w-75' onClick={() => { nav('/signUp/AXRYVSSSC') }}>Add Member</button>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-11 col-12 m-auto mt-4">
                        <table className='table table-hover'>
                            <thead className='table-light'>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Code</th>
                                    <th className='vis vis1'>Member password</th>
                                    <th>Appointment</th>
                                    <th className='vis'>Appt Name</th>
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
                                                <td className='vis vis1'>{val.password}</td>
                                                <td>{val.BName}</td>
                                                <td className='vis'>{val.leader}</td>
                                                <td className='vis vis1'>
                                                    <button className='btn btn-primary' onClick={() => ChangeEdit(val._id)} >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                </td>
                                                <td className='vis vis1'>
                                                    <button className='btn btn-danger' onClick={() => deleteIt(val._id)}>
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