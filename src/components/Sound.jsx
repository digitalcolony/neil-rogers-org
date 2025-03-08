import React, { useState } from "react";
import * as soundStyles from "../styles/sound.module.css";
import DownloadLink from "./DownloadLink";

const Sound = ({ artist, src, name, action }) => {
	const [buttonText, setButtonText] = useState(name);
	const isDownload = action === "download";
	const handlePress = () => {
		switch (action) {
			case "play":
				const sound = new Audio(src);
				sound.play();
				break;
			case "clipboard":
				let clipboardText = name;
				if (artist) {
					clipboardText += `\n${artist}`;
				}
				clipboardText += `\nhttps://neilrogers.org${src}`;
				navigator.clipboard.writeText(clipboardText);
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
					{buttonText}
				</button>
			</DownloadLink>
		</span>
	);
};

export default Sound;
