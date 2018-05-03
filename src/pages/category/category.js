import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import Foot from 'components/Foot.vue'

new Vue({
  el: '#app',
  data: {
    topLists: null,
    topIndex: 0,
    subData: null,
    rankData: null
  },
  created(){
    this.getTopList()
    this.getSubList(0)
  },
  methods: {
    getTopList(){
      axios.get(url.topList).then(res => {
        this.topLists = res.data.lists
      }).catch(res => {
        console.error('Failed to get topList')
      })
    },
    getSubList(index, cid){
      this.topIndex = index
      if(index === 0){
        this.getRank()
      }else{
        axios.get(url.subList, {
          params: {'cid': cid}
        }).then(res => {
          this.subData = res.data.data
        })
      }
    },
    getRank(){
      axios.get(url.rank).then(res => {
        this.rankData = res.data.data
      })
    },
    toSearch(list){
      location.href = `search.html?id=${list.id}&keyword=${list.name}`
    }
  },
  components: {
    Foot
  },
  mixins: [mixin]
})
