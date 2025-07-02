import React, { useState, useEffect } from "react";
import { PWAInstaller } from "../utils/pwa-installer.js";
import styles from "../styles/install-prompt.module.css";

export const InstallPrompt: React.FC = () => {
	const [showPrompt, setShowPrompt] = useState(false);
	const [isInstalling, setIsInstalling] = useState(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			// Store the event for later use
			(window as any).deferredPrompt = e;
			setShowPrompt(true);
		};

		const handleAppInstalled = () => {
			setShowPrompt(false);
			console.log("PWA was installed");
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		window.addEventListener("appinstalled", handleAppInstalled);

		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
			window.removeEventListener("appinstalled", handleAppInstalled);
		};
	}, []);

	const handleInstall = async () => {
		setIsInstalling(true);
		try {
			const installed = await PWAInstaller.installPWA();
			if (installed) {
				setShowPrompt(false);
			}
		} catch (error) {
			console.error("Failed to install PWA:", error);
		} finally {
			setIsInstalling(false);
		}
	};

	const handleDismiss = () => {
		setShowPrompt(false);
	};

	if (!showPrompt) return null;

	return (
		<div className={styles.installPrompt}>
			<div className={styles.content}>
				<div className={styles.icon}>📱</div>
				<div className={styles.text}>
					<h3>Install Neil Rogers Soundboard</h3>
					<p>Get offline access to your favorite drops and install as an app!</p>
				</div>
				<div className={styles.actions}>
					<button className={styles.installButton} onClick={handleInstall} disabled={isInstalling}>
						{isInstalling ? "Installing..." : "Install"}
					</button>
					<button className={styles.dismissButton} onClick={handleDismiss}>
						Maybe Later
					</button>
				</div>
			</div>
		</div>
	);
};
