import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Register from './register';
import Log from './log';
import webarber from "../images/webarber.png";
import './home.css';

export default function Home() {
    // Hooks
    const [tab, setTab] = useState(false);

    const handleClick = (event) => {
        setTab(!tab)
    }

    return (
        <div>
            <div className="row">
                <h1> webarber</h1>
            </div>
            <div className="conteiner d-flex justify-content-center">
                <div className='row'>
                    <div className="card text-center">
                        <div className="card-header">
                            <img className="card-img-top-center" src={webarber} alt="webarber logo" style={{ width: "310px", height: "90px" }}></img>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col md-col-6">
                                    <h5 className={!tab ? "active" : "disabled "}>Login</h5>
                                </div>
                                <div className="col md-col-6">
                                    <h5 className={tab ? "active" : "disabled "}>Cadastre-se</h5>
                                </div>
                            </div>
                            <br/>
                            <div className="conteiner d-flex justify-content-center">
                                <div className="row">
                                    { (!tab)? <Log/> : <Register/> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// import React from 'react';
// import { render } from '@testing-library/react';
// import Experiment from '../Experiment';

// test('renders learn react link', () => {
//     const { getByText } = render(<Experiment />);
//     const linkElement = getByText(/Hey, stranger/i);
//     expect(linkElement).toBeInTheDocument();
// });



