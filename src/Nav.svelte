<!-- Navin komponentti. Sisältää painikkeet kirjaudu, kirjaudu ulos sekä omat.   -->
<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import Omat from './omatStore.js';

  import { Button } from 'spaper';
  export let kirjautunut;
  export let oma;

  const formVaihto = () => dispatch(`formvaihto`);
  const kirjauduUlos = () => dispatch(`kirjauduulos`);
  const vaihdaOma = () => dispatch('vaihdaoma');
</script>

<div class="alue">
  {#if kirjautunut}
    <div class="nav">
      <Button disabled={oma} on:click={vaihdaOma} outline="secondary"
        >Omat ({$Omat.length})</Button
      >
    </div>
  {/if}
  {#if !kirjautunut}
    <div class="nav">
      <Button on:click={formVaihto} type="primary">Kirjaudu</Button>
    </div>
  {:else}
    <div class="nav">
      <Button on:click={kirjauduUlos} disabled={oma} type="primary"
        >Kirjaudu ulos</Button
      >
    </div>{/if}
</div>

<style>
  .nav {
    margin-left: 2em;
    margin-right: 1em;
    padding: 0.2em;
  }

  .alue {
    display: flex;
    justify-content: end;
    width: 100%;
    background-color: rgba(5, 12, 19, 0.539);
    border-bottom: 1px solid;

    margin-left: 0;
    margin-right: 0;
    margin: auto;
  }
  .alue {
    width: 100%;
  }
</style>
