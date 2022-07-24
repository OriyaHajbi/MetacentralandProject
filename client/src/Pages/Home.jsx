import React from "react";


function Home(){
    const [data, setData] = React.useState(null);

    // React.useEffect(() => {
    //   fetch("https://metacentralanserver.herokuapp.com/api")
    //     .then((res) => res.json())
    //     .then((data) => setData(data.message));
    // }, []);
    //                    <p>{!data ? "Loading..." : data}</p>

    
    return  <div className="container w-50 centered">
                <div className="card">
                    <div className="card-body">
                    <i className="fa-brands fa-sketch fa-4x"></i>
                    <h1 className="display-3">Lets Start</h1>
                    <p className="lead">Lets buy a peace of land!</p>
    
                    <a className="btn btn-light btn-lg" href="/register" role="button">Register</a>
                    <a className="btn btn-dark btn-lg" href="/login" role="button">Login</a>
                    
                    </div>
                </div>
            </div>
}


export default Home;