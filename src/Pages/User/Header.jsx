import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import webarber from "../../images/webarber.png";

export default function Header() {
    return (<div>
                <div className="row">
                </div>
                <div className="container">
                    <div className='row'>
                        <div className="card">
                            <div className="card-header">
                                <Link to="/">
                                    <img className="card-img-top-center" src={webarber} alt="webarber logo" style={{ width: "310px", height: "90px" }}></img>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
