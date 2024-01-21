<script lang="ts">
	import { faLinkedinIn, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
	import { faCopy, faEnvelope } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";

    export let sharingInformation: {
        link: string,
        title: string,
        description: string,
    }
</script>

<h3>Partage mon travail sur tes réseaux favoris</h3>
<ul class="share-links">
    <li class="twitter x" style="--theme:#1DA1F2;">
        <a target="_blank" href="https://twitter.com/intent/tweet?text={encodeURIComponent(sharingInformation.description)}&url={encodeURIComponent(sharingInformation.link)}">
            <Fa icon={faTwitter}/>
        </a>
    </li>
    <li class="whatsapp" style="--theme:#25D366;">
        <a target="_blank" href="https://api.whatsapp.com/send?text={encodeURIComponent(sharingInformation.description + "\n" + sharingInformation.link)}">
            <Fa icon={faWhatsapp}/>
        </a>
    </li>
    <li class="linkedin" style="--theme:#0077B5;">
        <a target="_blank" href="https://www.linkedin.com/shareArticle/?mini=true&url={encodeURIComponent(sharingInformation.link)}&title={sharingInformation.title}&summary={encodeURIComponent(sharingInformation.description)}&source={encodeURIComponent(sharingInformation.link)}">
            <Fa icon={faLinkedinIn}/>
        </a>
    </li>
    <li class="email" style="--theme:#C71610;">
        <a target="_blank" href="mailto:?subject={encodeURIComponent(sharingInformation.title)}&body={encodeURIComponent(sharingInformation.description + "\n" + sharingInformation.link)}">
            <Fa icon={faEnvelope}/>
        </a>
    </li>
    <li class="link" style="--theme:var(--secondary)">
        <a href="#copy" on:click|preventDefault={() => {
            const text = `${sharingInformation.description}\n${sharingInformation.link}`
            navigator.clipboard.writeText(text)
            .then(() => alert("Merci! L'article vient d'être copié."))
            .catch(() => alert("Aie... L'article n'a pas pu être copié."))
        }}>
            <Fa icon={faCopy}/>
        </a>
    </li>
</ul>

<style lang="scss">
    h3 {
        text-align: center;
        text-transform: uppercase;
        text-decoration: underline;
        margin: 20px 0 15px;
    }
    ul {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 25px;
        > li {
            font-size: 25px;
            > a {
                color: var(--theme);
                transition: .25s;
                &:hover {
                    color: var(--primary);
                }
            }
        }
    }
</style>
