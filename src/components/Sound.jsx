import React, { useState, useEffect } from "react";
import * as soundStyles from "../styles/sound.module.css";
import DownloadLink from "./DownloadLink";
import { usePWA } from "./PWAManager";

const Sound = ({ artist, src, name, action }) => {
	const [buttonText, setButtonText] = useState(name);
	const [isCached, setIsCached] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { isOnline, cacheAudioFile, isAudioCached } = usePWA();
	const isDownload = action === "download";

	// Log only when a button is unexpectedly disabled (for debugging)
	const disabledState = isLoading || (!isOnline && !isCached && action === "play");
	if (disabledState && !isLoading) {
		console.log(`Sound "${name}" disabled - offline and not cached`, {
			isOnline,
			isCached,
			action,
			src,
		});
	}

	useEffect(() => {
		const checkCacheStatus = async () => {
			const cached = await isAudioCached(src);
			setIsCached(cached);
		};
		checkCacheStatus();
	}, [src, isAudioCached]);

	const handlePress = async () => {
		// Early return if button should be disabled
		if (isLoading || (!isOnline && !isCached && action === "play")) {
			console.log(`Prevented action: isOnline=${isOnline}, isCached=${isCached}, action=${action}`);
			return;
		}

		switch (action) {
			case "play":
				setIsLoading(true);
				setButtonText("Loading...");

				try {
					let audioSrc = src;

					// If offline and cached, try to get the audio from cache explicitly
					if (!isOnline && isCached) {
						try {
							const cache = await caches.open("audio-cache");
							const cachedResponse = await cache.match(src);
							if (cachedResponse) {
								const blob = await cachedResponse.blob();
								audioSrc = URL.createObjectURL(blob);
								console.log("Using cached audio blob for offline playback");
							}
						} catch (cacheError) {
							console.warn("Failed to load from cache, trying original URL:", cacheError);
						}
					}

					const sound = new Audio(audioSrc);

					sound.addEventListener("error", (e) => {
						console.error("Audio load error:", e.target.error);
						setIsLoading(false);

						// Clean up blob URL if we created one
						if (audioSrc !== src && audioSrc.startsWith("blob:")) {
							URL.revokeObjectURL(audioSrc);
						}

						// Better error handling for offline scenarios
						if (!isOnline && !isCached) {
							setButtonText("Offline - not cached");
						} else if (e.target.error && e.target.error.code === 4) {
							setButtonText("Audio format not supported");
						} else {
							setButtonText("Failed to load");
						}
						setTimeout(() => setButtonText(name), 3000);
					});

					// Try to cache if online (but don't wait for it)
					if (isOnline && !isCached) {
						cacheAudioFile(src)
							.then((cached) => {
								if (cached) setIsCached(true);
							})
							.catch((err) => console.warn("Cache failed:", err));
					}

					// Use promise-based play for better error handling
					const playPromise = sound.play();

					if (playPromise !== undefined) {
						playPromise
							.then(() => {
								// Reset button text back to original name and mark as not loading
								setButtonText(name);
								setIsLoading(false);

								// Reset any temporary states when audio ends
								sound.addEventListener("ended", () => {
									// Clean up blob URL if we created one
									if (audioSrc !== src && audioSrc.startsWith("blob:")) {
										URL.revokeObjectURL(audioSrc);
									}
								});
							})
							.catch((error) => {
								console.error("Play failed:", error);
								setIsLoading(false);

								// Clean up blob URL if we created one
								if (audioSrc !== src && audioSrc.startsWith("blob:")) {
									URL.revokeObjectURL(audioSrc);
								}

								if (error.name === "NotAllowedError") {
									setButtonText("Click to enable audio");
								} else if (error.name === "NotSupportedError") {
									setButtonText("Audio format not supported");
								} else if (!isOnline && !isCached) {
									setButtonText("Offline - not cached");
								} else if (error.name === "NetworkError" || error.message.includes("network")) {
									setButtonText("Network error");
								} else {
									setButtonText("Play failed");
								}
								setTimeout(() => setButtonText(name), 4000);
							});
					} else {
						// Fallback for older browsers
						setButtonText(name);
						setIsLoading(false);
					}
				} catch (error) {
					console.error("Failed to create audio:", error);

					// Clean up blob URL if we created one
					if (audioSrc !== src && audioSrc.startsWith("blob:")) {
						URL.revokeObjectURL(audioSrc);
					}

					setButtonText("Audio error: " + error.message);
					setIsLoading(false);
					setTimeout(() => setButtonText(name), 3000);
				}
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
				if (!isOnline) {
					setButtonText("Download unavailable offline");
					setTimeout(() => setButtonText(name), 2000);
				} else {
					setButtonText("Downloading!");
					setTimeout(() => setButtonText(name), 1000);
				}
		}
	};

	return (
		<span className="track">
			<DownloadLink display={isDownload} src={src}>
				<button
					id={src}
					className={`${soundStyles.myButton} ${isCached ? soundStyles.cached : ""} ${
						!isOnline && !isCached ? soundStyles.unavailable : ""
					}`}
					onClick={handlePress}
					title={`${artist}${isCached ? " (Cached for offline)" : ""}`}
					disabled={isLoading || (!isOnline && !isCached && action === "play")}
				>
					{isLoading ? "⏳" : isCached ? "📱 " : ""}
					{buttonText}
				</button>
			</DownloadLink>
		</span>
	);
};

export default Sound;
