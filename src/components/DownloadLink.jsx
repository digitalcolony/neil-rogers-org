import React from "react";

export default function DownloadLink({ display, src, children }) {
	return display ? (
		<a href={src} download>
			{children}
		</a>
	) : (
		children
	);
}
