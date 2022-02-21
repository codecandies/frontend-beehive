<script>
  import HexagonSpiral from './utils/HexagonSpiral';
  const options = {
    startCoords: {
      x: 300,
      y: 300
    },
    size: 30,
    type: 'pointy',
    count: 37
  };
  const spiral = new HexagonSpiral(options);
  const hexagons = spiral.init();
</script>

{#each hexagons as hex }
  <polygon points="{hex.points}" id="{hex.id}" fill="none" stroke="black" strokeWidth="1px"></polygon>
{/each}

