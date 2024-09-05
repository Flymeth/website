<footer>
    <h2>Te voici en bas de page!</h2>
    <p>
        <a href="?" on:click|preventDefault={() => (
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        )}>Envie de remonter la page ?</a>
    </p>
    <div>
        <section>
            <h3>Me retrouver</h3>
            <ul>
                <li><a href="https://github.com/Flymeth" target="_blank">Mes projets (github)</a></li>
                <li><a href="https://flymeth.is-a.dev" target="_blank">Mon site secondaire</a></li>
                <li><a href="https://www.linkedin.com/in/johan-janin/" target="_blank">LinkedIn</a></li>
            </ul>
        </section>
        <section>
            <h3>Me contacter</h3>
            <ul>
                <li><a href="/contact">Formulaire et liens</a></li>
                <li><a href="mailto:johan.janin@gmail.com">Email</a></li>
            </ul>
        </section>
        <section>
            <h3>Autre</h3>
            <ul>
                <li><a href="/law/mentions-legales">Mentions Légales</a></li>
                <li><a href="https://github.com/Flymeth/website" target="_blank">Code source du site</a></li>
            </ul>
        </section>
    </div>
</footer>

<style lang="scss">
    footer {
        $transition-size: 25px;
        position: relative;
        background-color: var(--background);
        margin-top: $transition-size + 15px;
        padding: 15px;
        padding-bottom: 50px;
        box-shadow: 0 0 10px var(--foreground);

        &::before {
            content: "";
            position: absolute;
            bottom: 100%;
            left: 0;
            width: 100%;
            height: $transition-size;

            background: linear-gradient(to bottom, transparent, var(--background));
        }

        > h2, > p {
            text-align: center;
            margin: 5px 0;
        }

        > div {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            flex-wrap: wrap;
            gap: 15px;

            > section {
                padding: 0 15px;
                > h3 {
                    margin-top: 15px;
                    text-align: center;
                    margin-bottom: 10px;
                    text-decoration: underline;
                }
            }
        }

    }
</style>