import React, { useState } from "react";
import * as soundStyles from "../styles/sound.module.css";
import DownloadLink from "./DownloadLink";

const Sound = ({ artist, src, name, action }) => {
	// TODO: "Saved to Clipboard" and "Downloading" message not displaying
	const [buttonText, setButtonText] = useState(name);
	const isDownload = action === "download";
	const handlePress = () => {
		switch (action) {
			case "play":
				const sound = new Audio(src);
				sound.play();
				break;
			case "clipboard":
				navigator.clipboard.writeText(`https://neilrogers.org${src}`);
				setButtonText("Saved to Clipboard!");
				setTimeout(() => setButtonText(name), 1000);
				break;
			default:
				setButtonText("Downloading!");
				setTimeout(() => setButtonText(name), 1000);
		}
	};

	return (
		<span className="track">
			<DownloadLink display={isDownload} src={src}>
				<button id={src} className={soundStyles.myButton} onClick={handlePress} title={artist}>
					{name}
				</button>
			</DownloadLink>
		</span>
	);
};

export default Sound;
