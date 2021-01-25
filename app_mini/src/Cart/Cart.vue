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
                            <tbody v-if="state.idUser">
                                <!-- Component cha sẽ lấy data từ component con truyền lên trong qua key là onDeleteCart -->
                                <ListCart :ListCart="state.carts" @onDeleteCart="onDeleteCart" @upCount="upCount" @downCount="downCount" />
                            </tbody>
                        </table>
                    </div>

                    <div class="d-flex justify-content-end pt-5">
                        <a class="btn_Order" @click="redirectOrder">Order</a>
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
import CartAPI from '../API/CartAPI'
import queryString from 'query-string'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    name: 'Cart',

    setup() {

        //Khai báo 2 thằng này sau đó đưa nó vào reactive
        //để mỗi lần xử lý nó đều load lại data
        let idUser = ref('')
        let carts = ref([])

        let deleteCart = ref({
            idUser: '',
            idProduct: ''
        })

        let updateCart = ref({
            isUpdate: false
        })

        let state = reactive({
            idUser,
            carts,
            deleteCart,
            updateCart
        })
        
        const store = useStore()
        const router = useRouter()

        if (!sessionStorage.getItem('idUser')){

            //Lấy dữ liệu từ Vuex đưa vào reactive state
            state.idUser = computed(() => store.state.idTemp)
            state.carts = computed(() => store.state.carts)

        }
        
        //Hàm này để chạy lần đầu nếu có session thì nó sẽ load ra dữ liệu
        watch(() => {

            if (sessionStorage.getItem('idUser')){
            
                const fetchData = async () => {
                    
                    const response = await CartAPI.getAllCart(sessionStorage.getItem('idUser'))
                    state.carts = response
                    state.idUser = sessionStorage.getItem('idUser')
        
                }

                fetchData()

            }

        })

        //Hàm này sẽ chạy dựa vào state có thay đổi hay không
        //Dùng để load lại dữ liệu sau khi delete
        watch(state.deleteCart, () => {
            
            if (state.deleteCart.idProduct !== ''){
                console.log("Bạn Đã Thay Đổi Dữ Liệu")

                const fetchData = async () => {
                    
                    const response = await CartAPI.getAllCart(sessionStorage.getItem('idUser'))
                    state.carts = response
                    state.idUser = sessionStorage.getItem('idUser')
        
                }

                fetchData()

            }
        })

        //Hàm này sẽ chạy dưa vào state có thay đổi hay không
        //Dùng để load lại dữ liệu sau khi update
        watch(state.updateCart, () => {

            if (state.updateCart.isUpdate){
                console.log("Bạn Đã Thay Đổi Dữ Liệu")

                const fetchData = async () => {
                    
                    const response = await CartAPI.getAllCart(sessionStorage.getItem('idUser'))
                    state.carts = response
                    state.idUser = sessionStorage.getItem('idUser')

                    state.updateCart.isUpdate = false
                }

                fetchData()

                

            }

        })


        const onDeleteCart = (data) => {
            console.log("Value: ", data)

            
            if (sessionStorage.getItem('idUser')){

                const idUser = data.idUser

                const params = {
                    idProduct: data.idProduct
                }

                const query = idUser + '?' + queryString.stringify(params)

                const deleteCart = async () => {

                    const response = await CartAPI.deleteCart(query)

                    console.log(response)

                    //Thay Đổi state deleteCart để nó gọi lại hàm watch phụ thuộc vào state.deleteCart
                    state.deleteCart.idUser = data.idUser
                    state.deleteCart.idProduct = data.idProduct

                }

                deleteCart()
                
            }else{

                //Khi user chưa đăng nhập thì sẽ xử lý bằng vuex
                //Tìm ra index và đưa vào vuex để xử lý xóa dữ liệu
                const index = state.carts.findIndex(value => {
                    return value.idProduct === data.idProduct
                })

                console.log(index)

                store.commit('deleteToCart', index)
            }

            
            alertify.set('notifier','position', 'bottom-left');
            alertify.error('Bạn Đã Xóa Hàng Thành Công');

        }


        //Hàm này dùng để tăng số lượng
        const upCount = (data) => {
            console.log("Value: ", data)

            if (sessionStorage.getItem('idUser')){
                console.log("Ban Da Dang Nhap!")
                
                const updateCart = async () => {
                    
                    const idUser = data.idUser

                    const params = {
                        idProduct: data.idProduct,
                        count: data.count
                    }

                    const query = idUser + "?" + queryString.stringify(params)

                    const response = await CartAPI.updateCart(query)
                    console.log(response)

                    //Thay đổi state để chạy lại hàm watch update
                    state.updateCart.isUpdate = true

                }   

                updateCart()

            }else{
                store.commit('updateToCart', data)
            }

            alertify.set('notifier','position', 'bottom-left');
            alertify.success('Bạn Đã Sửa Hàng Thành Công');

        }

        //Hàm này dùng để giảm số lượng
        const downCount = (data) => {
            console.log("Value: ", data)

            if (sessionStorage.getItem('idUser')){
                console.log("Ban Da Dang Nhap!")

                const updateCart = async () => {
                    
                    const idUser = data.idUser

                    const params = {
                        idProduct: data.idProduct,
                        count: data.count
                    }

                    const query = idUser + "?" + queryString.stringify(params)

                    const response = await CartAPI.updateCart(query)
                    console.log(response)

                    //Thay đổi state để chạy lại hàm watch update
                    state.updateCart.isUpdate = true

                }   

                updateCart()

            }else{
                store.commit('updateToCart', data)
            }

            alertify.set('notifier','position', 'bottom-left');
            alertify.success('Bạn Đã Sửa Hàng Thành Công');
        }

        const redirectOrder = () => {
            
            if (sessionStorage.getItem('idUser')){
                router.push('/cart/order')
            }else{
                
                alertify.set('notifier','position', 'bottom-left');
                alertify.error('Vui Lòng Kiểm Tra Đăng Nhập');

            }

        }


        return { state, onDeleteCart, upCount, downCount, redirectOrder }

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

.btn_Order{
    background-color: #212529;
    color: #ffffff !important;
    padding: .6rem 6rem;
    font-size: 1.5rem;
    cursor: pointer;
}

.btn_Order:hover{
    background-color: rgb(26, 26, 26);
    color: #ffffff !important;
    transition: all .3s ease-in-out;
}

</style>
