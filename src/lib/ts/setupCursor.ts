import gsap from "gsap";

const clickableElementsNames = ["A", "BUTTON", "INPUT", "TEXTAREA", "OPTION"];
const disableCursorElementsNames = ["EMBED", "IFRAME"];

export function onCursorMouve({ clientX, clientY, target }: MouseEvent) {
  let clickableElement: HTMLElement | SVGElement | null = null;

  while (target instanceof HTMLElement || target instanceof SVGElement) {
    if (target.classList.contains("disabled-cursor-action")) {
      break;
    } else if (
      clickableElementsNames.includes(target.nodeName) ||
      target.classList.contains("cursor-action") ||
      (target.nodeName === "IMG" && target.classList.contains("img-display"))
    ) {
      clickableElement = target;
      break;
    } else if (disableCursorElementsNames.includes(target.nodeName)) {
      gsap.to(document.body, {
        "--cursor-opacity": 0,
        ease: "power4.out",
      });
      return;
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
}

export default function setupCursor() {
  window.removeEventListener("mousemove", onCursorMouve);
  window.addEventListener("mousemove", onCursorMouve);
}
