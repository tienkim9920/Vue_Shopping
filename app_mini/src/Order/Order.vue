<template>
    <div class="banner bannerCart">
    </div>



    <div v-if="state.load.isActive" className="wrapper_loader">
        <div className="loader"></div>
    </div>

    <div class="pb-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                    <div class="row py-5 p-4 bg-white rounded shadow-sm">
                        <div class="col-lg-6">
                            <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Information</div>
                            <div class="padding_Top padding_horizontal">
                                <input type="text" v-model="state.information.fullname" placeholder="Full Name" aria-describedby="button-addon3" class="form-control border-1">
                                <span v-if="state.error.errorName" class="text-danger">* Required Full Name!</span>
                            </div>
                            <div class="padding_Top padding_horizontal">
                                <input type="email" v-model="state.information.email" placeholder="Email" aria-describedby="button-addon3" class="form-control border-1">
                                <span v-if="state.error.errorEmail" class="text-danger">* Required Email!</span>
                            </div>
                            <div class="padding_Top padding_horizontal">
                                <input type="text" v-model="state.information.address" placeholder="Address" aria-describedby="button-addon3" class="form-control border-1">
                                <span v-if="state.error.errorAddress" class="text-danger">* Required Address!</span>
                            </div>
                            <div class="padding_Top padding_horizontal pb-5">
                                <input type="text" v-model="state.information.phone" placeholder="Phone Number" aria-describedby="button-addon3" class="form-control border-1">
                                <span v-if="state.error.errorPhone" class="text-danger">* Required Phone!</span>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                            <div class="p-4">
                                <p class="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                                <ul class="list-unstyled mb-4">
                                    <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>${{ state.total }}.00</strong></li>
                                    <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Tax</strong><strong>$0.00</strong></li>
                                    <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                                        <h5 class="font-weight-bold">${{ state.total }}.00</h5>
                                    </li>
                                </ul><a class="btn btn-dark rounded-pill py-2 btn-block text-white" @click="submitOrder">Procceed to checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import CartAPI from '../API/CartAPI'
import EmailAPI from '../API/EmailAPI'
import queryString from 'query-string'
import { useRouter } from 'vue-router'

export default {
    name: 'Order',

    setup() {

        //Validation
        
        const information = ref({
            fullname: '',
            email: '',
            address: '',
            phone: ''
        })

        const error = ref({
            errorName: false,
            errorEmail: false,
            errorAddress: false,
            errorPhone: false
        })

        //Validation

        const router = useRouter()

        const load = ref({
            isActive: false
        })

        const idUser = ref('')

        const carts = ref([])

        const total = ref(0)

        const state = reactive({
            idUser: sessionStorage.getItem('idUser'),
            carts: [],
            total: 0,
            load,
            information,
            error
        })
        
        //Hàm này load ra tất cả sản phẩm mà user đã thêm vào giỏ hàng
        watch(() => {

            const fetchData = async () => {

                const response = await CartAPI.getAllCart(state.idUser)
                
                state.carts = response
                console.log(state.carts)


                for (let i = 0; i < state.carts.length; i++){
                    state.total += parseInt(state.carts[i].count) * parseInt(state.carts[i].price)
                }

                console.log(state.total)

            }

            fetchData()

        })

        //Hàm này sẽ bắt đầu gửi email xác nhận đơn hàng và đưa vào database history
        //Và nó sẽ được chạy dựa vào state.load
        watch(state.load, () => {
            console.log("Bat Dat Gui Email")

            const sendMail = async () => {
                
                const params = {
                    to: state.information.email,
                    fullname: state.information.fullname,
                    phone: state.information.phone,
                    address: state.information.address,
                    idUser: state.idUser
                }

                const query = '?' + queryString.stringify(params)

                console.log(query)

                const response = await EmailAPI.sendMail(query)
                console.log(response)

                router.push('/cart/order/success')

            }

            sendMail()

        })


        const submitOrder = () => {
            if (!state.information.fullname){
                state.error.errorName = true
                state.error.errorEmail = false
                state.error.errorAddress = false
                state.error.errorPhone = false
            }else{
                if (!state.information.email){
                    state.error.errorEmail = true
                    state.error.errorName = false
                    state.error.errorAddress = false
                    state.error.errorPhone = false
                }else{
                    if (!state.information.address){
                        state.error.errorAddress = true
                        state.error.errorPhone = false
                        state.error.errorEmail = false
                        state.error.errorName = false
                    }else{
                        if (!state.information.phone){
                            state.error.errorPhone = true
                            state.error.errorEmail = false
                            state.error.errorName = false
                            state.error.errorAddress = false
                        }else{
                            console.log("Thanh Cong")

                            //Thay đổi State loading để chạy lại hàm watch gửi email
                            state.load.isActive = true
                        }
                    }
                }
            }
        }


        return { idUser, state, total, carts, load, information, submitOrder, error }

    }
}
</script>

<style>
.bannerCart {
    background-image: url(../Global/Image/banner4.jpeg);
}

.padding_Top {
    padding-top: 2rem;
}

.padding_horizontal {
    padding-left: 2rem;
    padding-right: 2rem;
}



.wrapper_loader{
    width: 100%;
    height: 40rem;
    background-color: rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 11%;
    z-index: 999;
}

.loader {
    position: absolute;
    top: 40%;
    left: 43%;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }
  
  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
