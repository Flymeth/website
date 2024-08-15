import gsap from "gsap";

const clickableElementsNames = ["A", "BUTTON", "INPUT", "TEXTAREA", "OPTION"];

export default function setupCursor() {
	window.onmousemove = ({ clientX, clientY, target }) => {
		let clickableElement: HTMLElement | SVGElement | null = null;

		while (target instanceof HTMLElement || target instanceof SVGElement) {

			if (target.classList.contains("disabled-cursor-action")) {
				break;
			} else if (
				clickableElementsNames.includes(target.nodeName) ||
				target.classList.contains("cursor-action") ||
				(target.nodeName === "IMG" &&
					target.classList.contains("img-display"))
			) {
				clickableElement = target;
				break;
			}

			target = target.parentElement;
		}

		const scale = clickableElement ? 1.5 : 1;
		gsap.to(document.body, {
			"--cursor-x": clientX + "px",
			"--cursor-y": clientY + "px",
			"--cursor-scale": scale,
			"--cursor-opacity": 0.75,
			duration: 0.25,
			ease: "power1.out",
		});
		document.body.style.setProperty("--cursor-cx", clientX + "px");
		document.body.style.setProperty("--cursor-cy", clientY + "px");
	};
}
