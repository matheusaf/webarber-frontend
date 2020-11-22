import "./ImageHeader.css";
import React from "react";
import { Link } from "react-router-dom";
import webarber from "../../../images/webarber.png";

const ImageHeader = ({style}) => {
    return (<div>
                <Link to="/">
                    <img className="img header" src={webarber} alt="webarber logo" style={style}></img>
                </Link>
            </div>
    );
};

export default ImageHeader;