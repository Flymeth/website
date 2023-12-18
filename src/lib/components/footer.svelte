<footer>
    <h2>Congratulation! You reached the bottom!</h2>
    <p>
        <a href="#top" on:click|preventDefault={() => (
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        )}>Wanna go back to the top ?</a>
    </p>

    <h3>Socials</h3>
    <ul>
        <li><a href="https://flymeth.net" target="_blank">My other website</a></li>
        <li><a href="https://github.com/Flymeth" target="_blank">See my github's projects</a></li>
        <li><a href="https://github.com/Flymeth/website" target="_blank">Want to know how I built this website ?</a></li>
    </ul>
</footer>

<style lang="scss">
    footer {
        $transition-size: 25px;
        position: relative;
        background-color: var(--background);
        margin-top: $transition-size + 15px;
        min-height: 50vh;
        padding: 15px;

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