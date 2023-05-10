<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import { currentUser } from './pb';
  import Login from './lib/Login.svelte';
  import Monitorias from './lib/Monitorias.svelte';
  import CadastrarAluno from './lib/CadastrarAluno.svelte';
</script>

<main>
  {#if !$currentUser}
    <Login />
  {:else}
    <Monitorias />
    <CadastrarAluno />
  {/if}
</main>
