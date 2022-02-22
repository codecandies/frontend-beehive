<script>
  import HexagonSpiral from './utils/HexagonSpiral';
  import { data } from "./utils/store";
  const options = {
    startCoords: {
      x: 500,
      y: 500
    },
    size: 45,
    type: 'pointy',
    count: 77
  };
  const spiral = new HexagonSpiral(options);
  const hexagons = spiral.init();

  const getData = ( id, type ) => {
    const standard = {
      'text': id,
      'color': '#ffffff',
      'textColor': '#000000'
    }
    const element = $data.filter( f => f.id === id );
    if ( element.length ) {
      return element[0][type] ?? standard[type];
    }
    return standard[type];
  }
</script>

{#each hexagons as hex }
  <polygon points="{hex.points}" id="{hex.id}" fill="{getData(hex.id, 'color')}" stroke="black" stroke-width="3px"></polygon>
  <text class="skill-text" fill="{getData(hex.id, 'textColor')}" x="{hex.center.x}" y="{hex.center.y}" dominant-baseline="middle" text-anchor="middle">{getData(hex.id, 'text')}</text>
{/each}

<style>
  .skill-text {
    font-size: 11px;
    
  }
</style>
