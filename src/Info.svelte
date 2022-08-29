<!-- Infotekstin aktivoiva pieni laatikko. Näyttää tekstin kun hiiri laatikon päällä. Poistaa tekstin kun hiiri poistuu laatikon päältä. -->
<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  const naytaInfo = () => dispatch(`naytaInfo`);
  const eiinfo = () => dispatch(`eiinfo`);
</script>

<div class="info">
  <span on:mouseenter={naytaInfo} on:mouseleave={eiinfo} class="i">i</span>
</div>

<style>
  .info {
    margin: auto;
    text-align: center;
    margin-top: 5em;
    margin-right: 11em;
  }
  .i:hover {
    background-color: rgb(214, 230, 151);
  }
  .i {
    border: 2px dashed burlywood;
    padding: 0.2em 0.5em 0.2em 0.5em;
    font-size: 1em;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    background-color: rgba(240, 224, 169, 0.388);
    border-radius: 4px;
  }
</style>
