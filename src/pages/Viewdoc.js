import { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';



function Viewdoc() {

    const [docdetails, setdocdetails] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');
    const [reviewComments, setReviewComments] = useState({
        reviewComment: ''
    }); 
    const [approverComments, setApproverComments] = useState({
        approverComment: ''
    });
    
    const { id } = useParams(); 

    console.log(id)

    const usertoken = JSON.parse(localStorage.getItem('usertoken'));
    console.log(usertoken)

    const userid = JSON.parse(localStorage.getItem('userid'));
    console.log(userid)



    useEffect(() => {
        fetch(`http://localhost:5000/${userid}/getreviewfordoc/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'Application/json',
                'Accept': 'Application/json',
                'token': 'Bearer ' + usertoken
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data.reviewcomment.remarks)
            let temp = data.reviewcomment.remarks;
            console.log(temp)
            setReviewComments({ reviewComment: temp })
            console.log(reviewComments)
        }).catch((e) => {
            console.log(e)
        })
    }, [])


    useEffect(() => {
        fetch(`http://localhost:5000/${userid}/getapprovefordoc/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'Application/json',
                'Accept': 'Application/json',
                'token': 'Bearer ' + usertoken
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data.approvecomment.approvalComments)
            let temp = data.approvecomment.approvalComments;
            console.log(temp)
            setApproverComments({ approverComment: temp })
            console.log(approverComments)
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    
    
    

    

    useEffect(() => {
        const usertoken = JSON.parse(localStorage.getItem('usertoken'));
        console.log(usertoken)

        const userid = JSON.parse(localStorage.getItem('userid'));
        console.log(userid)


        fetch(`http://localhost:5000/${userid}/getdoc/${id}`, {
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
            setdocdetails(data.msg)

        }).catch((e) => {
            console.log(e)
        })
    }, [])

     


    return (
        <div className="stats-container">
            <div className="post-container">


                {docdetails.map((dd) => {

                    return (
                        <>

                            <input className="postTitle" placeholder={dd.title} disabled/>
                            <select disabled>
                                <option value="" placeholder="aaa">{dd.status}</option>
                            </select>
                            <textarea cols="30" rows="20" placeholder={dd.body} className="txtarea" disabled></textarea>


                            <p><b>Reviewer Comment:</b> <br />{reviewComments.reviewComment}</p>
                            <div className="gap"></div>
                            <p><b>Approver Comment:</b> <br />{approverComments.approverComment}</p>
                        </>
                    )


                })}

                

                

            </div>
        </div>
    )
}

export default Viewdoc;
