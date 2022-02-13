export const bearing = (startLat, startLng, destLat, destLng) => {
  startLat = toRadians(startLat);
  startLng = toRadians(startLng);
  destLat = toRadians(destLat);
  destLng = toRadians(destLng);

  const y = Math.sin(destLng - startLng) * Math.cos(destLat);
  const x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  let brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  return (brng + 360) % 360;
};

export const getCardinalDirection = (angle) => {
  const directions = [
    "↑ K",
    "↗ KD",
    "→ D",
    "↘ GD",
    "↓ G",
    "↙ GB",
    "← B",
    "↖ KB",
  ];
  return directions[Math.round(angle / 45) % 8];
};

export const getDistanceFromLatLonInKm = (lat2, lon2, lat1, lon1) => {
  var R = 6371; // Radius of the earth in km
  var dLat = toRadians(lat2 - lat1);
  var dLon = toRadians(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

const toRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

// Converts from radians to degrees.
const toDegrees = (radians) => {
  return (radians * 180) / Math.PI;
};
