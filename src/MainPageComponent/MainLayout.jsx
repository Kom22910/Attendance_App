


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

    const [AdminData, setAdminData] = useState({
        name: ""
    });


    // seting loging data

    const [totalData, setTotalData] = useState([]);

    // console.log(totalData);

    let LoginUser = totalData.filter((item) => {
        return item.status === "Active";
    });

    let LogoutUser = totalData.filter((item) => {
        return item.status === "Deactive"
    })




    const [isLoading, setIsLoading] = useState(false);


    const FetchData = async () => {
        try{
            setIsLoading(true);
            let res = await axios.get(`${Base_url}/admin/getadmin`);
            setAdminData({
                name: res.data.data[0].name
            });
            
            let result = await axios.get(`${Base_url}/user/api/`);
            setTotalData(result.data.data)
        }
        catch(err){
            console.error("Error while Fetching data", err);
        }
        finally{
            setIsLoading(false);
        }
    }



    const func1 = (a)=>{
        setIsLoading(a);
    }

    useEffect(() => {
        FetchData();
    }, [visibleContent])




    const colorBTN1 = {
        backgroundColor : "white",
        color : "black"
    }

    const colorBTN2 = {
        backgroundColor : "black",
        color : "white"
    }


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


            <div className="container-fluid MainPageContainer">
                <div className="row">

                    {/* Header */}
                    <div className="col-md-10 col-11 m-auto headerContainer">
                        <div className="row">

                            <div className="col-12 py-2 profileContainer">

                                <div className="row">

                                    {/* part 2 */}
                                    <div className="col-md-6 col-4  m-auto">
                                        <h3 className='text-center m-auto'>{date1}</h3>
                                    </div>


                                    {/* part 2 */}
                                    <div className="col-md-6 col-6  ms-auto py-2">
                                        <div className="row">

                                            <div className="col-md-6 col-7 flexKaro ms-auto">
                                                <h3 className='text-primary m-auto'>{AdminData.name}</h3>
                                            </div>

                                            <div className="col-5">
                                                <img src="/AppLogo.jpg" alt="" className='d-block rounded-pill flexKaro' style={{ width: "60px" }} onClick={() => nav('/admin/EXSWDWITDSS')} />
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
                                    <li className='btn' style={visibleContent === 1? colorBTN2 : colorBTN1} onClick={() => setVisibleContent(1)}>Total Member</li>
                                    <li className='btn' style={visibleContent === 2? colorBTN2 : colorBTN1} onClick={() => setVisibleContent(2)}>Active Member</li>
                                    <li className='btn' style={visibleContent === 3? colorBTN2 : colorBTN1} onClick={() => setVisibleContent(3)}>Logout Member</li>
                                </ul>
                            </div>


                            {/* section2 - Table  */}
                            {
                                (visibleContent === 1 || visibleContent === 4) &&
                                <AddMember title={"Total Member"}  loading = {func1} />
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