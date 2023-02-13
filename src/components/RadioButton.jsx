import React from "react";

const RadioButton = ({ label, value, onChange }) => {
	return (
		<label>
			<input type="radio" checked={value} onChange={onChange} />
			<span>{label}</span>
		</label>
	);
};

export default RadioButton;
