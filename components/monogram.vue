<script>
const colors = ['bg-lime-700', 'bg-rose-700', 'bg-sky-700', 'bg-amber-700', 'bg-purple-700', 'bg-emerald-700']
export default {
    props:{user:{
        type:Object
    }, small:{
        type:Boolean,
        default:false,
    }},
    data:()=>({
        popup: false,
        id:Math.random() // unique component ID
    }),
    computed:{
        n(){
            return Number(this.user.firstName?.charCodeAt(0) || (this.user.lastName?.charCodeAt(0) || 0)) % colors.length
        }
    },
    render() {
        return (
            <div vOn:click={()=>(this.$store.commit('elimination/setPopup', this.id))} class={`rounded-full popup-trigger cursor-pointer justify-center text-center relative  shrink-0 flex ${colors[this.n]} text-white font-semibold text-xs ${this.small?'w-6 h-6 grow':'w-7 h-7'}`}>
                <span class="my-auto">{(this.user.firstName||[])[0]}{(this.user.lastName||[])[0]}</span>
                <span class={`absolute ${this.small?'h-2 w-2 bottom-0 right-0':'h-3 w-3 -bottom-0.5 -right-0.5'} rounded-full  ${this.user.eliminated?'bg-red-500':'bg-green-500'}`}/>
                {this.$store.state.elimination.popup === this.id && <div class="absolute w-40 cursor-auto animate-slide-left popup flex flex-col left-full ml-1 shadow-lg bg-water/10 backdrop-blur-md border border-water/20 text-white rounded-lg px-3 py-2">
                    <div class="flex flex-row justify-around">
                        <div class={`rounded-full justify-center text-center relative  shrink-0 flex ${colors[this.n]} text-white font-semibold text-xs w-8 h-8`}>
                        <span class="my-auto">{(this.user.firstName||[])[0]}{(this.user.lastName||[])[0]}</span>
                        </div>
                    </div>
                    <div class="text-base">{[this.user.firstName, this.user.lastName].join(' ')}</div>
                </div>}
            </div>
        )
    },
}
</script>
