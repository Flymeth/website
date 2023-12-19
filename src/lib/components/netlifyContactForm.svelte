<form name="customers" data-netlify="true" method="post" action="/">
	<input type="hidden" name="form-name" value="customers" />

	<fieldset id="person">
		<legend>Who you are</legend>
		<label for="name">
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Your name"
				required
			/>
		</label>
		<label for="lastname">
			<input
				type="text"
				name="lastname"
				id="lastname"
				placeholder="Your lastname"
				required
			/>
		</label>
	</fieldset>

	<fieldset id="contact">
		<legend>What if I need to contact you back</legend>

		<label for="email">
			Your mail address
			<input
				type="email"
				name="email"
				placeholder="mail.exemple@service.domain"
				id="email"
				required
			/>
		</label>
		<label for="phone">
			Your phone number
			<input
				type="tel"
				name="phone"
				placeholder="0123456789"
				id="phone"
			/>
		</label>
	</fieldset>

	<fieldset id="subject">
		<legend>Your project</legend>

		<label for="project">
			<input
				type="text"
				name="project"
				id="project"
				placeholder="Subject"
				required
			/>
		</label>
		<label for="description">
			<textarea
				name="description"
				id="description"
				cols="30"
				rows="10"
				placeholder="Description"
				required
			></textarea>
		</label>
	</fieldset>

	<button type="submit" class="primary-color">Take contact</button>
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
	}
</style>
