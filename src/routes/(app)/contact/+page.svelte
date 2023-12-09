<script>
	import Header from "$lib/components/header.svelte";

</script>
<Header>
    <h1>I'm the <span>best</span> for your next project!</h1>
    <p>I can be the one who make your project better!</p>
</Header>

<main>
    <div id="contact">
        <h2>Contact me directly</h2>
        <ul>
            <li><a href="mailto:johan.janin@gmail.com">By mail</a></li>
            <li><a href="tel:+33782682332">With a call</a></li>
        </ul>
    </div>
    <hr>
    <div id="form">
        <h2>Or send me what you're looking for</h2>

        <form data-netlify="true" method="post">
            <input type="hidden" name="form-name" value="customers">
    
            <fieldset id="person">
                <legend>Who you are</legend>
                <label for="name">
                    <input type="text" name="name" id="name" placeholder="Your name" required>
                </label>
                <label for="lastname">
                    <input type="text" name="lastname" id="lastname" placeholder="Your lastname" required>
                </label>
            </fieldset>
    
            <fieldset id="contact">
                <legend>What if I need to contact you back</legend>
    
                <label for="email">
                    Your mail address
                    <input type="email" name="email" placeholder="mail.exemple@service.domain" id="email" required>
                </label>
                <label for="phone">
                    Your phone number
                    <input type="tel" name="phone" placeholder="0123456789" id="phone">
                </label>
            </fieldset>
    
            <fieldset id="subject">
                <legend>Your project</legend>
    
                <label for="project">
                    <input type="text" name="project" id="project" placeholder="Subject" required>
                </label>
                <label for="description">
                    <textarea name="description" id="description" cols="30" rows="10" placeholder="Description" required></textarea>
                </label>
            </fieldset>
            
            <button type="submit" class="primary-color">Take contact</button>
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

        form {
            > fieldset {
                padding: 15px 10px;
                margin: 25px 0;
                > legend {
                    padding: 0 15px;
                    font-weight: bold;
                    font-style: italic;
                }
                
                > label {
                    display: block;
                    margin: 10px 0;
                    input {
                        display: block;
                        width: 100%;
                        margin-top: 5px;
                    }
                }

                &#subject {
                    > label {
                        margin: 0;
                        > input {
                            border-radius: 15px 15px 0 0;
                            border-bottom: 2px solid var(--primary);
                            outline: none;
                        }
                        > textarea {
                            border-radius: 0 0 15px 15px;
                            outline: none;
                        }
                    }
                }
            }

            > button[type="submit"] {
                display: block;
                margin: 0 auto;
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
