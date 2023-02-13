import React from "react";

export default function Hi({ name }) {
	const handleClick = () => {
		console.log("Pressed");
	};

	return (
		<>
			<p>hi {name}!</p>
			<button onClick={handleClick}>[PRESS ME]</button>
		</>
	);
}
