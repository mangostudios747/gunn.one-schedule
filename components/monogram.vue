<script>
const colors = ['bg-lime-400', 'bg-fuchsia-300', 'bg-sky-500', 'bg-amber-400', 'bg-violet-400', 'bg-emerald-500']
export default {
  props: {
    user: {
      type: Object
    }, small: {
      type: Boolean,
      default: false,
    },
    huge:{
      type:Boolean,
      default:false
    },
    name:{
      type:Boolean,
      default:false
    },
    icon: {
      type:Boolean,
      default: true
    }
  },
  data: () => ({
    popup: false,
    id: Math.random() // unique component ID
  }),
  computed: {
    n() {
      return Number(this.user.firstName?.charCodeAt(0) || (this.user.lastName?.charCodeAt(0) || 0)) % colors.length
    }
  },
  render() {
    const popup = ()=>( <div
      class="absolute z-20 w-40 text-sm font-normal cursor-auto animate-slide-left popup text-center justify-around flex flex-col top-0 left-full ml-1 shadow-lg bg-water/10 backdrop-blur-md border-[0.5px] border-water/20 text-white rounded-lg px-3 py-2">
      <div class="flex flex-row justify-around">
        <div
          class={`rounded-full justify-center text-center relative  shrink-0 flex ${colors[this.n]} text-white font-semibold text-base w-10 h-10`}>
          <span class="my-auto">{(this.user.firstName || [])[0]}{(this.user.lastName || [])[0]}</span>
        </div>
      </div>
      <div class="text-base">{[this.user.firstName, this.user.lastName].join(' ')}</div>
      <div class="inline-flex gap-1 mx-auto flex-row">
              <span
                class={`h-3 my-auto w-3 rounded-full  ${this.user.eliminated ? 'bg-red-500' : 'bg-green-500'}`}/>
        <span class="my-auto">{this.user.eliminated ? 'Eliminated' : 'Alive'}</span>
      </div>
      <div>{[this.user.kills, ' kill', this.user.kills !== 1 ? 's' : ''].join('')}</div>
        <div>#{this.user.rank} rank</div>
    </div>
    )
    return (
      <div class="inline-flex  gap-2 relative" >
        {this.icon && <div
          vOn:click={() => (!this.huge && this.$store.commit('elimination/setPopup', {id: this.id, type: 0}))}
          class={`rounded-full popup-trigger ${!this.huge && 'cursor-pointer hover:shadow-md'} justify-center text-center relative  shrink-0 inline-flex ${colors[this.n]} text-white font-semibold  ${this.small ? 'w-6 h-6 grow text-xs' : (this.huge ? 'w-16 h-16 text-2xl tracking-wide' : 'w-7 h-7 text-xs')}`}>
          <span class="my-auto">{(this.user.firstName || [])[0]}{(this.user.lastName || [])[0]}</span>
          <span
            class={`absolute ${this.small ? 'h-2 w-2 bottom-0 right-0' : (this.huge ? 'h-5 w-5 bottom-0.5 right-0.5' : 'h-3 w-3 -bottom-0.5 -right-0.5')} rounded-full  ${this.user.eliminated ? 'bg-red-500' : 'bg-green-500'}`}/>
          {this.$store.state.elimination.popup.id === this.id && this.$store.state.elimination.popup.type === 0 && popup()}
        </div>}
        {this.name && <span vOn:click={() => (this.$store.commit('elimination/setPopup', {id:this.id, type:1}))} class="popup-trigger font-semibold  cursor-pointer my-auto hover:underline">{this.user.firstName} {this.user.lastName}</span>}
        {this.$store.state.elimination.popup.id === this.id && this.$store.state.elimination.popup.type===1 && popup()}
        { !(this.icon || this.name) && <div vOn:click={() => (this.$store.commit('elimination/setPopup', {id:this.id, type:2}))} class="popup-trigger bg-white/10 font-semibold text-xs px-0.5 rounded-md cursor-pointer hover:bg-white/30">@{this.user.userID}
          {this.$store.state.elimination.popup.id === this.id && this.$store.state.elimination.popup.type===2 && popup()}
        </div>

        }
      </div>
    )
  },
}
</script>
