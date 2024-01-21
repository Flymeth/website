<footer>
    <h2>Te voici en bas de page!</h2>
    <p>
        <a href="#top" on:click|preventDefault={() => (
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        )}>Envie de remonter la page ?</a>
    </p>

    <h3>Socials</h3>
    <ul>
        <li><a href="https://github.com/Flymeth" target="_blank">Mes projets (github)</a></li>
        <li><a href="https://flymeth.net" target="_blank">Mon deuxième site</a></li>
    </ul>
</footer>

<style lang="scss">
    footer {
        $transition-size: 25px;
        position: relative;
        background-color: var(--background);
        margin-top: $transition-size + 15px;
        padding: 15px;
        padding-bottom: 50px;

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

        > h3 {
            margin-top: 15px;
        }
    }
</style>