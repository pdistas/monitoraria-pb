import PocketBase from "pocketbase";
import { writable } from "svelte/store";

export const pb = new PocketBase("http://127.0.0.1:8090");

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
  currentUser.set(pb.authStore.model);
});

const turmas = await pb.collection("turmas").getFullList();
console.log("Turmas: ", turmas);

let monitorias = await pb.collection("monitorias").getFullList({
  expand: "monitor",
  sort: "data"
});
console.log("Monitorias: ", monitorias);

await pb.collection("monitorias").subscribe("*", async() => {
  monitorias = await pb.collection("monitorias").getFullList({
    expand: "monitor",
    sort: "data"
  });
  console.log(monitorias);
});
