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
                status: "IPI Student",
                img: "https://static-cdn.jtvnw.net/jtv_user_pictures/68ea825a-b820-49db-96a8-3840ab51aec2-profile_image-70x70.png",
                link: "https://www.linkedin.com/in/th%C3%A9o-mistral-8597b6216/"
            },
            comment: "The sites are comprehensive and allow innovative interactions. The site is delivered quite quickly. I highly recommend Johan for the creation of your site."
        },
        {
            author: {
                name: "QUENTIN",
                status: "2nd year My Digital School Student",
                img: "/cdn/reviews/quentin.webp"
            },
            comment: "The coding work done by Johan JANIN is simply remarkable. His technical mastery and perseverance are reflected in his work, exceeding all expectations. His commitment to excellence makes him a key professional in the field, and his contribution deserves well-deserved recognition."
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
            window.location.href= "/eastereggs/shooter"
        })
    }
</script>

<svelte:head>
    <title>Johan JANIN</title>
    <meta name="title" content="Johan Janin" />
    <meta name="description" content="Hey! I'm Johan: a web development lover. I love doing front-end stuff as much as the back-end parts of a website." />
</svelte:head>

<Header>
    <h1>Hi! My name is <span>Johan</span>!</h1>
</Header>
<main>
    <section id="me">
        <h2>Who am I ?</h2>
        <p>My name is Johan! I'm {new Date().getFullYear() - 2005} years old, and I'm currently studying to become a full stack web developper.</p>
        <p>I love everything about the web developpement: from the simple HTML SEO optimisation and CSS styling to the server side logic such as authentification, database usage, API interactions, ...</p>
        <p>From the day I started coding, I created tons of projets, such as Discord music bot, Real time chat application, Creative front-end developpement, and so on!</p>
    </section>
    <section id="tech">
        <h2>What do I use ?</h2>
        <p>Here is the technologies I'm familiar with:</p>
        <ol>
            <li>
                <TechCategory name="IDE" icons={[vscode]}/>
            </li>
            <li>
                <TechCategory name="Web languages/frameworks" on:iconClicked={({detail: {icon}}) => {
                    if(icon === ts) return scriptingLang = js
                    if(icon === js) return enterEasterGame()
                }} icons={[html, css, scriptingLang, sass, svelte, react, nodejs]}/>
            </li>
            <li>
                <TechCategory name="Database" icons={[pocketbase, mariadb]}/>
            </li>
            <li>
                <TechCategory name="CMS Tools" icons={[wordpress, elementor]}/>
            </li>
            <li>
                <TechCategory name="Hosting" icons={[netlify, heroku]}/>
            </li>
            <li>
                <TechCategory name="Adobe Suite" icons={[photoshop, illustrator, premierepro, figma]}/>
            </li>
            <li>
                <TechCategory name="Others" icons={[python, unity, flstudio]} on:iconClicked={({detail: { icon }}) => {
                    if(icon === flstudio) goto("/discography")
                }}/>
            </li>
        </ol>
    </section>

    <WorkWithMe />

    <section id="showoff">
        <h2>Some of my best projects</h2>
        <p>During my learning sessions, I was able to build different projects, more or less complex.</p>
        <p>So check out <a href="/portfolio">my portfolio</a> to discovering what I'm capable to.</p>
    </section>

    <section id="hobbies">
        <h2>My Hobbies</h2>
        <p>During my free time, I love coding things, espacially in Javascript. But I like doing many other things, such as:</p>
        <ul>
            <li>
                Playing video games with my friends
                <ul>
                    <li>Minecraft</li>
                    <li>Rocket League</li>
                    <li>Others...</li>
                </ul>
            </li>
            <li>
                Go to parties
                <ul>
                    <li>At night clubs</li>
                    <li>Or in my/friends' house</li>
                    <li>And in my town with other teenagers</li>
                </ul>
            </li>
        </ul>
    </section>

    <section id="reviews">
        <h2>What they think about me</h2>
        {#if reviews.length}
            <Reviews list={ reviews }/>
        {:else}
            <p>This part of the website is still under construct.</p>
        {/if}
    </section>
</main>

<style lang="scss">
    main {
        padding: 15px 25px;
        @media screen and (max-width: 800px) {
            padding: 15px;
        }

        section {
            > h2 {
                margin: 20px 25px 10px;
            }
            > p:not([data-mobile] *) {
                &::before {
                    content: "<p>";
                    opacity: .25;
                    font-style: italic;
                    margin-right: 5px;
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
                        list-style: "> ";
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