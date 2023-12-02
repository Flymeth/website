<script>
	import Header from "$lib/components/header.svelte";

</script>
<Header>
    <h1>I'm the <span>best</span> for your next project!</h1>
    <p>I can be the one who make your project better!</p>
</Header>

<main>
    <div class="contact">
        <h2>Contact me directly</h2>
        <ul>
            <li><a href="mailto:johan.janin@gmail.com">By mail</a></li>
            <li><a href="tel:+33782682332">With a call</a></li>
        </ul>
    </div>
    <hr>
    <div class="form">
        <h2>Or send me what you're looking for</h2>

        <form action="netlify" data-netlify>
            <input type="hidden" name="form-name" value="customers">
    
            <fieldset >
                <legend>Who your are</legend>
                <label for="name">
                    <input type="text" name="name" id="name" placeholder="Your name" required>
                </label>
                <label for="lastname">
                    <input type="text" name="lastname" id="lastname" placeholder="Your lastname" required>
                </label>
            </fieldset>
    
            <fieldset>
                <legend>What if I need to contact you back</legend>
    
                <label for="email">
                    <input type="email" name="email" id="email" required>
                </label>
                <label for="phone">
                    <input type="tel" name="phone" id="phone">
                </label>
            </fieldset>
    
            <fieldset>
                <legend>Your project</legend>
    
                <label for="project">
                    <input type="text" name="project" id="project" placeholder="Subject" required>
                </label>
                <label for="description">
                    <textarea name="description" id="description" cols="30" rows="10"></textarea>
                </label>
            </fieldset>
    
        </form>
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
    }
</style>
