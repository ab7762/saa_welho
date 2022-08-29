<!-- Sisältää hakuun liittyvät elementit. Datepickerin modaus on tehty alla. Sisältää kalenterin, tekstikentän sekä painikkeen. -->
<script>
  import DatePicker from './DatePicker.svelte';
  import { createEventDispatcher } from 'svelte';
  import { Button } from 'spaper';
  import Painike from './Button.svelte';
  const dispatch = createEventDispatcher();
  $: console.log(startDate);
  const kalenteriEsiin = () => dispatch('esiin');
  const getData = () => dispatch('getd');
  const ekaVierailuHaku = () => dispatch('ekavierailuhaku');
  export let startDate;
  export let kalenteri;
  export let kaupunki;
  export let kirjautunut;

  export let ekavierailuhaku;

  const locale = {
    en: {
      days: 'Su|Mo|Tu|We|Th|Fr|Sa'.split('|'),
      months: 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec'.split('|'),
      start: 0,
    },
    fi: {
      days: 'Su|Ma|Ti|Ke|To|Pe|La'.split('|'),
      months: 'Tam|Hel|Maa|Huh|Tou|Kes|Hei|Elo|Syy|Lok|Mar|Jou'.split('|'),
      start: 0,
    },
  };

  let culture = 'fi';
</script>

{#if kalenteri}
  <div class="picker">
    <label>
      Kieli:
      <select bind:value={culture}>
        {#each Object.keys(locale) as lang}
          <option value={lang}>{lang}</option>
        {/each}
      </select>
    </label>

    <h3>Valitse päivä</h3>
    <div class="flex_close">
      <input type="text" bind:value={startDate} />
      <div class="sulje">
        <img on:click={kalenteriEsiin} src="./icons/sulje.png" alt="sulje" />
      </div>
    </div>

    <DatePicker bind:value={startDate} {...locale[culture]} />
  </div>{:else}
  <div class="flex">
    <div class="kalenteri">
      <img
        on:click={kalenteriEsiin}
        src="./icons/kalenteri.png"
        alt="kalenteri"
      />
    </div>

    <input
      class="kaupunki"
      bind:value={kaupunki}
      on:blur={ekaVierailuHaku}
      type="text"
      placeholder="Helsinki"
    />
    <div class="at">@</div>
    <div id="paiva" class="paivamaara">{startDate}</div>
  </div>
{/if}
<div class="hae">
  <Painike disabled={!kirjautunut} on:click={getData}>Hae</Painike>
</div>
{#if !ekavierailuhaku & !kirjautunut}
  <div class="huomautus">Sinun pitää kirjautua tehdäksesi hakuja.</div>
{/if}

<style>
  input {
    margin-right: 1em;
  }
  .picker {
    width: 25%;
    position: fixed;
    top: 26%;
    left: 5em;
    background-color: rgba(176, 177, 179, 0.82);
    padding: 0.5em;
    border-radius: 6px;
  }
  .flex {
    display: flex;
    margin: auto;
    margin-top: 0.5em;
    justify-content: center;
  }
  .kalenteri {
    width: 3em;
    margin-right: 1em;
  }
  .kalenteri:hover {
    background-color: rgba(245, 243, 220, 0.614);
  }
  .flex_close {
    display: flex;
  }
  .sulje :hover {
    background-color: rgba(255, 0, 0, 0.548);
  }
  .paivamaara {
    color: black;
    margin-left: 0;
    padding-top: 0.7em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    font-size: 1.2em;
    border: 1px solid rgb(24, 23, 23);
    border-radius: 3px;
  }
  .at {
    font-size: xx-large;
    margin-right: 0.5em;
    margin-top: 0.4em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  .hae {
    margin: auto;
    border: solid;
    text-align: center;
    width: 30%;
    margin-top: 1em;
  }
  .huomautus {
    text-align: center;
    margin-top: 0.5em;
    font-weight: bold;
    color: white;
  }
  .kaupunki {
    color: black;
  }
</style>
