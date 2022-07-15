import { useState, useEffect } from 'react';
import { GrInProgress } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai'; 



function Approver() {

    const [pendingApproval, setPendingApproval] = useState(0);
    const [pendingList, setPendingList] = useState([]);
    const [approvedDocs, setApprovedDocs] = useState(0);
    const [comments, setComments] = useState('')

    const usertoken = JSON.parse(localStorage.getItem('usertoken'));
    console.log(usertoken)

    const userid = JSON.parse(localStorage.getItem('userid'));
    console.log(userid)

    
    function approverAction(docid) {
        alert('doc approved')
        fetch(`http://localhost:5000/${userid}/approve?docid=${docid}`, {
            method: 'POST', 
            headers: {
                'Content-type': 'Application/json', 
                'Accept': 'Application/json', 
                'token': 'Bearer ' + usertoken
            },
            body: JSON.stringify({
                status: 'completed', 
                approvalComments: comments
            })

        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            window.location.reload();
            

        }).catch((e) => {
            console.log(e)
        })
    }



    useEffect(() => {
        const usertoken = JSON.parse(localStorage.getItem('usertoken'));
        console.log(usertoken)

        const userid = JSON.parse(localStorage.getItem('userid'));
        console.log(userid)

        



        fetch(`http://localhost:5000/${userid}/getdocswaitingapproval?status1=pending_approval&status2=completed`, {
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
            if (data.msg == 'you are not a approver! so no access!') {
                alert('you are not a approver, so no access')
                window.location.href = '/'
            }
            console.log(data.docswaitingapproval)
            let temp = data.docswaitingapproval;
            console.log(temp)
            setPendingList(temp)
            console.log(pendingList)
            
            setPendingApproval(data.docswaitingapproval.length)
            setApprovedDocs(data.docsapproved.length)
            console.log(approvedDocs)
            
        }).catch((e) => {
            console.log(e)

        })
    }, [pendingApproval])


    return (
        <>
            <div className="stats-container">
                <div className="userdatacontainer">
                    <div className="userdata">
                        <div className="databox">
                            <p>Docs Pending Approval</p>
                            <GrInProgress className="icon" />
                            <span><Link to="#">{pendingApproval}</Link></span>
                        </div>
                    </div>


                    <div className="userdata">
                        <div className="databox">
                            <p>Docs Approved</p>
                            <AiOutlineCheckCircle className="icon" />
                            <span><Link to="#">{approvedDocs}</Link></span>
                        </div>
                    </div>
                </div>

                <h2 className="take_action">Take Action</h2>

                <table>
                    <thead>
                        <tr>
                            <td>DOC ID</td>
                            <td>DOC Title</td>
                            <td>DOC Owner ID</td>
                            <td>Approver Action</td>
                        </tr>
                    </thead>

                    

                    {pendingList.map((pl) => {

                        return (
                            <tbody>
                                <tr>
                                    <td>{pl._id}</td>
                                    <td>{pl.title}</td>
                                    <td>{pl.userId}</td>
                                    <td>
                                        <input className="approval_comments" onChange={(e) => setComments(e.target.value)} placeholder="Approval comments" />
                                        <button onClick = {() => { approverAction(pl._id) }}>Approve</button>
                                    </td>
                                </tr>
                            </tbody>
                        )

                    })}
                    
                </table>
            </div>

            
        </>
    )



    
}

export default Approver;

