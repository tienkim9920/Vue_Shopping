<template>
<tr v-for="item in ListCart" :key="item._id">
    <th scope="row">
        <div class="p-2">
            <img :src=item.image alt="" width="70" class="img-fluid rounded shadow-sm">
            <div class="ml-3 d-inline-block align-middle">
                <h5 class="mb-0"><a href="#" class="text-dark d-inline-block">{{ item.name }}</a></h5>
                <!-- <span class="text-muted font-weight-normal font-italic">Category: Electronics</span> -->
            </div>
        </div>
    </th>
    <td class="align-middle"><strong>$ {{ parseInt(item.count) * parseInt(item.price)  }}</strong></td>
    <td class="align-middle">
        <button class="btn btn_quality" @click="() => downCount(item.count, item.idProduct, item.idUser)">-</button>
        &nbsp;
        <strong> {{ item.count }} </strong>
        &nbsp;
        <button class="btn btn_quality" @click="() => upCount(item.count, item.idProduct, item.idUser)">+</button>
    </td>
    <td class="align-middle">
        <a class="text-dark remove_item" @click="() => handlerDelete(item.idUser, item.idProduct)">
            <i class="fa fa-trash"></i>
        </a>
    </td>
</tr>
</template>

<script>
export default {
    name: 'ListCart',

    props: ['ListCart', 'onDeleteCart'],

    methods: {
        handlerDelete(idUser, idProduct) {

            const data = {
                idUser: idUser,
                idProduct: idProduct
            }

            //Truyền Lên Component Cha với dữ liệu là data
            this.$emit('onDeleteCart', data)
        },
        
        //Truyền data lên component cha
        upCount(value, idProduct, idUser){

            const count = parseInt(value) + 1

            const data = {
                idProduct: idProduct,
                count: count,
                idUser: idUser
            }
            
            this.$emit('upCount', data)

        },

        //Truyền data lên component cha
        downCount(value, idProduct, idUser){

            if (parseInt(value) === 1){
                return
            }

            const count = parseInt(value) - 1

            const data = {
                idProduct: idProduct,
                count: count,
                idUser: idUser
            }
            
            this.$emit('downCount', data)

        }
    },

    emits: ['onDeleteCart']
}
</script>

<style>

</style>
