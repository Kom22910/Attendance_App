




import React, { StrictMode } from 'react'

const LoginLogoutMember = ({ data , title }) => {

    

    return (
        <StrictMode>

            <div className="col-12 mt-5 sec2">
                <div className="row">
                    <div className="col-md-11 col-12 m-auto">
                        <h3>{title}</h3>
                    </div>

                    <div className="col-md-11 col-12 m-auto mt-4">
                        <table className='table table-hover'>
                            <thead className='table-light'>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th className='vis'>Appointment</th>
                                    <th>Status</th>
                                    <th>Login Time</th>
                                    <th >Logout Time</th>
                                    <th className='vis vis1'>Appointer Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((val, index) => {

                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{val.name}</td>
                                                <td className='vis'>{val.BName}</td>
                                                {
                                                    val.status === "Active" ?
                                                        <td className=' text-success fw-bold'>{val.status}</td> : <td className=' text-danger fw-bold'>{val.status}</td>
                                                }
                                                <td>{val.login}</td>
                                                <td>{val.logout}</td>
                                                <td className='vis vis1'>{val.leader}</td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    data === false &&
                                    logoutData.map((val, index) => {

                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{val.name}</td>
                                                <td>{val.BName}</td>
                                                {
                                                    val.status === "Active" ?
                                                        <td className=' text-success fw-bold'>{val.status}</td> : <td className=' text-danger fw-bold'>{val.status}</td>
                                                }
                                                <td>{val.login}</td>
                                                <td>{val.logout}</td>
                                                <td>{val.leader}</td>
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

export default LoginLogoutMember;