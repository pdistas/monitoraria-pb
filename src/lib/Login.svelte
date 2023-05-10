<script lang="ts">
  import { pb } from "../pb";

    let user: string;
    let password: string;

    function login() {
        pb.collection("monitores").authWithPassword(user, password);
    }
</script>

<form on:submit|preventDefault={login}>
    <label for="username">Nome de usuário ou email</label>
    <input type="text" id="username" name="username" bind:value={user} />

    <label for="password">Senha</label>
    <input type="password" id="password" name="password" bind:value={password} />

    <button type="submit">Login</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    label {
        font-weight: bold;
    }

    input {
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
    }
</style>
