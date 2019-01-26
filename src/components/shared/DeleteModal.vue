<template>
    <!--<v-layout row justify-center>-->
    <v-dialog
      v-model="value"
      max-width="400"
      persistent 
    >
      <v-card>
        <v-card-title class="grey lighten-2"></v-card-title>

        <v-card-text class="headline">
          <v-icon color="red" medium class="mr-2">warning</v-icon>
          <span>{{content}} </span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="$emit('input',false)"
          >
            {{cancelButtonText}}
          </v-btn>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="$emit('input',false);$emit('delete')"
          >
            {{submitButtonText}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!--</v-layout>-->

</template>

<script>
    export default {
        name:"deleteModal",
        props:{
            title:{
                type:String,
                default:"删除"
            },
            content:{
                type:String,
                default:"确认删除吗?"
            },
            cancelButtonText:{
                type:String,
                default:"取消"
            },
            submitButtonText:{
                type:String,
                default:"删除"
            },
            value:{
                type:Boolean
            }
        }
    }
</script>