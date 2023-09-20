// Perbedaan Methods dan Computed adalah computed dijalankan/ dipanggil satu kali karena function yang dipanggil tidak menggunakan (). Sedangkan Methods dapat menjalankan fungsi secara terus menerus karena fungsi yang dipanggil menggunakan ().
Vue.component('price', {
    data: function () {
        return {
         }
    },
    props: {
        value: Number,
        prefix: {
            type: String,
            default: 'Rp. '
        },
        precision: {
            type: Number,
            default: 2
        }
    },
    template: '<span>{{ this.prefix + Number.parseFloat(this.value).toFixed(this.precision) }}</span>'
})

var app = new Vue({
    el: '#app',
    data: {
        maximum: 50,
        products: null,
        cart: [],
        slugText: 'The Quick #{!&@ Brown 29',
        style: {
            label: ['fw-bold', 'mb-2'],
            inputWidth : 80,
            sliderStatus : false
        }
    },
    mounted: function() {
        fetch('https://hplussport.com/api/products/order/price')
        .then(response => response.json())
        .then(data => {
            this.products = data
        })
    },
    filters: {
        currencyFormat: function (value) {
            return "$ " + Number.parseFloat(value).toFixed(2)
        }
    },
    computed: {
        slugetize: function () {
            return this.slugText
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-') + ' - ' + this.now();
        },
        sliderState: function () {
            return this.style.sliderStatus ? 'd-flex' : 'd-none'
        },
        cartTotal: function () {
            let sum = 0
            for(key in this.cart) {
                sum = sum + (this.cart[key].product.price * this.cart[key].qty)
            }
            return sum
        },
        cartQty: function () {
            let qty = 0
            for(key in this.cart) {
                qty = qty + this.cart[key].qty
            }
            return qty
        }
    },
    methods: {
        now: function () {
            var date = new Date();
            return(
                String(date.getHours()) + "/" +
                String(date.getMinutes()) + "/" +
                String(date.getSeconds())
            )
        },
        addItem: function (product) {
            var productIndex;
            var productExist = this.cart.filter(function (item, index) {
                if (item.product.id == Number(product.id)) {
                    productIndex = index
                    return true
                } else {
                    return false
                }
            })

            if (productExist.length) {
                this.cart[productIndex].qty++
            } else {
                this.cart.push({product : product, qty: 1})
            }
        },
        deleteItem: function (key) {
            if (this.cart[key].qty > 1) {
                this.cart[key].qty--
            } else {
                this.cart.splice(key, 1)
            }
        }
    }
})