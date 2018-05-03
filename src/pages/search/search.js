import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'

let {keyword, id} = qs.parse(location.search.substr(1))

new Vue({
  el: '.container',
  data: {
    keyword,
    searchList: null,
    isShow: false
  },
  created(){
    this.getSearchList()
  },
  methods: {
    getSearchList(){
      axios.get(url.searchList, {
        params: {keyword, id}
      }).then(res => {
        this.searchList = res.data.lists
      })
    },
    move(){
      // console.log(document.documentElement.scrollTop)
      if(document.documentElement.scrollTop > 100){
        this.isShow = true
      }else{
        this.isShow = false
      }
    },
    toTop(){
      Velocity(document.body, 'scroll', 1000)
    }
  },
  mixins: [mixin]
})
