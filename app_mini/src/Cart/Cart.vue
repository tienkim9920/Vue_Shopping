<template lang="">
<div class="Cart">
    <div class="banner bannerCart">
    </div>

    <div class="pb-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                    <!-- Shopping cart table -->
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col" class="border-0 bg-light">
                                        <div class="p-2 px-3 text-uppercase">Product</div>
                                    </th>
                                    <th scope="col" class="border-0 bg-light">
                                        <div class="py-2 text-uppercase text-center">Price</div>
                                    </th>
                                    <th scope="col" class="border-0 bg-light">
                                        <div class="py-2 text-uppercase text-center">Quantity</div>
                                    </th>
                                    <th scope="col" class="border-0 bg-light">
                                        <div class="py-2 text-uppercase text-center">Remove</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-if="idUser">
                                <!-- Component cha sẽ lấy data từ component con truyền lên trong qua key là onDeleteCart -->
                                <ListCart :ListCart="carts" @onDeleteCart="onDeleteCart" @upCount="upCount" @downCount="downCount" />
                            </tbody>
                        </table>
                    </div>
                    <!-- End -->
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ListCart from './Component/ListCart'
import alertify from 'alertifyjs'

export default {
    name: 'Cart',

    data() {
        return {
            carts: [],
            idUser: ''
        }
    },
    created () {
        
        if (sessionStorage.getItem('idUser')){
            console.log("123")
        }else{
            this.idUser = this.$store.state.idTemp
            this.carts = this.$store.state.carts
        }

    },

    methods: {
        onDeleteCart(data) {
            console.log("value: ", data.idUser)
            console.log("value: ", data.idProduct)

            if (sessionStorage.getItem('idUser')){
                console.log("ádsadasdasdasdasd")
            }else{
            
                const index = this.carts.findIndex(value => {
                    return value.idProduct === data.idProduct
                })

                console.log(index)

                this.$store.commit('deleteToCart', index)

                alertify.set('notifier','position', 'bottom-left');
                alertify.error('Bạn Đã Xóa Hàng Thành Công');
            }
        },

        upCount(data) {
            console.log("Count: ", data.count)

            this.$store.commit('updateToCart', data)
        },

        downCount(data) {
            console.log("Count: ", data.count)

            this.$store.commit('updateToCart', data)
        }
    },

    //Dùng để import component
    components: {
        ListCart
    }
}
</script>

<style>

.remove_item i{
    padding: .7rem 1rem;
}

.remove_item i:hover{
    color: #ffffff !important;
    background-color: #212529 !important;
    cursor: pointer;
    transition: all .5s ease-in-out;
    border-radius: .5rem;
}

.bannerCart {
    background-image: url(../Global/Image/banner4.jpeg);
}

td{
    text-align: center;
}

</style>
