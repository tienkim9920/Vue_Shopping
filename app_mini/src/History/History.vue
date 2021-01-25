<template lang="">
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
                                    <div class="p-2 text-uppercase">Đơn Hàng</div>
                                </th>
                                <th scope="col" class="border-0 bg-light">
                                    <div class="py-2 text-uppercase text-center">Người Đặt</div>
                                </th>
                                <th scope="col" class="border-0 bg-light">
                                    <div class="py-2 text-uppercase text-center">Địa Chỉ</div>
                                </th>
                                <th scope="col" class="border-0 bg-light">
                                    <div class="py-2 text-uppercase text-center">Giá Trị Đơn Hàng</div>
                                </th>
                                <th scope="col" class="border-0 bg-light">
                                    <div class="py-2 text-uppercase text-center">Tình Trạng</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in state.history" :key="item._id">
                                <td class="align-middle"><strong> {{ item._id  }} </strong></td>
                                <td class="align-middle"><strong> {{ item.fullname  }}</strong></td>
                                <td class="align-middle"><strong> {{ item.address  }}</strong></td>
                                <td class="align-middle"><strong>$ {{ item.total  }}</strong></td>
                                <td class="align-middle">
                                    <strong v-if="item.status"> Đã Thanh Toán </strong>
                                    <strong v-if="!item.status"> Chưa Thanh Toán </strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- End -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import HistoryAPI from '../API/HistoryAPI'

export default {
    name: 'History',

    setup() {

        const history = ref([])

        const idUser = ref('')

        const state = reactive({
            history: [],
            idUser: sessionStorage.getItem('idUser')
        })

        watch(() => {

            const fetchData = async () => {

                const response = await HistoryAPI.getHistory(state.idUser)
                state.history = response

                console.log(state.history)

            }

            fetchData()

        })

        return { history, idUser, state }

    }
}
</script>

<style>
.bannerCart {
    background-image: url(../Global/Image/banner5.jpeg);
}
</style>
