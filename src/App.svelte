<script>
  import Hexagons from "./Hexagons.svelte";
</script>

<div class="container">
  <svg viewBox="0 0 600 600" id="svg1">
    <Hexagons />
  </svg>
</div>

<style>
  svg {
    width: 600px;
    flex: 1;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0;
    height: 100vh;
    font-weight: 700;
    font-family: sans-serif;
  }
</style>
