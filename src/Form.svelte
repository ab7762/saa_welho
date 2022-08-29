<!-- Formina käytin Svelten papers- komponenttia. Validointina vaaditaan nimi ja vähintään 6 merkin salasana. -->
<script>
  import { Form, Input, Button } from 'spaper';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  const formVaihto = () => dispatch(`formvaihto`);
  const ekaVierailuNimi = () => dispatch(`ekavierailunimi`);
  const ekaVierailuSalasana = () => dispatch(`ekavierailusalasana`);
  const kirjaudu = () => dispatch(`kirjaudu_`);
  export let arvo;
  export let salasana_;
  export let ekaVierailunimi;
  export let validiNimi;
  export let ekaVierailusalasana;
  export let validiSalasana;
  export let validi;
</script>

<div class="tausta" />
<div class="form">
  <div class="sulje">
    <div class="sulje_x">
      <img on:click={formVaihto} src="./icons/sulje.png" alt="sulje" />
    </div>
  </div>
  {#if !ekaVierailunimi & !validiNimi}
    <p class="virhe">Nimi ei voi olla tyhjä.</p>{/if}
  <Form>
    <Input
      bind:value={arvo}
      on:blur={ekaVierailuNimi}
      placeholder="Nimi"
      type="text"
      class="margin-bottom-small"
    />
    <Input
      bind:value={salasana_}
      on:blur={ekaVierailuSalasana}
      placeholder="Salasana"
      type="password"
    />
    {#if !ekaVierailusalasana & !validiSalasana}
      <p class="virhe">Salasana vähintään 6 merkkiä.</p>{/if}
    <Button
      on:click={kirjaudu}
      disabled={!validi}
      type="secondary"
      class="margin-top-small">Kirjaudu sisään</Button
    >
  </Form>
</div>

<style>
  .form {
    position: fixed;
    top: 10em;
    right: 10em;
    z-index: 100;
    background-color: rgb(213, 239, 243);
    padding: 2em;
    border-radius: 5px;
  }
  .tausta {
    background: rgba(0, 0, 0, 0.75);
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
  .sulje :hover {
    background-color: rgba(255, 0, 0, 0.16);
  }
  .sulje {
    margin-top: -1.5em;
    padding-bottom: 2em;
    width: 100%;

    display: flex;
  }
  .sulje_x {
    margin: auto;
  }
  .virhe {
    color: red;
  }
</style>
