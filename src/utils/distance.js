/**
 * Converts decimal degrees to radians
 * JavaScript's Math.sin(), Math.cos() use radians. One radian ≈ 57.3 degrees.
 */
export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Haversine Formula
 * 
 * WHAT IT CALCULATES: the great-circle distance — the shortest path between two points on the surface of a sphere.
 * WHY NOT PYTHAGOREAN THEOREM: the Earth is spherical/curved — straight-line (Euclidean) geometry gives wrong answers over distances greater than a few km.
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  // Earth's mean radius in kilometres (equatorial radius is 6,378km, polar is 6,357km; 6,371 is the accepted mean)
  const R = 6371; 
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  // 'a' is an intermediate result — the square of half the chord length between the two points
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) ** 2;
    
  // 'c' is the angular distance in radians between the two points (central angle).
  // Math.atan2 vs Math.asin: atan2 is numerically stable for antipodal points (directly opposite on Earth) — asin can produce NaN for values outside [-1, 1] due to floating-point errors.
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  // .toFixed(1): one decimal place gives precision of ~100 metres, which is appropriate for tourist travel distances
  return (R * c).toFixed(1);
}
