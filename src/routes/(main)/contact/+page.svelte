<script lang="ts">
	import Header from "$lib/components/header.svelte";
	import NetlifyContactForm from "$lib/components/netlifyContactForm.svelte";

    import Fa from "svelte-fa";
    import { faEnvelope, faPager, faPhone, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
    import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

    const contactItems: {
        link: string,
        text: string,
        target?: boolean,
        icon: IconDefinition
    }[] = [
        {
            link: "mailto:johan.janin@gmail.com", text: "Par email", icon: faEnvelope
        },
        {
            link: "tel:+33782682332", text: "Via un appel", icon: faPhone
        },
        {
            link: "https://www.linkedin.com/in/johan-janin/", text: "Sur LinkedIn", icon: faLinkedin, target: true
        },
        {
            link: "/cv.pdf", text: "Voir mon CV", icon: faPager, target: true
        }
    ]
</script>

<svelte:head>
    <title>Prenons contact!</title>
    <meta name="title" content="Johan Janin - Prendre Contact" />
    <meta name="description" content="Vous souhaitez réaliser un projet? J'ai déjà hâte de travailler avec vous!" />
</svelte:head>

<Header>
    <h1>Prenons <span>contact</span> et travaillons <span>ensemble</span>!</h1>
    <p>J'ai déjà hâte de travailler avec vous!</p>
</Header>

<main>
    <section id="contact">
        <h2>Mes réseaux</h2>
        <ul>
            {#each contactItems as item}
                <li>
                    <a href={item.link} target={item.target ? "_blank" : null}>
                        <Fa icon={item.icon} size="20" />
                        <p>{item.text}</p>
                    </a>
                </li>
            {/each}
        </ul>
    </section>
    <hr>
    <section id="form">
        <h2>Contact rapide</h2>

        <NetlifyContactForm />
    </section>
</main>

<style lang="scss">
    main {
        display: grid;
        grid-template-columns: 45% auto 45%;
        padding: 0 25px;

        > hr {
            width: 0;
        }
        > div h2 {
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 25px;

            background: linear-gradient(to right, var(--foreground), var(--secondary) 75%, var(--foreground));
            background-size: 150px;
            animation: 5s bgAnimation infinite linear;

            -webkit-background-clip: text;
            -moz-background-clip: text;
            background-clip: text;

            color: transparent;
            text-shadow: 0 5px 10px var(--foreground);
            
            @keyframes bgAnimation {
                from {
                    background-position-x: 0;
                }
                to {
                    background-position-x: 300px;
                }
            }
        }

        @media screen and (max-width: 850px) {
            grid-template-columns: none;
            hr {
                width: 50%;
            }
        }

        > #contact > ul {
            $gap: 15px;
            margin-top: 25px;
            list-style: none;
            display: grid;
            width: 100%;
            grid-template-columns: repeat(2, calc(50% - $gap / 2));
            gap: $gap;
            padding: 0;

            > li {
                will-change: scale;
                transition: scale .25s;

                > a {
                    width: 100%;
                    height: 100px;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-evenly;
                    text-align: center;

                    background-color: var(--background);
                    padding: 15px;
                    border-radius: 5px;
                }

                &:hover {
                    scale: 1.02;
                }
            }
        }
    }
</style>
