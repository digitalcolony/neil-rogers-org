import React from "react";

const RadioButton = ({ label, value, onChange }) => {
	return (
		<label htmlFor={label}>
			<input id={label} type="radio" checked={value} onChange={onChange} />
			<span>{label}</span>
		</label>
	);
};

export default RadioButton;
