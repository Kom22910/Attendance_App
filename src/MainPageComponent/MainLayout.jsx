


import axios from 'axios'
import React, { StrictMode, useEffect, useState } from 'react'
import AddMember from './AddMember.jsx';
import LoginLogoutMember from './LoginLogoutMember.jsx';
import { useNavigate, useParams } from 'react-router-dom';
const Base_url = import.meta.env.VITE_BASE_URL;

const MainLayout = () => {
    const nav = useNavigate();

    let date = new Date().getDate();
    let month = new Date().getMonth()
    let year = new Date().getFullYear();
    let date1 = `${date}-${month + 1}-${year}`;

    const [visibleContent, setVisibleContent] = useState(1);

    const [AdminData , setAdminData] = useState({
        name : ""
    });


    // seting loging data

    const [totalData , setTotalData] = useState([]);

    // console.log(totalData);

    let LoginUser = totalData.filter((item)=>{
        return item.status === "Active";
    });

    let LogoutUser = totalData.filter((item)=>{
        return item.status === "Deactive"
    })


    const FetchData = async () => {
        let res = await axios.get(`${Base_url}/admin/getadmin`);
        setAdminData({
            name : res.data.data[0].name
        });

        let result = await axios.get(`${Base_url}/user/api/`);
        setTotalData(result.data.data)
    }


    useEffect(() => {
        FetchData();
    }, [visibleContent])





    return (
        <StrictMode>
            <div className="container-fluid MainPageContainer">
                <div className="row">

                    {/* Header */}
                    <div className="col-md-10 col-11 m-auto headerContainer">
                        <div className="row">

                            <div className="col-12 py-2 profileContainer">

                                <div className="row">
                                    
                                    {/* part 2 */}
                                    <div className="col-md-8 col-4  m-auto">
                                        <h3 className='text-center m-auto'>{date1}</h3>
                                    </div>


                                    {/* part 2 */}
                                    <div className="col-md-3 col-6  ms-auto py-2">
                                        <div className="row">

                                            <div className="col-md-6 col-7 flexKaro">
                                                <h3 className='text-primary m-auto'>{AdminData.name}</h3>
                                            </div>

                                            <div className="col-5">
                                                <img src="/AppLogo.jpg" alt="" className='d-block rounded-pill flexKaro' style={{width : "60px"}} onClick={()=>nav('/admin/EXSWDWITDSS')} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>



                    {/* Bodysection  */}
                    <div className="col-11 m-auto bodySectionContainer py-4">
                        <div className="row">

                            {/* section 1 - nav options  */}
                            <div className="col-md-6 col-12 m-auto py-2 headerOption">
                                <ul>
                                    <li className='btn' onClick={() => setVisibleContent(1)}>Total Member</li>
                                    <li className='btn' onClick={() => setVisibleContent(2)}>Active Member</li>
                                    <li className='btn' onClick={() => setVisibleContent(3)}>Logout Member</li>
                                </ul>
                            </div>


                            {/* section2 - Table  */}
                            {
                                (visibleContent === 1 || visibleContent === 4)&&
                                <AddMember title={"Total Member"} />
                            }

                            {
                                visibleContent === 2 &&
                                <LoginLogoutMember data={LoginUser} title={"Active Member"} />
                            }

                            {
                                visibleContent === 3 &&
                                <LoginLogoutMember data={LogoutUser} title={"Deactive Member"} />
                            }


                        </div>
                    </div>




                </div>
            </div>




        </StrictMode>
    )
}

export default MainLayout;