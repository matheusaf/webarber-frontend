import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../User/UserContext";
import Modal from "react-modal";
import Button from "../UI/Button/Button";

const AvaliacaoModal = ({isOpen}) => {
	let { webarber } = useContext(UserContext);

	const modalStyle = {
		content:{
			backgroundColor: "black",
			top: "20%",
			left: "20%",
			right: "20%",
			bottom: "20%",
		}
	};

	return (
			<Modal isOpen={isOpen} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} 
				   style={modalStyle}>
				<div>
				<Button buttonColors={1} buttonText="Avaliar"/>
				</div>
			</Modal>
	);
};

export default AvaliacaoModal;