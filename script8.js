// Perbedaan Methods dan Computed adalah computed dijalankan/ dipanggil satu kali karena function yang dipanggil tidak menggunakan (). Sedangkan Methods dapat menjalankan fungsi secara terus menerus karena fungsi yang dipanggil menggunakan ().

var app = new Vue({
    el: '#app',
    data: {
        maximum: 50,
        products: null,
        cart: [],
        slugText: 'The Quick #{!&@ Brown 29',
        style: {
            label: ['fw-bold', 'mb-2'],
            inputWidth : 60,
            sliderStatus : true
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
        }
    },
    methods: {
        now: function() {
            var date = new Date();
            return(
                String(date.getHours()) + "/" +
                String(date.getMinutes()) + "/" +
                String(date.getSeconds())
            )
        },
        addItem: function (products) {
            this.cart.push(products)
        }
    }
})