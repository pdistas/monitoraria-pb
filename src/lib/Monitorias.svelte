<script lang="ts">
  import type { Record } from "pocketbase";
  import { pb } from "../pb";
  import { onDestroy, onMount } from "svelte";

  let monitorias: Record[];
  let unsubscribe: () => void;

  onMount(async() => {
    monitorias = await pb.collection("monitorias").getFullList({
      expand: "monitor",
      sort: "data",
    });
    monitorias ||= [];

    unsubscribe = await pb.collection("monitorias").subscribe("*", async() => {
      monitorias = await pb.collection("monitorias").getFullList({
        expand: "monitor",
        sort: "data"
      });
      monitorias ||= [];
    });
  });

  onDestroy(unsubscribe);
</script>

<table>
  <thead>
    <tr>
      <th>Data</th>
      <th>Monitor</th>
      <th>Conteúdo</th>
      <th>Alunos</th>
      <th>Modalidade</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    {#each monitorias as monitoria (monitoria.id)}
      <tr>
        <td>{monitoria.data}</td>
        <td>{monitoria.monitor.name}</td>
        <td>{monitoria.conteudo}</td>
        <td>{monitoria.expand.alunos.join(", ")}</td>
        <td>{monitoria.modalidade ? "online" : "presencial"}</td>
        <td>{monitoria.info}</td>
      </tr>
    {/each}
  </tbody>
</table>
