import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const RatingIcon = ({baseValue = 0, getRatingValue}) => {
	const [ratingValue, setRatingValue] = useState(baseValue);
	const [hoverRatingValue, setHoverRatingValue] = useState(0);

	const handleOnClick = (event) => {
		let eventValue = event.target.value;
		if(ratingValue === eventValue){
			eventValue = 0;
		}
		setRatingValue(eventValue);
		getRatingValue(eventValue);
	};

	return (
		<div>
			{Array.from(Array(5).keys()).map((index) => {
				return(
						<label>
							<input type="radio" name={`rating-${index}`} style={{display: "none"}} value={index+1} onClick={handleOnClick}/>
							<FaStar color={(index + 1) <= (hoverRatingValue || ratingValue) ? "#2bce3b": "white"} 
									onMouseEnter={() => setHoverRatingValue(index+1)} onMouseLeave={() => setHoverRatingValue(0)}
									size={50} style={{cursor:"pointer", padding:"5px"}}/>
						</label>

					);
				}
			)}
		</div>
	);
};

export default RatingIcon;
