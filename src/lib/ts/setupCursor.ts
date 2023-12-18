import gsap from "gsap"

const clickableElementsNames = [
    "A",
    "BUTTON",
    "INPUT",
    "TEXTAREA",
    "OPTION"
]

export default function setupCursor() {
    window.onmousemove = ({clientX, clientY}) => {
        const hoveringElements = Array.from(document.querySelectorAll(":hover"))
        const onClickableElement = hoveringElements.find(e => (
            clickableElementsNames.includes(e.nodeName)
        ))
        const scale = onClickableElement ? 1.5 : 1
        gsap.to(document.body, {
            "--cursor-x": clientX + "px",
            "--cursor-y": clientY + "px",
            "--cursor-scale": scale, 
            "--cursor-opacity": .75,
            duration: .25,
            ease: "power1.out"
        })
    }
}