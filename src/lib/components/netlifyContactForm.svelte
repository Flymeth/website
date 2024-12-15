<form
  name="customers"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  method="post"
>
  <input type="hidden" name="form-name" value="customers" />

  <fieldset id="person">
    <legend>Les présentations</legend>
    <label for="name">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Ton prénom"
        required
      />
    </label>
    <label for="lastname">
      <input
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Ton nom"
        required
      />
    </label>
  </fieldset>

  <fieldset id="contact">
    <legend>Tes coordonnées</legend>

    <label for="email">
      Adresse mail
      <input
        type="email"
        name="email"
        placeholder="mail.exemple@service.domain"
        id="email"
        required
      />
    </label>
    <label for="phone">
      Numéro de téléphone
      <input type="tel" name="phone" placeholder="0123456789" id="phone" />
    </label>
  </fieldset>

  <fieldset id="subject">
    <legend>Ton message</legend>

    <label for="project">
      <input
        type="text"
        name="project"
        id="project"
        placeholder="Objet"
        required
      />
    </label>
    <label for="description">
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        placeholder="Explications"
        required
      ></textarea>
    </label>
  </fieldset>

  <button type="submit" class="primary-color">Prendre contact</button>
  <p>
    N'hésite pas à
    <a href="https://www.linkedin.com/in/johan-janin/" target="_blank">
      te connecter à mon LinkedIn
    </a>
    après l'envoie de ton message !
  </p>
</form>

<style lang="scss">
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
    > p {
      margin: 10px 0;
      text-align: center;
      opacity: 0.5;
      font-style: italic;
    }
  }
</style>
