<script>
import VueBarcode from 'vue-barcode';

export default {
    components:{
        VueBarcode
    },
    data: ()=>({
        idn:'00000'
    }),
    mounted(){
        this.$store.commit('setBarcode', localStorage.getItem('g1.barcode'))
    },
    computed: {
        idNumber: {
            get(){
                return this.$store.state.barcode
            },
            set(v){
                this.$store.commit('setBarcode', String(Number(v)| 0).padStart(5, '0').substring(0, 5))
            }
        }
    },
    render(){
        return (
            <div class="w-full flex ">
                <div class="mx-auto rounded-lg my-4 shadow-md ">
                    <VueBarcode height={70} format="CODE39" value={'950'+this.$store.state.barcode} />
                    <div class="flex flex-row  items-center w-full rounded-b-lg overflow-hidden" >
                        <span class=" bg-primary-600 dark:bg-slate-800 rounded-bl-lg text-white h-full p-2">950</span>
                        <input maxlength="6" vModel={this.idNumber} class="grow border-0 rounded-br-lg bg-white p-2  outline-none" type="text" />
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
