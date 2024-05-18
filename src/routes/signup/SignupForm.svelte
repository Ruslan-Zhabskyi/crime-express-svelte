<script lang="ts">
  import { goto } from "$app/navigation";
  import { reportService } from "$lib/services/report-service";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";
  import Message from "$lib/ui/Message.svelte";
  import validator from 'validator';

  let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";
  let message = "";

  async function signup() {
    // Validate and sanitize the inputs
    if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
      message = "First name and last name must contain only letters";
      return;
    }
    firstName = validator.trim(firstName);
    lastName = validator.trim(lastName);

    if (!validator.isEmail(email)) {
      message = "Invalid email";
      return;
    }
    email = validator.normalizeEmail(email);

    if (!validator.isLength(password, { min: 8 })) {
      message = "Password must be at least 8 characters";
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      password
    };
    const success = await reportService.signup(user);
    if (success) {
      goto("/login");
    } else {
      message = "Error Trying to sign up";
    }
  }
</script>

{#if message}
  <Message {message} />
{/if}
<form on:submit|preventDefault={signup}>
  <UserDetails bind:firstName bind:lastName />
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Create Account</button>
  <br />
</form>