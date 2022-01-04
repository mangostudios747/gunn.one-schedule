<script>
import VueBarcode from 'vue-barcode';

export default {
    components:{
        VueBarcode
    },
    data: ()=>({
        idNumber:'00000'
    }),
    render(){
        return (
            <div class="w-full flex ">
                <div class="mx-auto my-4 shadow-md ">
                    <VueBarcode height={70} format="CODE39" value={950+(this.idNumber||'00000')} />
                    <div class="flex flex-row  items-center w-full  overflow-hidden" >
                        <span class=" bg-primary-600 rounded-bl-lg text-white h-full p-2">950</span>
                        <input vModel={this.idNumber} class="grow rounded-br-lg bg-white p-2  outline-none" type="number" />
                    </div>
                </div>
            </div>
        )
    }
}
</script>

<style>
.vue-barcode-element {
    @apply rounded-t-lg;
}
</style>