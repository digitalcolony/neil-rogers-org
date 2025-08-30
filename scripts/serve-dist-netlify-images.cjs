#!/usr/bin/env node
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const DIST = path.join(__dirname, "..", "dist");
const PORT = process.env.PORT || 8080;

const mime = {
	".html": "text/html; charset=utf-8",
	".js": "application/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".svg": "image/svg+xml",
	".webp": "image/webp",
	".avif": "image/avif",
	".json": "application/json; charset=utf-8",
	".ico": "image/x-icon",
};

function sendFile(res, filePath) {
	fs.stat(filePath, (err, st) => {
		if (err || !st.isFile()) {
			res.statusCode = 404;
			res.end("Not found");
			return;
		}
		const ext = path.extname(filePath).toLowerCase();
		const type = mime[ext] || "application/octet-stream";
		res.setHeader("Content-Type", type);
		const stream = fs.createReadStream(filePath);
		stream.pipe(res);
		stream.on("error", () => {
			res.statusCode = 500;
			res.end("Server error");
		});
	});
}

http
	.createServer((req, res) => {
		const parsed = url.parse(req.url, true);

		if (parsed.pathname === "/.netlify/images") {
			const encoded = parsed.query.url || "";
			try {
				const decoded = decodeURIComponent(encoded);
				const rel = decoded.replace(/^\/+/, "");
				const filePath = path.join(DIST, rel);
				return sendFile(res, filePath);
			} catch (e) {
				res.statusCode = 400;
				return res.end("Bad request");
			}
		}

		let pathname = decodeURIComponent(parsed.pathname);
		if (pathname === "/") pathname = "/index.html";
		const filePath = path.join(DIST, pathname);

		if (!filePath.startsWith(DIST)) {
			res.statusCode = 403;
			return res.end("Forbidden");
		}

		fs.stat(filePath, (err, st) => {
			if (!err && st.isDirectory()) {
				return sendFile(res, path.join(filePath, "index.html"));
			}
			if (err) {
				res.statusCode = 404;
				res.end("Not found");
				return;
			}
			sendFile(res, filePath);
		});
	})
	.listen(PORT, () => {
		console.log(
			`Serving dist on http://localhost:${PORT} — rewrites /.netlify/images?url=... to files in dist`
		);
	});
