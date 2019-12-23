<template>
    <div>
        <loading :active.sync="isLoading"
        loader='dots'
        color='#559AC8'
        background-color='#000'
        ></loading>
        <div class="container">
            <div class="row" >
                <div class="header">
                    <h1 class="text-center">高雄旅遊網</h1>
                    <div class="select_down text-center">
                        <select  name="" id="select" v-model="currentZone" @click="currentPage = 0">
                            <option :selected="true" disabled value=''>- - 請選擇行政區 - -</option>
                            <option :value="item" v-for="(item, index) in locations" :key="index">{{item}}</option>
                        </select>
                    </div>
                </div>

                <div class="hot_select text-center">
                    <h3 class="text-left">熱門行政區</h3>
                    <div class="row hot_group">
                        <div class="hot_zone2 col-3  box" value="三民區" @click="currentZone = '三民區',currentPage = 0">三民區</div>
                        <div class="hot_zone1 col-3  box" value="大樹區" @click="currentZone = '大樹區',currentPage = 0">大樹區</div>
                        <div class="hot_zone3 col-3  box" value="甲仙區" @click="currentZone = '甲仙區',currentPage = 0">甲仙區</div>
                        <div class="hot_zone4 col-3  box" value="美濃區" @click="currentZone = '美濃區',currentPage = 0">美濃區</div>
                    </div>
                </div>
                <div class="line text-center">
                    <div class="circle">
                        <img src="../assets/img/icons_down.png" alt="">
                    </div>
                </div>
                <div class="zone_title h2 text-center col-12">
                    {{currentZone}}
                </div>

                <div class="main mb-3 container">
                    <div class="row data_display">
                        <div class="col-12 col-md-6" v-for="(item, index) in filterData[currentPage]" :key="index">
                            <div class="attractions">
                                <div class="ZoneImg" :style="{backgroundImage: `url(${item.Picture1})`}">
                                    <div class="ZoneName">{{item.Name}}</div>
                                    <div class="InZone">{{item.Zone}}</div>
                                </div>
                                <div class="time_group">
                                    <img class="time_img" src="../assets/img/icons_clock.png" alt="">
                                    <div class="time_font">{{item.Opentime}}</div>
                                </div>
                                <div class="tag_group">
                                    <img class="tag_img" src="../assets/img/icons_tag.png" alt="">
                                    <div class="tag_font">{{item.Add}}</div>
                                </div>
                                <div class="phone_group">
                                    <img class="phone_img" src="../assets/img/icons_phone.png" alt="">
                                    <div class="phone_font">{{item.Tel}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav class="Page" aria-label="Page navigation example">
                        <ul class="button_group d-flex justify-content-center">
                            <li class="page-item"><a class="page-link" href="#" @click.prevent="pageNextAndPrev('Prev')">Prev</a></li>
                            <li class="page-item" :class="{active : currentPage === page - 1}" v-for="(page, index) in filterData.length" :key="index">
                                <a class="page-link" href="#" @click.prevent="currentPage = page - 1">{{page}}</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#" @click.prevent="pageNextAndPrev('Next')">Next</a></li>
                        </ul>
                    </nav>
                </div>
                <maps id="map" :zone="currentZone" :markers="makersArr"/>
            </div>  <!--row  -->
            <div class="gotop" @click="scrollToTop(1000)">
                <font-awesome-icon  :icon="['fa', 'angle-up']" size="5x"/>
            </div>
        </div>   <!-- container -->

        <div class="footer">
            <div class="name text-center">高雄旅遊網</div>
            <div class="source text-center"> <a href="https://khh.travel/">資訊來源 : 高雄旅遊網</a></div>
        </div>
    </div>
</template>

<style scoped>
@import url('../assets/home.scss');
</style>

<script>
import Vue from 'vue'
import axios from 'axios'
import maps from './googleMap'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleUp)
Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  components: {
    maps,
    Loading
  },
  data () {
    return {
      data: [],
      currentPage: 0,
      locations: [],
      currentZone: '三民區',
      items: [],
      makersArr: [
        {
          lat: 22.653272, lng: 120.314511
        },
        {
          lat: 22.957633, lng: 120.470461
        }
      ],
      isLoading: false
    }
  },
  methods: {
    getAPIData () {
      const vm = this
      this.isLoading = true
      axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97').then(response => {
        vm.data = response.data.result.records
        vm.getZoneList()
        this.isLoading = false
      }).catch(error => {
        this.isLoading = false
        console.log(error)
      })
    },
    getZoneList () {
      const vm = this
      const locations = new Set()
      vm.data.forEach(item => {
        locations.add(item.Zone)
      })
      vm.locations = Array.from(locations)
    },
    pageNextAndPrev (str) {
      const vm = this
      let page = Math.ceil(vm.items.length / 6 - 1)
      if (str === 'Prev' && vm.currentPage !== 0) {
        vm.currentPage--
      } else if (str === 'Next' && vm.currentPage < page) {
        vm.currentPage++
      }
    },
    scrollToTop (value) {
      const scrollHeight = window.scrollY
      const scrollStep = Math.PI / (value / 15)
      const cosParameter = scrollHeight / 2
      let scrollCount = 0
      let scrollMargin = 0
      let scrollInterval = setInterval(function () {
        if (window.scrollY !== 0) {
          scrollCount = scrollCount + 1
          scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep)
          window.scrollTo(0, (scrollHeight - scrollMargin))
        } else {
          clearInterval(scrollInterval)
        }
      }, '15')
    }
  },
  computed: {
    filterData () {
      const vm = this

      if (vm.currentZone !== '') {
        vm.items = vm.data.filter(item => {
          return item.Zone === vm.currentZone
        })
      } else {
        vm.items = vm.data
      }

      const newData = []
      vm.makersArr = []
      vm.items.forEach((item, i) => {
        if (i % 6 === 0) {
          newData.push([])
        }
        const page = parseInt(i / 6)
        newData[page].push(item)
        if (vm.currentPage === page) {
          vm.makersArr.push({ lat: parseFloat(item.Py), lng: parseFloat(item.Px), title: item.Name })
        }
      })

      return newData
    }
  },
  created () {
    const vm = this
    vm.getAPIData()
  }
}
</script>
