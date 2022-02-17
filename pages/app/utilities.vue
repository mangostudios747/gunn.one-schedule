<script>
import VueBarcode from 'vue-barcode';

export default {
    components:{
        VueBarcode
    },
    data: ()=>({
        idn:'00000'
    }),
    computed: {
        idNumber: {
            get(){
                return this.idn
            },
            set(v){
                this.idn = String(Number(v)| 0).padStart(5, '0').substring(0, 5)
            }
        }
    },
    render(){
        return (
            <div class="w-full flex ">
                <div class="mx-auto my-4 shadow-md ">
                    <VueBarcode height={70} format="CODE39" value={'950'+this.idn} />
                    <div class="flex flex-row  items-center w-full  overflow-hidden" >
                        <span class=" bg-primary-600 dark:bg-slate-800 rounded-bl-lg text-white h-full p-2">950</span>
                        <input maxlength="6" vModel={this.idNumber} class="grow rounded-br-lg bg-white p-2  outline-none" type="text" />
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