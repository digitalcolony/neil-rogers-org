import React, { useEffect, useState } from "react";

interface PWAManagerProps {
	children: React.ReactNode;
}

export interface PWAContext {
	isOnline: boolean;
	isOfflineCapable: boolean;
	cacheAudioFile: (url: string) => Promise<boolean>;
	isAudioCached: (url: string) => Promise<boolean>;
	getCachedAudioUrls: () => Promise<string[]>;
}

export const PWAContext = React.createContext<PWAContext | null>(null);

export const PWAManager: React.FC<PWAManagerProps> = ({ children }) => {
	// Handle SSR where navigator might not be available
	const [isOnline, setIsOnline] = useState(() => {
		if (typeof window !== "undefined" && navigator?.onLine !== undefined) {
			return navigator.onLine;
		}
		return true; // Default to online during SSR
	});
	const [isOfflineCapable, setIsOfflineCapable] = useState(false);

	useEffect(() => {
		// Set the correct online state once we're on the client
		if (typeof window !== "undefined") {
			setIsOnline(navigator?.onLine ?? true);
		}

		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);

		if (typeof window !== "undefined") {
			window.addEventListener("online", handleOnline);
			window.addEventListener("offline", handleOffline);

			// Check if service worker is available
			if ("serviceWorker" in navigator) {
				setIsOfflineCapable(true);
			}
		}

		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("online", handleOnline);
				window.removeEventListener("offline", handleOffline);
			}
		};
	}, []);

	const cacheAudioFile = async (url: string): Promise<boolean> => {
		try {
			if (!("caches" in window)) return false;

			const cache = await caches.open("audio-cache");
			const response = await fetch(url);

			if (response.ok) {
				await cache.put(url, response);
				return true;
			}
			return false;
		} catch (error) {
			console.error("Failed to cache audio file:", error);
			return false;
		}
	};

	const isAudioCached = async (url: string): Promise<boolean> => {
		try {
			if (!("caches" in window)) return false;

			const cache = await caches.open("audio-cache");
			const response = await cache.match(url);
			return !!response;
		} catch (error) {
			console.error("Failed to check audio cache:", error);
			return false;
		}
	};

	const getCachedAudioUrls = async (): Promise<string[]> => {
		try {
			if (!("caches" in window)) return [];

			const cache = await caches.open("audio-cache");
			const requests = await cache.keys();
			return requests.map((request) => request.url);
		} catch (error) {
			console.error("Failed to get cached audio URLs:", error);
			return [];
		}
	};

	const contextValue: PWAContext = {
		isOnline,
		isOfflineCapable,
		cacheAudioFile,
		isAudioCached,
		getCachedAudioUrls,
	};

	return <PWAContext.Provider value={contextValue}>{children}</PWAContext.Provider>;
};

export const usePWA = (): PWAContext => {
	const context = React.useContext(PWAContext);
	if (!context) {
		throw new Error("usePWA must be used within a PWAManager");
	}
	return context;
};
