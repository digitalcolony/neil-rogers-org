export function setupMenu() {
	const hamburgerMenu = document.getElementById("hamburger-menu");
	const navList = document.querySelector("nav ul");

	if (hamburgerMenu && navList) {
		hamburgerMenu.addEventListener("click", () => {
			navList.classList.toggle("show");
		});

		// Close the menu when a link is clicked
		document.querySelectorAll("nav ul li a").forEach((link) => {
			link.addEventListener("click", () => {
				navList.classList.remove("show");
			});
		});

		// Close the menu when clicking outside of it
		document.addEventListener("click", (event) => {
			const isClickInsideNav =
				navList.contains(event.target) || hamburgerMenu.contains(event.target);
			if (!isClickInsideNav && navList.classList.contains("show")) {
				navList.classList.remove("show");
			}
		});
	}
}
