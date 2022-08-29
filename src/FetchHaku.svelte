<!-- Fetch-haun esittävä komponentti. Mukana animaatioita sekä painikkeet. Blurrasin taustan komponentin tullessa aktiiviseksi. -->
<script>
  import { Button } from 'spaper';

  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  const dispatch = createEventDispatcher();
  const tyhjenna = () => dispatch('delete');
  const tallenna = () => dispatch('save');
  export let tiedot;
  export let FetchOn;
  export let virhe;

  $: tiedot[1] = ``;
  $: tiedot[2] = ``;
  $: tiedot[3] = ``;
  $: tiedot[4] = ``;
  $: tiedot[5] = ``;
  $: tiedot[6] = ``;
</script>

{#if FetchOn & !virhe}
  <div class="taustablur" />
  <div out:fly={{ y: -800, duration: 2000 }} class="tausta">
    <div class="rivi">
      <div class="kaupunki">
        {tiedot[1]}
      </div>
      <div class="paivamaara">{tiedot[2]}</div>
    </div>
    <div class="rivi2">
      <div class="min">Min: {tiedot[4]} &deg;C</div>
      <div class="max">Max: {tiedot[3]} &deg;C</div>
    </div>
    <div class="kuvaus">{tiedot[5]}</div>
    <div class="kuva"><img src="./icons/{tiedot[6]}.png" alt="kuva" /></div>
    <div class="flex_button">
      <Button on:click={tyhjenna} type="secondary">Tyhjennä</Button>
      <Button on:click={tallenna} type="secondary">Tallenna</Button>
    </div>
  </div>
{/if}
{#if virhe}
  <div class="virhe">Virhe tapahtui. Tarkista haun tiedot.</div>
{/if}

<style>
  .taustablur {
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .tausta {
    background-color: rgb(121, 153, 182);
    width: 50%;
    margin: auto;
    margin-top: 2em;
    padding: 3em;
    position: relative;
    z-index: 100;
    border-radius: 6px;
    box-shadow: 2px 2px 4px 6px rgb(55, 104, 126);
  }
  .min {
    font-family: Arial, Helvetica, sans-serif;
  }
  .max {
    font-family: Arial, Helvetica, sans-serif;
  }
  .rivi {
    display: flex;
  }
  .kaupunki {
    font-size: 1.5em;
    text-transform: uppercase;
    font-weight: bold;
  }
  .paivamaara {
    font-size: 1.3em;
    margin-left: 5em;
    font-size: 1.5em;
  }
  .rivi2 {
    margin-top: 1em;
    display: flex;
  }

  .max {
    margin-left: 7em;
  }
  .kuvaus {
    margin-top: 2em;
    text-align: center;
    text-decoration: underline;
  }
  .kuva {
    margin-top: 2em;
  }
  img {
    margin: auto;
    width: 25%;
  }
  .flex_button {
    display: flex;
    margin-top: 2em;
    justify-content: space-evenly;
  }
  .virhe {
    text-align: center;
    margin-top: 3em;
    color: red;
  }
</style>
