import React, { useState, useRef, useEffect } from "react";
import Sound from "../components/Sound";
import * as soundboardStyles from "../styles/soundboard.module.css";
import RadioButton from "../components/RadioButton";

export default function FilteredSoundList({ sounds }) {
	const searchInputRef = useRef(null);

	useEffect(() => {
		const handleKeyDown = (event) => {
			// Check if the pressed key is "s"
			if (event.key === "s" || event.key === "S") {
				// Check if the search input is not currently focused
				if (document.activeElement !== searchInputRef.current) {
					// Prevent the default action to avoid any unwanted behavior
					event.preventDefault();
					// Focus the search input
					searchInputRef.current.focus();
					// Scroll the search input into view
					searchInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
				}
				// If the search input is already focused, allow the user to type "s"
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const [query, setQuery] = useState("");
	const [action, setAction] = useState("play");

	sounds.sort((a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});

	const handleSearch = (event) => {
		console.log("handleSearch");
		setQuery(event.target.value);
	};
	const handlePlayChange = () => setAction("play");
	const handleDownloadChange = () => setAction("download");
	const handleClipboardChange = () => setAction("clipboard");

	const filteredSounds = sounds.filter((item) => {
		return (
			item.name.toLowerCase().includes(query.toLowerCase()) ||
			item.artist.toLowerCase().includes(query.toLowerCase())
		);
	});

	return (
		<>
			<div className={soundboardStyles.sbmenu}>
				<ul>
					<li>
						<input
							type="search"
							value={query}
							onChange={handleSearch}
							className={soundboardStyles.filter}
							placeholder="Search Sounds"
							ref={searchInputRef}
						/>
					</li>
				</ul>
				<ul>
					<li>
						<RadioButton label="Play" value={action === "play"} onChange={handlePlayChange} />
					</li>
					<li>
						<RadioButton
							label="Download"
							value={action === "download"}
							onChange={handleDownloadChange}
						/>
					</li>
					<li>
						<RadioButton
							label="Copy Link to Clipboard"
							value={action === "clipboard"}
							onChange={handleClipboardChange}
						/>
					</li>
				</ul>
				<ul>
					<li>
						<em>TIP: enter "s" to return to the search box</em>
					</li>
				</ul>
			</div>
			<div
				style={{
					display: "block",
					marginTop: "40px",
					clear: "both",
				}}
			>
				{filteredSounds.map((drop) => (
					<Sound
						src={drop.mp3}
						name={drop.name}
						artist={drop.artist}
						key={drop.mp3}
						action={action}
					/>
				))}
			</div>
		</>
	);
}
