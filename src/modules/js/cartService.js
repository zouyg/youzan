import fetch from 'js/fetch.js'
import url from 'js/api.js'

class Cart {
    static add(id){
        return fetch(url.cartAdd, {
            id,
            number: 1
        })
    }

    static reduce(id){
        return fetch(url.cartReduce, {
            id,
            number: 1
        })
    }

    static remove(arr){
        let ids = []
        arr.forEach(item => {
            ids.push(item.id)
        });
    }
}

export default Cart