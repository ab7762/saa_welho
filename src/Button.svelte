<!--Komponentti painikkeelle. -->
<script>
  export let disabled;
</script>

<button on:blur {disabled} on:click><slot /></button>

<style>
  button {
    width: 100%;
  }
  button:hover {
    background-color: rgb(235, 229, 222);
  }
</style>
