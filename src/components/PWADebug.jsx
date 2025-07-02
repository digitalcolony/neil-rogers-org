import React from "react";
import { usePWA } from "./PWAManager";

const PWADebug = () => {
	const { isOnline, isOfflineCapable } = usePWA();

	return (
		<div
			style={{
				position: "fixed",
				top: "10px",
				right: "10px",
				background: "rgba(0,0,0,0.8)",
				color: "white",
				padding: "10px",
				borderRadius: "5px",
				fontSize: "12px",
				zIndex: 1000,
			}}
		>
			<div>Online: {isOnline ? "✅" : "❌"}</div>
			<div>PWA Capable: {isOfflineCapable ? "✅" : "❌"}</div>
			<div>
				Navigator Online:{" "}
				{typeof window !== "undefined" ? (navigator?.onLine ? "✅" : "❌") : "SSR"}
			</div>
		</div>
	);
};

export default PWADebug;
