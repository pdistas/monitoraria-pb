<script lang="ts">
  import type { ListResult, Record } from "pocketbase";
  import { onMount } from "svelte";
  import { pb } from "../pb";

  let nome: string;
  let ra: string;
  let turma: string;

  let turmas: Record[] = [];

  onMount(async () => {
    turmas = await pb.collection("turmas").getFullList({ sort: "codigo" });
    turmas ??= [];
    console.log(turmas);
  });

  function cadastrar() {
    pb.collection("alunos").create({ nome, ra, turma });
    nome = "";
    ra = "";
    turma = "";
  }
</script>

<form on:submit|preventDefault={cadastrar}>
  <label for="nome">Nome</label>
  <input type="text" id="nome" name="nome" bind:value={nome} required />

  <label for="ra">RA</label>
  <input type="text" id="ra" name="ra" pattern="^20[1-3][0-9][0-9][0-9]$" bind:value={ra} required />

  <label for="turma">Turma</label>
  <select name="turma" id="turma" bind:value={turma} required>
    {#each turmas as turma (turma.id)}
      <option value={turma.id}>{turma.codigo}</option>
    {/each}
  </select>

  <button type="submit">Cadastrar</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  input {
    margin-bottom: 1rem;
  }

  label {
    display: block;
  }

  button[type="submit"] {
    margin-top: 1.5rem;
    align-self: flex-end;
  }

  select {
    width: 100%;
  }
</style>
