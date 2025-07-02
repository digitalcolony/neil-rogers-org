import { PRIORITY_AUDIO_FILES } from "./pwa-config.js";

export class PWAInstaller {
	static async registerServiceWorker() {
		if ("serviceWorker" in navigator) {
			try {
				const registration = await navigator.serviceWorker.register("/sw.js");
				console.log("SW registered: ", registration);

				// Handle updates
				registration.addEventListener("updatefound", () => {
					const newWorker = registration.installing;
					newWorker?.addEventListener("statechange", () => {
						if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
							// New content is available, show update notification
							this.showUpdateNotification();
						}
					});
				});

				return registration;
			} catch (error) {
				console.log("SW registration failed: ", error);
			}
		}
	}

	static async cacheFirstAudioFiles() {
		if (!("caches" in window)) return false;

		try {
			const cache = await caches.open("soundboard-audio-v1");
			const cachePromises = PRIORITY_AUDIO_FILES.slice(0, 20).map(async (audioUrl) => {
				try {
					// Check if already cached
					const cachedResponse = await cache.match(audioUrl);
					if (cachedResponse) return true;

					// Fetch and cache
					const response = await fetch(audioUrl);
					if (response.ok) {
						await cache.put(audioUrl, response);
						return true;
					}
					return false;
				} catch (error) {
					console.warn(`Failed to cache ${audioUrl}:`, error);
					return false;
				}
			});

			const results = await Promise.allSettled(cachePromises);
			const successCount = results.filter(
				(result) => result.status === "fulfilled" && result.value
			).length;

			console.log(
				`Successfully cached ${successCount}/${PRIORITY_AUDIO_FILES.length} priority audio files`
			);
			return successCount;
		} catch (error) {
			console.error("Failed to cache priority audio files:", error);
			return 0;
		}
	}

	static showUpdateNotification() {
		// Create a simple notification for PWA updates
		if ("Notification" in window && Notification.permission === "granted") {
			new Notification("Neil Rogers Soundboard", {
				body: "New content is available! Refresh to update.",
				icon: "/android-chrome-192x192.png",
				tag: "pwa-update",
			});
		} else {
			// Fallback to console or custom UI notification
			console.log("New PWA content available! Consider refreshing.");
		}
	}

	static async checkInstallPrompt() {
		// This will be set by the beforeinstallprompt event
		if (window.deferredPrompt) {
			return window.deferredPrompt;
		}
		return null;
	}

	static async installPWA() {
		const prompt = await this.checkInstallPrompt();
		if (prompt) {
			prompt.prompt();
			const result = await prompt.userChoice;
			window.deferredPrompt = null;
			return result.outcome === "accepted";
		}
		return false;
	}
}
