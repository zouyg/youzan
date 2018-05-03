import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import qs from 'qs'
import Swipe from 'components/Swipe.vue'

let {id} = qs.parse(location.search.substr(1))

let detailTab = ['商品详情', '本店成交']
let vm = new Vue({
  el: '#app',
  data: {
    details: null,
    swipeLists: [],
    detailTab,
    tabIndex: 0,
    dealLists: null
  },
  created(){
    this.getDetails()
  },
  methods: {
    getDetails(){
      axios.get(url.details, {
        params: {id}
      }).then(res => {
        let data = res.data.data
        this.details = data
        this.details.imgs.forEach(item => {
          this.swipeLists.push({
            img: item,
            clickUrl: ''
          })
        })
      })
    },
    getDeal(){
      axios.get(url.deal, {
        params: { id }
      }).then(res => {
        this.dealLists = this.data.lists
      })
    },
    switchTab(index){
      this.tabIndex = index;
      if(index === 1){
        this.getDeal()
      }
    }
  },
  components: {
    Swipe
  },
  mixins: [mixin]
})

