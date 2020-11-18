import React from "react";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import "./Loading.css";

const Loading = () => {
    const override = css`
            display: block;
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-color: #2bce3b;
            `;

    return(
            <div className>
                <BarLoader css={override} width={200} height={5} color={ "#2bce3b" }/>
            </div>
    );
}


export default Loading;