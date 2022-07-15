import { useState, useEffect } from 'react'; 
import { GrInProgress } from 'react-icons/gr'; 
import { AiOutlineIssuesClose } from 'react-icons/ai'; 
import { AiOutlineSearch } from 'react-icons/ai'; 
import { MdApproval } from 'react-icons/md'; 
import { Link } from 'react-router-dom';



function Dashboard() {

    const [inprogress, setInProgress] = useState(0); 
    const [underReview, setunderReview] = useState(0); 
    const [completed, setCompleted] = useState(0); 
    const [pendingApproval, setPendingApproval] = useState(0); 
    


    useEffect(() => {
        const usertoken = JSON.parse(localStorage.getItem('usertoken'));
        console.log(usertoken)

        const userid = JSON.parse(localStorage.getItem('userid'));
        console.log(userid)


        fetch(`http://localhost:5000/${userid}/dashboard`, {
            method: 'GET', 
            headers: {
                'Content-type': 'Application/json', 
                'Accept': 'Application/json',
                 'token': 'Bearer ' + usertoken
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            setInProgress(data.inprogressdocslength)
            setunderReview(data.docsunderreviewlength)
            setPendingApproval(data.docsunderapprovallength)
            setCompleted(data.completeddocslength)
        }).catch((e) => {
            console.log(e)
        })
    },[])


    return (
        <div className="stats-container">
            <h2 className="dashtitle">Dashboard</h2>
            <center><Link to = "/adddoc"><button>Work on a New Doc</button></Link><Link to="/viewdocs"><button>View Your Docs</button></Link><Link to='/rdashboard'><button>For Reviewers</button></Link><Link to='/adashboard'><button>For Approvers</button></Link></center>
            <div className="userdatacontainer">
                <div className="userdata">
                    <div className="databox">
                        <p>Docs In Progress</p>
                        <GrInProgress className="icon" />
                        <span><Link to="#">{inprogress}</Link></span>
                    </div>
                </div>
                <div className="userdata">
                    <div className="databox">
                        <p>Completed Docs</p>
                        <AiOutlineIssuesClose className="icon" />
                        <span>{completed}</span>
                    </div>
                </div>
                <div className="userdata">
                    <div className="databox">
                           <p>Docs Under Review</p>
                            <AiOutlineSearch className="icon"/>
                            <span>{underReview}</span>
                    </div>
                </div>
                <div className="userdata">
                    <div className="databox">
                        <p>Pending Approval</p>
                        <MdApproval className="icon" />
                        <span>{pendingApproval}</span>
                     </div>
                </div>
             </div>
        </div>
    )
}

export default Dashboard;
