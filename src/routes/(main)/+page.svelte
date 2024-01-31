<script lang="ts">
	import WorkWithMe from "$lib/components/workWithMe.svelte";
	import Header from "$lib/components/header.svelte";

    import vscode from "$lib/assets/img/tools/vscode.svg";

    import html from "$lib/assets/img/tools/html.svg";
    import css from "$lib/assets/img/tools/css.svg";
    import js from "$lib/assets/img/tools/javascript.svg";
    import ts from "$lib/assets/img/tools/typescript.svg";
    let scriptingLang = ts
    import sass from "$lib/assets/img/tools/sass.svg";
    import svelte from "$lib/assets/img/tools/svelte.svg";
    import react from "$lib/assets/img/tools/react.svg";
    import nodejs from "$lib/assets/img/tools/nodejs.svg";

    import pocketbase from "$lib/assets/img/tools/pocketbase.svg";
    import mariadb from "$lib/assets/img/tools/mariadb.svg";

    import netlify from "$lib/assets/img/tools/netlify.svg";
    import heroku from "$lib/assets/img/tools/heroku.svg";

    import wordpress from "$lib/assets/img/tools/wordpress.svg";
    import elementor from "$lib/assets/img/tools/elementor.svg";

    import photoshop from "$lib/assets/img/tools/photoshop.svg";
    import illustrator from "$lib/assets/img/tools/illustrator.svg";
    import premierepro from "$lib/assets/img/tools/premierepro.svg";
    import figma from "$lib/assets/img/tools/figma.svg";
    
    import python from "$lib/assets/img/tools/python.svg";
    import unity from "$lib/assets/img/tools/unity.svg";
    import flstudio from "$lib/assets/img/tools/flstudio.svg";
	import TechCategory from "$lib/components/techCategory.svelte";

    import gsap from "gsap";
	import { goto } from "$app/navigation";
	import Reviews, { type Review } from "$lib/components/reviews.svelte";

    const reviews: Review[] = [
        {
            author: {
                name: "Théo MISTRAL",
                status: "Etudiant IPI",
                img: "https://static-cdn.jtvnw.net/jtv_user_pictures/68ea825a-b820-49db-96a8-3840ab51aec2-profile_image-70x70.png",
                link: "https://www.linkedin.com/in/th%C3%A9o-mistral-8597b6216/"
            },
            comment: "Les sites sont complets et permettent des interactions innovantes. Le site est livré assez rapidement. Je recommande vivement Johan pour la création de votre site."
        },
        {
            author: {
                name: "QUENTIN",
                status: "Etudiant My Digital School",
                img: "/cdn/reviews/quentin.webp"
            },
            comment: "Le travail de codage effectué par Johan JANIN est tout simplement remarquable. Sa maîtrise technique et sa persévérance se reflètent dans son travail, dépassant toutes les attentes. Son engagement envers l’excellence fait de lui un professionnel incontournable dans le domaine et sa contribution mérite une reconnaissance bien méritée."
        },
        {
            author: {
                name: "Loris RODRIGUES",
                status: "Etudiant My Digital School",
                img: "/cdn/reviews/loris_r.webp",
                link: "https://www.linkedin.com/in/loris-rodrigues/"
            },
            comment: "Je recommande fortement Johan JANIN pour le développement Full-Stack."
        }
    ]

    function enterEasterGame() {
        const tm = gsap.timeline()
        tm.to(document.body, {
            opacity: 0,
            "--cursor-scale": 50,
            duration: 1.25,
            ease: "power1.inOut"
        })
        .to(document.body.children[0], {
            opacity: 0,
            duration: 2,
            ease: "power1.inOut"
        }, "<")
        
        .then(() => {
            // The entire page needs to be reloaded...
            window.location.href= "/eastereggs/jumper"
        })
    }
</script>

<svelte:head>
    <title>Johan JANIN</title>
    <meta name="title" content="Johan Janin" />
    <meta name="description" content="Salut! Moi c'est Johan: un passionné du digital spécialisé dans le développement web." />
    <meta property="og:image" content="/icons/logo_256.png" />

    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:domain" content="johan-janin.com">
    <meta property="twitter:url" content="https://johan-janin.com">
    <meta name="twitter:title" content="Johan Janin">
    <meta name="twitter:description" content="Salut! Moi c'est Johan: un passionné du digital spécialisé dans le développement web.">
    <meta name="twitter:image" content="/icons/logo_256.png">
</svelte:head>

