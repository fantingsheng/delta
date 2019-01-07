let settings = {
  lineWidth: 1,
  strokeStyle: "#000",
  fillStyle: "rgba(255,0,0,0.5)"
};
export default function setting(key, val) {
  if (val) {
    settings[key] = value;
  } else {
    if (typeof key === 'string') {
      return settings[key];
    } else {
      Object.assign(settings, key);
    }
  }
}
