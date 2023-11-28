<script>
	import WorkWithMe from "$lib/components/workWithMe.svelte";
	import Header from "$lib/components/header.svelte";

    import vscode from "$lib/assets/img/tools/vscode.svg";

    import html from "$lib/assets/img/tools/html.svg";
    import css from "$lib/assets/img/tools/css.svg";
    import js from "$lib/assets/img/tools/js.svg";
    import sass from "$lib/assets/img/tools/sass.svg";
    import svelte from "$lib/assets/img/tools/svelte.svg";
    import react from "$lib/assets/img/tools/react.svg";

    import pocketbase from "$lib/assets/img/tools/pocketbase.svg";
    import mariadb from "$lib/assets/img/tools/mariadb.svg";

    import netlify from "$lib/assets/img/tools/netlify.svg";
    import heroku from "$lib/assets/img/tools/heroku.svg";
    
    import python from "$lib/assets/img/tools/python.svg";
    import unity from "$lib/assets/img/tools/unity.svg";
    import flstudio from "$lib/assets/img/tools/flstudio.svg";
    import adobesuite from "$lib/assets/img/tools/adobesuite.svg";
	import TechCategory from "$lib/components/techCategory.svelte";
</script>
<Header>
    <h1>Hi! My name is <span>Johan</span>!</h1>
</Header>
<main>
    <section id="me">
        <h2>Who am I ?</h2>
        <p>My name is Flymeth! I'm {new Date().getFullYear() - 2005} years old, and I'm currently studying to become a full stack web developper.</p>
    </section>
    <section id="tech">
        <h2>What do I use ?</h2>
        <p>Here is the technologies I'm familiar with:</p>
        <ol>
            <li>
                <TechCategory name="IDE" icons={[vscode]}/>
            </li>
            <li>
                <TechCategory name="Web languages/frameworks" icons={[html, css, js, sass, svelte, react]}/>
            </li>
            <li>
                <TechCategory name="Database" icons={[pocketbase, mariadb]}/>
            </li>
            <li>
                <TechCategory name="Hosting" icons={[netlify, heroku]}/>
            </li>
            <li>
                <TechCategory name="Others" icons={[python, adobesuite, unity, flstudio]}/>
            </li>
        </ol>
    </section>

    <WorkWithMe />

    <section id="showoff">
        <h2>Some of my best projects</h2>
        <p>During my learning sessions, I was able to build different projects, more or less complex.</p>
        <p>So check out <a href="/portefolio">my portefolio</a> to discovering what I'm capable to.</p>
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
        }
    }
</style>