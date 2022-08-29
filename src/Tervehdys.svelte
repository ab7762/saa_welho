<!-- Komponentissa Sää-velho ikoni sekä tervehdys-teksti.  -->
<script>
  import kayttaja from './kayttajaStore.js';
  import { fade, fly } from 'svelte/transition';

  export let kirjautunut;
</script>

{#if kirjautunut}
  <div
    class="velho
  "
  >
    <img
      in:fade={{ delay: 500, duration: 2000 }}
      out:fade={{ delay: 500, duration: 3000 }}
      src="./icons/velho.png"
      alt="velho"
    />
  </div>
{/if}
<h2>Hei {$kayttaja.nimi}! Kuinka voin auttaa?</h2>

<style>
  h2 {
    text-align: center;
    max-width: 100%;
    font-size: 400%;
    font-weight: bolder;
  }

  img {
    margin: auto;
    width: 10%;
  }
  .velho {
    margin-top: 2em;
  }
</style>
