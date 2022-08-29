<!-- Info-teksti. Feidautuu sisään ja ulos.  -->
<script>
  export let info;
  import { fade, fly } from 'svelte/transition';
</script>

{#if info}
  <div in:fade out:fade class="info">
    <p>
      Sää-Welho on sovellus matkailun ja vapaa-ajan vieton helpottamiseen. Kerro
      vain, minne olet matkustamassa, niin Sää-Welho ennustaa olosuhteet.
      Sää-Welhoa auttaa Visualcrossing Weather Data & API.
    </p>
    <p class="virhe">
      Sää-Welho pidättää oikeuden mahdollisiin virhe-ennustuksiin.
    </p>
  </div>{/if}

<style>
  .info {
    position: fixed;
    margin: auto;
    width: 40%;
    border: 1px dotted;
    top: 30%;
    border-radius: 5px;
    background-color: rgb(225, 221, 218);
    z-index: 100;

    left: 30%;
  }
  p {
    padding: 0.5em;
    margin-top: 0.5em;
    font-weight: 700;
  }
  .virhe {
    padding: 0.5em;
    margin-top: 0.5em;
    font-weight: 500;
    color: rgb(161, 55, 10);
  }
</style>
