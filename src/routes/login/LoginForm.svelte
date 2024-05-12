<script lang="ts">
  import { goto } from "$app/navigation";
  import { reportService } from "$lib/services/report-service";
  import { currentSession } from "$lib/stores";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    console.log(`attemting to log in email: ${email} with password: ${password}`);
    let session = await reportService.login(email, password);
    if (session) {
      currentSession.set(session);
      localStorage.donation = JSON.stringify(session);
      goto("/report");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>

{#if message}
  <Message {message} />
{/if}
<form on:submit|preventDefault={login}>
  <UserCredentials bind:email bind:password />
  <button class="button is-success is-fullwidth">Log In</button>
</form>
