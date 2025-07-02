import React from "react";
import { usePWA } from "./PWAManager";
import styles from "../styles/offline-indicator.module.css";

export const OfflineIndicator: React.FC = () => {
	const { isOnline, isOfflineCapable } = usePWA();

	if (!isOfflineCapable) return null;

	return (
		<div className={`${styles.indicator} ${!isOnline ? styles.offline : styles.online}`}>
			<div className={styles.status}>
				<span className={styles.dot}></span>
				{isOnline ? "Online" : "Offline"}
			</div>
			{!isOnline && <div className={styles.message}>Limited content available offline</div>}
		</div>
	);
};
