import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';




function Editdoc() {

    
    const { id } = useParams();

    console.log(id)

    const usertoken = JSON.parse(localStorage.getItem('usertoken'));
    console.log(usertoken)

    const userid = JSON.parse(localStorage.getItem('userid'));
    console.log(userid)


    const [docdetails, setdocdetails] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');


    function update() {
        
        fetch(`http://localhost:5000/${userid}/updatedoc/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-type': 'Application/json', 
                'Accept': 'Application/json', 
                'token': 'Bearer ' + usertoken
            },
            body: JSON.stringify({
                title: title, 
                body: body, 
                status: status
            })

        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data)
            alert('doc updated')
            window.location.href = '/viewdocs'
        }).catch((e) => {
            console.log(e)
        })
    }


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
            let temp = data.msg[0];
            setdocdetails(data.msg)
            console.log(docdetails[0]._id)
            
        }).catch((e) => {
            console.log(e)
        })
    },[])

    return (
        <div className="stats-container">
            <div className="post-container">
                

                {docdetails.map((dd) => {
                    
                    return (
                            <>

                            <input className="postTitle" placeholder={dd.title} onChange={(e) => setTitle(e.target.value)} />
                            <select onChange={(e) => setStatus(e.target.value)}>
                                <option value="" placeholder="aaa">--select a status--</option>
                                <option value="inprogress">inprogress</option>
                                <option value="under_review">under_review</option>
                                <option value="pending_approval">pending_approval</option>
                                <option value="completed">completed</option>
                            </select>
                            <textarea cols="30" rows="30" placeholder={dd.body} className="txtarea" onChange={(e) => setBody(e.target.value)}></textarea>
                            </>
                        )
                     

                })}

                
                
                <button className="save" onClick={update}>UPDATE</button>
                
            </div>
        </div>
   )
}

export default Editdoc;
