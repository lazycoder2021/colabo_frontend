import { Link } from 'react-router-dom';


function Home() {
    return (
        <>
            <div className="banner">
                <h2 className="heading">COLABO</h2>
                <h2 className="subheading">Document Collaboration Tool</h2>  
                <p>Write.  &nbsp;Review.  &nbsp;Approve.  &nbsp;Complete</p>
                <p className="releasenotes"><Link to='/releasenotes'>Release Notes</Link></p>
             </div>
        </>
    )
}

export default Home;
