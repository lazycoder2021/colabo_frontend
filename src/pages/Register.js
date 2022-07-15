import { useState } from 'react';

function Register() {
    const [registerUsername, setregisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    function registerUser(e) {
        e.preventDefault();
        console.log(registerUsername, registerPassword)

        if (registerUsername == '' || registerPassword == '') {
            return alert('provide username and password')
        }


        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: registerUsername,
                password: registerPassword,
            })

        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(JSON.stringify(data.msg))
            alert(JSON.stringify(data.msg))
        }).catch((e) => {
            console.log(e)
        })



        console.log('registering user....')


    }






    return (
        <div className="formContainer">
            <form className="loginForm" onSubmit={registerUser}>
                <h2>Register</h2>
                <div className="form-control">
                    <input type="text" placeholder="enter email" onChange={(e) => { setregisterUsername(e.target.value) }} />
                </div>
                <div className="form-control">
                    <input type="text" placeholder="enter password" onChange={(e) => { setRegisterPassword(e.target.value) }} />
                </div>


                <div className="form-control">
                    <button>Register</button>
                </div>
            </form>
        </div>
   )
}

export default Register;
