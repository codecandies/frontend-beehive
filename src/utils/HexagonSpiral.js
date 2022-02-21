function HexagonSpiral( options ) {
  this.hexSize = { x: options.size, y: options.size };
  this.origin = { x: options.startCoords.x, y: options.startCoords.y };
  this.centerHex = this.makeHex( 0, 0, 0 );
  this.type = options.type;
  this.count = options.count - 1;
  this.radius = this.getRadius( this.count );
}

HexagonSpiral.prototype.makeHex = function( q, r, s ) {
  return { q, r, s };
}

HexagonSpiral.prototype.hexId = function(h) {
  return `${h.q}.${h.r}.${h.s}`;
}

HexagonSpiral.prototype.directions = function() {
  return [
    this.makeHex( 1, 0, -1 ),
    this.makeHex( 1, -1, 0 ),
    this.makeHex( 0, -1, 1 ),
    this.makeHex( -1, 0, 1 ),
    this.makeHex( -1, 1, 0 ),
    this.makeHex( 0, 1, -1 )
  ];
}

HexagonSpiral.prototype.direction = function( d ) {
  return this.directions()[ d ];
}

HexagonSpiral.prototype.orientation = function( f0, f1, f2, f3, b0, b1, b2, b3, start_angle ) {
  return {f0, f1, f2, f3, b0, b1, b2, b3, start_angle};
}
HexagonSpiral.prototype.pointy = function() {
  return this.orientation( Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5 );
}
HexagonSpiral.prototype.flat = function() {
  return this.orientation( 3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0 );
}

HexagonSpiral.prototype.getRadius = function( count ) {
  // count = 1 + 3 * x * (x+1) => x
  const radius = 1 / 6 * ( Math.sqrt( 12 * count -3 ) - 3 );
  return Math.ceil( radius );
}

HexagonSpiral.prototype.getSVGPoints = function( hex ) {
  const corners = this.cornersOfHex( hex );
  return this.hexPointsFromCorners( corners );
}

HexagonSpiral.prototype.hexAdd = function( a, b ) {
  return this.makeHex( a.q + b.q, a.r + b.r, a.s + b.s );
}

HexagonSpiral.prototype.hexScale = function( a,k ) {
  return this.makeHex( a.q * k, a.r * k, a.s * k );
}

HexagonSpiral.prototype.getNeighborAtDirection = function( hex, dir ) {
  return this.hexAdd( hex, this.direction( dir ) );
}

HexagonSpiral.prototype.hexRing = function(radius) {
  const results = [];
  let hex = this.hexAdd( this.centerHex, this.hexScale( this.direction(4), radius ));
  for ( let i = 0; i < 6; i++ ) {
    for ( let j = 0; j < radius; j++ ) {
      results.push( hex );
      hex = this.getNeighborAtDirection( hex, i );
    }
  }
  return results;
}

HexagonSpiral.prototype.calculateHexagonRings = function() {
  const hexagons = [];
  hexagons.push({
    id: this.hexId(this.centerHex),
    points: this.getSVGPoints( this.centerHex ),
    center: this.centerOfHex( this.centerHex )
  });
  for ( let i = 1; i <= this.radius; i++ ) {
    const ring = this.hexRing(i);
    for ( let hex of ring ) {
      hexagons.push({
        id: this.hexId(hex),
        points: this.getSVGPoints( hex ),
        center: this.centerOfHex( hex )
      });
    }
  }
  return hexagons;
}

HexagonSpiral.prototype.point = ( x, y ) => ({ x, y });

HexagonSpiral.prototype.centerOfHex = function( hex ) {
  const O = this.type == 'pointy' ? this.pointy() : this.flat();
  const x = (O.f0 * hex.q + O.f1 * hex.r) * this.hexSize.x;
  const y = (O.f2 * hex.q + O.f3 * hex.r) * this.hexSize.y;
  return this.point( x + this.origin.x, y + this.origin.y );
}

HexagonSpiral.prototype.hexPointsFromCorners = function( corners ) {
  const points = [];
  for ( let {x, y} of corners ) {
    points.push(`${x},${y}`);
  }
  return points.join(' ');
}

HexagonSpiral.prototype.cornersOfHex = function( hex ) {
  const cornerOffset = ( corner ) => {
    const O = this.type == 'pointy' ? this.pointy() : this.flat();
    const angle = 2.0 * Math.PI * (corner + O.start_angle) / 6;
    return this.point( this.hexSize.x * Math.cos( angle ), this.hexSize.y * Math.sin( angle ) );
  };
  const corners = [ 0, 1, 2, 3, 4, 5, 6 ];
  const center = this.centerOfHex( hex );
  return corners.map( i => {
    const offset = cornerOffset( i );
    return this.point( center.x + offset.x, center.y + offset.y );
  });
}

HexagonSpiral.prototype.init = function() {
  const hexagons = this.calculateHexagonRings();
  console.log( hexagons );
  return hexagons;
}

export default HexagonSpiral;
