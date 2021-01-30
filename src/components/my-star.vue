<template>
  <div class="container">
    <div id="qrcode"></div>
  </div>
</template>
<script>

import QRCode from 'qrcodejs2';
export default {
  name: "my-star",
  props: ['myurl'],

  data() {
    return {
      text: this.myurl
    }
  },

  methods: {
    qrcode() {
      // console.log(this.text);
      // alert(this.myurl)
      // 和div的id相同 必须是id  class类名会报错
      // 第二参数是他的配置项
      let qrCode = new QRCode('qrcode', {
        width: 100,
        height: 100,
        text: this.myurl,
        colorDark: '#ccc',
        colorLight: '#35619f'
      })
    }
  },
  mounted() {
    this.qrcode(); //调用二维码生成的方法
  },

};
</script>
<style scoped lang='less'>
.container {
  width: 100%;
}
</style>
