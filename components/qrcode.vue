<template>
  <div>
    <canvas ref="canvas"/>
  </div>
</template>

<script>
var QRCode = require('qrcode')
export default {
  name: "qrcode",
  mounted(){
    QRCode.toCanvas(this.$refs.canvas, 'sample text', function (error) {
      if (error) console.error(error)
      console.log('success!');
    })
  }
}
</script>

<style scoped>

</style>
