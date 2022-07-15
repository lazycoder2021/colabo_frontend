import { Link } from 'react-router-dom';

function Navbar() {

    //if (localStorage.getItem('userid'))
    function logout() {
        localStorage.clear(); 
        window.location.href = '/';
    }



    return (
        <div className="navbar">
            <div className="logo"><Link to='/'><p className="colabo">COLABO</p></Link></div>

            {localStorage.getItem('userid') ? <div className="buttons"><p className="logout" onClick={logout}>Logout</p></div> : <div className="buttons">
                <Link to='/register'><p>REGISTER</p></Link>
                <Link to='/login'><p>LOGIN</p></Link>          
            </div>}

        
        </div>    
    )
}

export default Navbar;
