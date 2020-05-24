<template>
  <div style="height: 100%;">
    <Map :zoom="13" :center="[47.41322, -1.219482]">
      <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></TileLayer>
      <Marker :lat-lng="[47.41322, -1.219482]"></Marker>
    </Map>
  </div>
</template>

<script>
import { Map, TileLayer, Marker } from 'vue2-leaflet';

export default {
  components: {
    Map,
    TileLayer,
    Marker,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.41322, -1.219482],
      bounds: null,
    };
  },
};
</script>
