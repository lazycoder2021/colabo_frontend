import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';




function Viewdocs() {
    const [userdocs, setUserdocs] = useState([]);

    const usertoken = JSON.parse(localStorage.getItem('usertoken'));
    console.log(usertoken)

    const userid = JSON.parse(localStorage.getItem('userid'));
    console.log(userid)


    function deletedoc(id) {
        
        fetch(`http://localhost:5000/${userid}/deletedoc/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-type': 'Application/json', 
                'Accept': 'Application/json', 
                'token': 'Bearer ' + usertoken
            }

        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            alert('doc deleted')
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


        fetch(`http://localhost:5000/${userid}/getdocs?userId=${userid}`, {
            method: 'GET',
            headers: {
                'Content-type': 'Application/json',
                'Accept': 'Application/json',
                'token': 'Bearer ' + usertoken
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data.docs)
            setUserdocs(data.docs)
            console.log(userdocs)
            
        }).catch((e) => {
            console.log(e)
        })
    }, [])


    return (
        <>
            <div className="stats-container">
                <table className="user_data_table">
                    <thead>
                        <tr>
                            <td>Doc Id</td>
                            <td>Doc Title</td>
                            <td>Doc Status</td>
                            <td>Actions</td>
                        </tr>
                        </thead>

            {userdocs.map((userdoc) => {
                let docid = userdoc._id;
                return (
                    <>
                        <tbody>
                            <tr>
                                <td><Link to={`/viewdoc/${docid}`}>{userdoc._id}</Link></td>
                                <td>{userdoc.title}</td>
                                <td>{userdoc.status}</td>
                                <td><Link to={`/editdoc/${docid}`}>Edit</Link>&nbsp;&nbsp;&nbsp;<Link to='#' onClick={() => deletedoc(docid)}>Delete</Link></td>
                            </tr>
                        </tbody>
                    </>
                )

            })}

            </table>

            </div>

        </>
   )
}

export default Viewdocs;