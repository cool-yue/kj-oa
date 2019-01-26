<template>
  <div id="alertContainer" v-if="show">
    <v-alert
      :value="type ==='success'"
      type="success"
    >
      {{message}}
    </v-alert>

    <v-alert
      :value="type ==='info'"
      type="info"
    >
       {{message}}
    </v-alert>

    <v-alert
      :value="type === 'warning'"
      type="warning"
    >
       {{message}}
    </v-alert>

    <v-alert
      :value="type === 'error'"
      type="error"
    >
       {{message}}
    </v-alert>
  </div>
</template>
<script>
     export default {
         data() {
             return {
                 show:false
             }
         },
         props:{
             type:{
                type:String,
                default:"success"
             },
             message:{
                 type:String,
                 default:"操作成功"
             }
         }
     }
</script>
<style scoped>
#alertContainer {
    position:fixed;
    min-width:160px;
    top:-10px;;
    left:40%;
    right:40%;
    z-index:999;
}
</style>