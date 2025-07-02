// Priority audio files for offline caching (first 20 most popular/important drops)
export const PRIORITY_AUDIO_FILES = [
	"/sounds/1-to-12-hour.mp3",
	"/sounds/2-of-the-Dumbest-White-Men.mp3",
	"/sounds/A-Lot-of-Spooks-in-New-Jersey.mp3",
	"/sounds/A-Stench-of-Cow-Manure.mp3",
	"/sounds/A-lot-of-masturbation-went-on.mp3",
	"/sounds/About-30-man.mp3",
	"/sounds/Absolutely.mp3",
	"/sounds/Absolutely-Correct-Sir.mp3",
	"/sounds/All-the-Crap.mp3",
	"/sounds/Another-break-already_Q.mp3",
	"/sounds/Anybody-have-a-heart-or-a-liver.mp3",
	"/sounds/Are-You-Sure.mp3",
	"/sounds/Asking-Marino.mp3",
	"/sounds/Awright.mp3",
	"/sounds/Ayayayayayayayay!.mp3",
	"/sounds/Ayy-Papa-Juan-Pablo.mp3",
	"/sounds/Basta-Del-Chupeteo.mp3",
	"/sounds/Beware-of-Exploding-Balls.mp3",
	"/sounds/Big-O-Jingle.mp3",
	"/sounds/Bop-Bop-Bop.mp3",
];

export const CACHE_NAMES = {
	AUDIO: "soundboard-audio-v1",
	PAGES: "pages-cache-v1",
	IMAGES: "images-cache-v1",
	STATIC: "static-cache-v1",
};

export const CACHE_STRATEGIES = {
	AUDIO_CACHE_FIRST: "audio-cache-first",
	PAGE_NETWORK_FIRST: "page-network-first",
	IMAGE_CACHE_FIRST: "image-cache-first",
};
