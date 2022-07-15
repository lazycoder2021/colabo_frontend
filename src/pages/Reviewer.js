import { useState, useEffect } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai'; 
import { GrInProgress } from 'react-icons/gr';
import { Link } from 'react-router-dom';


function Reviewer() {

    const [reviewedDocs, setReviewedDocs] = useState(0);
    const [reviewPending, setreviewPending] = useState(0);
    const [pendingList, setPendingList] = useState([]);
    const [comments, setComments] = useState('');

    const usertoken = JSON.parse(localStorage.getItem('usertoken'));
    console.log(usertoken)

    const userid = JSON.parse(localStorage.getItem('userid'));
    console.log(userid)



    function reviewerAction(docid) {
        alert('doc reviewed')
        fetch(`http://localhost:5000/${userid}/addreview?docid=${docid}`, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
                'Accept': 'Application/json',
                'token': 'Bearer ' + usertoken
            },
            body: JSON.stringify({
                status: 'pending_approval',
                remarks: comments, 
                docId: docid
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

          

        fetch(`http://localhost:5000/${userid}/getdocswaitingreview?status1=under_review&status2=completed`, {
            method: 'GET',
            headers: {
                'Content-type': 'Application/json',
                'Accept': 'Application/json',
                'token': 'Bearer ' + usertoken
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data.msg)
            if (data.msg === 'you are not a reviewer! so no access!') {
                alert('you are not a reviewer! so no access to this page');
                window.location.href = '/'
            }
            console.log(data.docswaitingreview.length)
            console.log(data.docsreviewed.length)
            console.log(data.docswaitingreview);
            setPendingList(data.docswaitingreview);
            console.log(pendingList)
            setReviewedDocs(data.docsreviewed.length)
            setreviewPending(data.docswaitingreview.length)
        }).catch((e) => {
            console.log(e)
        })
    }, [])


    


    

    return (
            <>
               <div className="stats-container">
                <div className="userdatacontainer">
                    <div className="userdata">
                        <div className="databox">
                            <p>Docs Waiting Review</p>
                            <GrInProgress className="icon" />
                            <span><Link to="#">{reviewPending}</Link></span>
                        </div>
                    </div>
                
                
                    <div className="userdata">
                        <div className="databox">
                            <p>Docs Reviewed</p>
                            <AiOutlineCheckCircle className="icon" />
                            <span><Link to="#">{reviewedDocs}</Link></span>
                        </div>
                    </div>
                </div>

                <h2 className="take_action">Take Action</h2>
                <h2 className="take_action">Docs Waiting Review</h2>

                <table>
                    <thead>
                        <tr>
                            <td>DOC ID</td>
                            <td>DOC Title</td>
                            <td>DOC Status</td>
                            <td>Reviewer Action</td>
                        </tr>
                    </thead>

                    {pendingList.map((pl) => {

                        return (
                            <tbody>
                                <tr>
                                    <td>{pl._id}</td>
                                    <td>{pl.title}</td> 
                                    <td>{pl.status}</td>
                                    <td>
                                        <input className="approval_comments" placeholder="Review comments" onChange={(e) => setComments(e.target.value)} />
                                        <button onClick = {() => { reviewerAction(pl._id) }}>Add Review</button>
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

export default Reviewer;
