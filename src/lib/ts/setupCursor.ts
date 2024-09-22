import gsap from "gsap";

const clickableElementsNames = ["A", "BUTTON", "INPUT", "TEXTAREA", "OPTION"];
const disableCursorElementsNames = ["EMBED", "IFRAME"];

export function onCursorMove({ clientX, clientY, target }: MouseEvent) {
  if (!useCustomCursor()) return;
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

export function useCustomCursor<
  ARG0 extends boolean | undefined,
  R = ARG0 extends undefined ? boolean : null
>(use?: ARG0, save = true): R {
  if (typeof use === "undefined") {
    const use = window.localStorage.getItem("cursor") === "custom";
    useCustomCursor(use, false);
    return use as R;
  }
  
  if (!use) {
    document.body.setAttribute("data-nocursor", "");
    if (save) window.localStorage.removeItem("cursor");
  } else {
    document.body.removeAttribute("data-nocursor");
    if (save) window.localStorage.setItem("cursor", "custom");
  }
  return null as R;
}

export default function setupCursor() {
  window.removeEventListener("mousemove", onCursorMove);
  window.addEventListener("mousemove", onCursorMove);
}
