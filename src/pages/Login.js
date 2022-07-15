import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {

    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');


    function loginUser(e) {
        e.preventDefault();
        console.log(loginUserName, loginPassword)
        if (loginUserName == '' || loginPassword == '') {
            return alert('provide login credentials')
        }

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: loginUserName,
                password: loginPassword
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data)

            if (data.msg == 'passwords do not match') {
                return alert(JSON.stringify(data));
            }

            if (data.msg == 'no such user exists') {
                return alert(JSON.stringify(data));
            }

            alert(data.msg)

            localStorage.setItem('usertoken', JSON.stringify(data.token))
            localStorage.setItem('userid', JSON.stringify(data.userid))

            window.location.href = '/dashboard'
        }).catch((e) => {
            console.log(e)
        })

    }





    return (
        <div class="formContainer" onSubmit={loginUser}>
            <form className="loginForm">
                <h2>Login</h2>
                <div className="form-control">
                    <input type="text" placeholder="enter email" onChange={(e) => { setLoginUserName(e.target.value) }} />
                </div>
                <div className="form-control">
                    <input type="text" placeholder="enter password" onChange={(e) => { setLoginPassword(e.target.value) }} />
                </div>
                <div className="form-control">
                    <button>Login</button>
                </div>
            </form>
        </div> 
   )
}

export default Login;
