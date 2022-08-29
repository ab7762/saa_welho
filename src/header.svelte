<!-- Header näyttää sovelluksen nimen ja ikonit molemmin puolin.  -->
<script>
  export let name;
</script>

<div class="header">
  <div class="sade">
    <img src="./icons/sade.png" alt="teerve" />
  </div>
  <h1>{name}!</h1>
  <div class="aurinko"><img src="./icons/aurinko.png" alt="aurinko" /></div>
</div>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: bold;
    margin-left: 1em;
    margin-right: 1em;
  }
  .header {
    display: flex;
    width: 100%;
    border-bottom: 0.1px solid black;
    justify-content: center;
  }
  .aurinko {
    margin-top: 2em;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  .sade {
    margin-top: 2em;
  }
</style>
