<script lang="ts">
  import { currentSession } from "$lib/stores";
</script>

<nav class="navbar is-full-width">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/dashboard">
       <span><strong>Hi, {$currentSession.name} </strong> </span>
      </a>
    </div>
    <div id="navbarMenu" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item" href="/report"> Report </a>
        <a class="navbar-item" href="/reports"> Reports </a>
        <a class="navbar-item" href="/gal"> Gallery </a>
        <a class="navbar-item" href="/charts"> Charts </a>
        <a class="navbar-item" href="/maps"> Maps </a>
        <a class="navbar-item" href="/logout"> Logout </a>
      </div>
      <div></div>
    </div>
  </div>
</nav>
