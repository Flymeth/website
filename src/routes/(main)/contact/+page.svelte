<script lang="ts">
	import Header from "$lib/components/header.svelte";
	import NetlifyContactForm from "$lib/components/netlifyContactForm.svelte";
</script>
<Header>
    <h1>I'm the <span>best</span> for your next project!</h1>
    <p>I can be the one who make your project better!</p>
</Header>

<main>
    <div id="contact">
        <h2>Contact me directly</h2>
        <ul>
            <li><a href="mailto:johan.janin@gmail.com">By mail (johan.janin@gmail.com)</a></li>
            <li><a href="tel:+33782682332">With a call (+33 07.82.68.23.32)</a></li>
        </ul>
    </div>
    <hr>
    <div id="form">
        <h2>Or send me what you're looking for</h2>

        <NetlifyContactForm />
    </div>
    
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
    }
</style>
