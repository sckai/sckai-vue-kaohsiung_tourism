<template>
    <div>
      <gmap-map
      id="map"
      :center="positionCenter"
      :zoom="11">
        <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :position="m"
        :clickable="true"
        :draggable="true"
        :title="m.title"
        @click="positionCenter = m"
        ></gmap-marker>
      </gmap-map>
    </div>
</template>

<style scoped>
.map_block{
    position: relative;
}

#map{
    height: 250px;
    max-width: 100%;
}

@media only screen and (max-width: 991px) {
    #map{
        max-width: 600px;
    }
  }

@media only screen and (max-width: 767px) {
    #map{
        max-width: 460px;
    }
}

@media only screen and (max-width: 575px) {
    #map{
        max-width: 460px;
    }
}
</style>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLEAPIKEY,
    libraries: 'places'
  }
})

export default {
  props: {
    markers: {
      type: Array,
      default: function () {
        return {}
      }
    },
    zone: {
      type: String
    }
  },
  data () {
    return {
      positionCenter: { lat: 22.653272, lng: 120.314511 }
    }
  },
  watch: {
    zone () {
      const vm = this

      switch (vm.zone) {
        case '三民區':
          vm.positionCenter = { lat: 22.653272, lng: 120.314511 }
          return
        case '內門區':
          vm.positionCenter = { lat: 22.957633, lng: 120.470461 }
          return
        case '美濃區':
          vm.positionCenter = { lat: 22.883518, lng: 120.552174 }
          return
        case '大樹區':
          vm.positionCenter = { lat: 22.716951, lng: 120.420833 }
          return
        case '小港區':
          vm.positionCenter = { lat: 22.558290, lng: 120.359086 }
          return
        case '六龜區':
          vm.positionCenter = { lat: 23.016666, lng: 120.662785 }
          return
        case '仁武區':
          vm.positionCenter = { lat: 22.694265, lng: 120.363258 }
          return
        case '左營區':
          vm.positionCenter = { lat: 22.684253, lng: 120.290324 }
          return
        case '田寮區':
          vm.positionCenter = { lat: 22.864326, lng: 120.394472 }
          return
        case '永安區':
          vm.positionCenter = { lat: 22.822263, lng: 120.227022 }
          return
        case '甲仙區':
          vm.positionCenter = { lat: 23.136665, lng: 120.630526 }
          return
        case '鼓山區':
          vm.positionCenter = { lat: 22.651934, lng: 120.274905 }
          return
        case '杉林區':
          vm.positionCenter = { lat: 22.990260, lng: 120.566431 }
          return
        case '那瑪夏':
          vm.positionCenter = { lat: 23.251486, lng: 120.733639 }
          return
        case '岡山區':
          vm.positionCenter = { lat: 22.799367, lng: 120.295188 }
          return
        case '高雄市':
          vm.positionCenter = { lat: 22.633669, lng: 120.335450 }
          return
        case '前鎮區':
          vm.positionCenter = { lat: 22.589327, lng: 120.305362 }
          return
        case '新興區':
          vm.positionCenter = { lat: 22.628594, lng: 120.306035 }
          return
        case '苓雅區':
          vm.positionCenter = { lat: 22.621545, lng: 120.316835 }
          return
        case '茂林區':
          vm.positionCenter = { lat: 22.917808, lng: 120.744380 }
          return
        case '茄萣區':
          vm.positionCenter = { lat: 22.892220, lng: 120.200999 }
          return
        case '梓官區':
          vm.positionCenter = { lat: 22.748813, lng: 120.259593 }
          return
        case '旗津區':
          vm.positionCenter = { lat: 22.625057, lng: 120.279442 }
          return
        case '桃源區':
          vm.positionCenter = { lat: 23.209333, lng: 120.831250 }
          return
        case '楠梓區':
          vm.positionCenter = { lat: 22.718882, lng: 120.292310 }
          return
        case '前金區':
          vm.positionCenter = { lat: 22.626186, lng: 120.294989 }
          return
        case '鳳山區':
          vm.positionCenter = { lat: 22.612511, lng: 120.353338 }
          return
        default:
          vm.positionCenter = { lat: 22.653272, lng: 120.314511 }
      }
    }
  }
}
</script>