<Header>
    <h1>En quête d'un <span>développeur full-stack</span>?</h1>
    <p>Je suis Johan: un expert dans la création web.</p>
</Header>
<main>
    <section id="me">
        <h2>Je me présente</h2>
        <p>Je m'appelle Johan, j'ai {new Date().getFullYear() - 2005} ans, et je suis étudiant en digital.</p>
        <p>Depuis plus de 4 ans je suis passionné par le monde du digital. Que ce soit dans la création d'identité visuelle, de conception/création web, référrencement et développement web, je suis dévoué à ma tâche afin de pouvoir proposer un résulta digne de mes compétences à mes clients.</p>
        <p>Avec la création de projets comme des applications de messagerie instantanées, de robot discord ou de sites e-commerce, je possède aujourd'hui des compétences solides en terme de développement web.</p>
    </section>
    <section id="tech">
        <h2>Mes outils</h2>
        <p>Voici ce que j'utilise au quotidient afin de réaliser mes projets:</p>
        <ol>
            <li>
                <TechCategory name="Logiciels de développement" icons={[vscode]}/>
            </li>
            <li>
                <TechCategory name="Langage de programmation/frameworks" on:iconClicked={({detail: {icon}}) => {
                    if(icon === ts) return scriptingLang = js
                    if(icon === js) return enterEasterGame()
                }} icons={[html, css, scriptingLang, sass, svelte, react, nodejs]}/>
            </li>
            <li>
                <TechCategory name="Bases de données" icons={[pocketbase, mariadb]}/>
            </li>
            <li>
                <TechCategory name="CMS & Outils" icons={[wordpress, elementor]}/>
            </li>
            <li>
                <TechCategory name="Hébergement" icons={[netlify, heroku]}/>
            </li>
            <li>
                <TechCategory name="Suite Adobe" icons={[photoshop, illustrator, premierepro, figma]}/>
            </li>
            <li>
                <TechCategory name="Autres" icons={[python, unity, flstudio]} on:iconClicked={({detail: { icon }}) => {
                    if(icon === flstudio) goto("/discography")
                }}/>
            </li>
        </ol>
    </section>

    <WorkWithMe />

    <section id="showoff">
        <h2>Mes projets</h2>
        <p>Que ce soit pour mes études ou par passe-temps personnel, j'ai réalisé de nombreux projets dont les meilleurs sont répertoriés sur <a href="/portfolio">mon portfolio</a>.</p>
    </section>

    <section id="hobbies">
        <h2>Mes passe-temps</h2>
        <p>Certes le monde du digital est une passion chez moi, mais cela ne veut pas dire que je ne fais que cela durant mon temps libre.</p>
        <ul>
            <li>
                J'aime jouer au jeux-vidéos avec mes amis
                <ul>
                    <li>Minecraft</li>
                    <li>Rocket League</li>
                    <li>Jeux d'arcades</li>
                </ul>
            </li>
            <li>
                Sortir
                <ul>
                    <li>Passer du temps avec mes amis</li>
                    <li>Ou ma famille</li>
                </ul>
            </li>
        </ul>
    </section>

    <section id="reviews">
        <h2>Ce qu'ils disent de mon travail</h2>
        <Reviews list={ reviews }/>
    </section>
</main>

<style lang="scss">
    main {
        padding: 15px 45px;
        @media screen and (max-width: 800px) {
            padding: 15px;
        }

        section {
            > h2 {
                margin: 20px 25px 10px;
            }
            > p:not([data-mobile] *) {
                position: relative;
                margin: 10px 0;
                margin-left: 30px;

                &::before {
                    content: "<p>";
                    opacity: .25;
                    font-style: italic;
                    position: absolute;
                    right: calc(100% + 5px);
                    top: 0;
                }
                &::after {
                    content: "</p>";
                    opacity: .25;
                    font-style: italic;
                    margin-left: 5px;
                }
            }

            &#tech ol {
                list-style: none;
                margin-top: 20px;
                > li {
                    padding: 20px 0;
                    position: relative;
                    &:not(:last-of-type)::before {
                        content: "";
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        translate: -50% -50%;

                        width: 25%;
                        height: 2px;
                        border-radius: 999px;

                        background-color: var(--primary);
                    }
                }
            }

            &#hobbies > ul {
                margin: 15px;
                > li {
                    margin: 15px 0;
                    > ul {
                        list-style: "+ ";
                    }
                }
            }

            &#reviews {
                margin: 30px 0;
                > h2 {
                    margin-bottom: 15px;
                }
            }
        }
    }
</style>