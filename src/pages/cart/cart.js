import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import mixin from 'js/mixin.js'
import axios from 'axios'
import url from 'js/api.js'
import Velocity from 'velocity-animate'
import Cart from 'js/cartService.js'
import fetch from 'js/fetch.js'

new Vue({
  el: '.container',
  data: {
    lists: null,
    total: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
    removeMsg: ''
  },
  created() {
    this.getList()
  },
  computed: {
    allSelected: {
      get() {
        if (this.lists && this.lists.length) {
          return this.lists.every(shop => {
            return shop.checked
          })
        }
        return false
      },
      set(newVal) {
        this.lists.forEach(shop => {
          shop.checked = newVal
          shop.goodsList.forEach(item => {
            item.checked = newVal
          })
        })
      }
    },
    allRemoveSelected: {
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newVal) {
        if(this.editingShop){
          this.editingShop.removeChecked = newVal
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal
          })
        }
      }
    },
    selectLists() {
      if(this.lists&&this.lists.length){
        let arr = []
        let total = 0
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if(good.checked) {
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
        this.total = total
        return arr
      }
      return []
    },
    removeLists() {
      if(this.editingShop) {
        let arr = []
        this.editingShop.goodsList.forEach(good => {
          if (good.removeChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    }
  },
  methods: {
    getList() {
      axios.post(url.cartLists).then(res => {
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true
          shop.removeChecked = false
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.goodsList.forEach(item => {
            item.checked = true
            item.removeChecked = false
          })
        })
        this.lists = lists
      })
    },
    selectItem(shop, item){
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      item[attr] = !item[attr]
      shop[attr] = shop.goodsList.every(item => {
        return item[attr]
      })
    },
    selectShop(shop){
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(item => {
        item[attr] = shop[attr]
      })
    },
    selectAll() {
      let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
      this[attr] = !this[attr]
    },
    edit(shop, shopIndex) {
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.lists.forEach((item, i) => {
        if(shopIndex !== i) {
          item.editing = false
          item.editingMsg = shop.editing ? '' : '编辑'
        }
      })
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : -1
    },
    reduce(item){
      if(item.nubmer === 1) return
      Cart.reduce(item.id).then(res => {
        item.number--
      })
    },
    add(item) {
      Cart.add(item.id).then(res => {
        item.number++
      })
    },
    remove(shop, shopIndex, item, itemIndex) {
      this.removePopup = true
      this.removeData = {shop, shopIndex, item, itemIndex}
      this.removeMsg = '确定要删除该商品吗?'
    },
    removeList() {
      this.removePopup = true
      this.removeMsg = `确定将所选${this.removeLists.length}个商品删除?`
    },
    removeConfirm(){
      if(this.removeMsg === '确定要删除该商品吗?'){
        let {shop, shopIndex, item, itemIndex} = this.removeData
        fetch(url.cartRemove, {
          id: item.id
        }).then(res => {
          shop.goodsList.splice(itemIndex, 1)
          if(!shop.goodsList.length) {
            this.lists.splice(shopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }else{
        let ids = []
        this.removeLists.forEach(item => {
          ids.push(item.id)
        })
        axios.post(url.cartMremove, {
          ids
        }).then(res => {
          let arr = []
          this.editingShop.goodsList.forEach(item => {
            let index = this.removeLists.findIndex(removedItem => {
              return item.id === removedItem.id
            })
            if(index === -1){
              arr.push(item)
            }
          })
          if(arr.length) {
            this.editingShop.goodsList = arr
          }else{
            this.lists.splice(this.editingShopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }
    },
    removeShop() {
      this.editingShop = null
      this.editingShopIndex = -1
      this.lists.forEach(shop => {
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    },
    start(e, item){
      item.startX = e.changedTouches[0].clientX
    },
    end(e, shopIndex, item, itemIndex){
      let endX = e.changedTouches[0].clientX
      let left = '0'
      if(item.startX - endX > 100){
        left = '-60px'
      }
      if(endX - item.startX > 100) {
        left = '0px'
      }
      Velocity(this.$refs[`goods-${shopIndex}-${itemIndex}`], {
        left
      })
    }
  },
  mixins: [mixin]
})
