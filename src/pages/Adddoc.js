import { useState } from 'react';



function Adddoc() {

    const [title, setTitle] = useState(''); 
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');


    const usertoken = JSON.parse(localStorage.getItem('usertoken'));
    console.log(usertoken)

    const userid = JSON.parse(localStorage.getItem('userid'));
    console.log(userid)

    function savedoc() {
        alert('doc added successfully')
        fetch(`http://localhost:5000/createdoc/${userid}`, {
            method: 'POST', 
            headers: {
                'Content-type': 'Application/json', 
                'Accept': 'Application/json', 
                'token': 'Bearer ' + usertoken
            },
            body: JSON.stringify({
                title: title, 
                body: body, 
                userId: userid, 
                status: status
            })

        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data)
            window.location.href = '/viewdocs'
        }).catch((e) => {
            console.log(e)
        })

    }




    return (
        <div className="stats-container">
            <div className="post-container">
                <input className="postTitle" placeholder="Article Title..." onChange={(e) => { setTitle(e.target.value) }} />
                <select onChange={(e) => { setStatus(e.target.value) }}>
                    <option value="">--select a status--</option>
                    <option value="inprogress">inprogress</option>
                    <option value="under_review">under_review</option>
                    <option value="pending_approval">pending_approval</option>
                    <option value="completed">completed</option>
                </select>
                <textarea cols="30" rows="30" placeholder="Article Body..." onChange={(e) => { setBody(e.target.value) } } className="postBody"></textarea>
                <button className="save" onClick={savedoc}>SAVE</button>
            </div>
        </div>
   )
}

export default Adddoc;
