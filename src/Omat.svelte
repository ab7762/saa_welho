<!-- Omien tallennettujen hakujen esitys-komponentti. OmatStoren tiedot esitetään tässä. -->
<script>
  import { each } from 'svelte/internal';
  import Omat from './omatStore.js';
  import { Button } from 'spaper';
  import omat from './omatStore.js';
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  const dispatch = createEventDispatcher();
  const vaihdaOma = () => dispatch('vaihdaoma');
  const poistaOma = (id) => dispatch('poistaoma', id);
  export let onkoOmia;
</script>

<div
  class="tausta
"
/>

<div class="alue">
  {#if !onkoOmia}
    <div class="ilmoitus">Ei omia tietoja.</div>{/if}

  {#each $Omat as Oma, i (Oma.id)}
    <div animate:flip in:fade out:fly={{ x: 100 }} class="sarake">
      <div class="rivi">
        <div class="kaupunki">{Oma.kaupunki}</div>
        <div class="paiva">{Oma.pvm}</div>
        <div class="min">Min:<br />{Oma.min}&deg;C</div>
        <div class="max">Max:<br />{Oma.max}&deg;C</div>
        <div class="kuva">
          <img src="./icons/{Oma.kuva}.png" alt="kuva" />
        </div>
        <div class="poista">
          <img
            class="poista_kuva"
            on:click={() => poistaOma(Oma.id)}
            src="./icons/poista.png"
            alt="poista"
          />
        </div>
      </div>
      <hr />
    </div>{/each}
  <div class="sulje"><Button on:click={vaihdaOma}>Sulje</Button></div>
</div>

<style>
  .tausta {
    background: rgba(0, 0, 0, 0.929);
    position: fixed;
    width: 100vw;
    min-height: 100vh;
    top: 0;
    left: 0;
  }
  .alue {
    position: fixed;
    top: 1em;
    z-index: 100;
    margin-left: 3em;
    background-color: rgba(20, 16, 16, 0.906);
    width: 80%;
    height: fit-content;
    font-family: Arial, Helvetica, sans-serif;
  }
  .rivi {
    display: flex;
    justify-content: space-around;
    margin-top: 1em;
    background-color: white;
    border-radius: 4px;
  }
  .kaupunki {
    border-right: solid 0.5px black;
    padding-top: 1em;
    padding-right: 1em;
    width: 9em;
  }
  .paiva {
    padding-top: 1em;
    border-right: solid 0.5px black;
    padding-right: 1em;
    width: 5em;
  }
  .min {
    padding-top: 1em;
    border-right: solid 0.5px black;
    padding-right: 1em;
    width: 4em;
  }
  .max {
    padding-top: 1em;
    border-right: 0.5px solid black;
    padding-right: 1em;
    width: 4em;
    padding-right: 1em;
  }
  .kuva {
    padding-right: 1em;
    border-right: 0.5px solid black;
  }
  img {
    max-height: 100%;
    border: none;
    height: 3em;
  }
  .sulje {
    text-align: center;
  }
  .sarake {
    margin-top: em;
  }
  .poista_kuva:hover {
    background-color: azure;
  }
  .ilmoitus {
    color: white;
    text-align: center;
    margin-bottom: 1em;
  }
</style>
