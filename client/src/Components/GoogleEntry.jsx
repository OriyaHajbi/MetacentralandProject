import React from "react";



function GoogleEntry(props){
    return  <div className="">
                <div className="card social-block text-center">
                  <div className="card-body">
                    <form action="/auth/google" method="GET">
                      <button className="btn btn-social btn-google" type="submit">{props.text}</button>
                    </form>
                    <a className="btn btn-social btn-google" href="/auth/google" role="button">
                      <i className="fab fa-google"></i>
                      {props.text}
                    </a>
                  </div>
                </div>
            </div>
}




export default GoogleEntry;