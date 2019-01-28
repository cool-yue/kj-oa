<template>
  <div id="alertContainer">
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
    width:100%;
    text-align:center;
}
</style>