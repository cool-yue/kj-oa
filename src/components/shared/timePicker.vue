<template>
  <div>
  <v-text-field v-if="readonly" :label="label" v-model="date" readonly></v-text-field>
  <v-menu v-if="!readonly"
    ref="menu"
    :close-on-content-click="false"
    v-model="menu"
    :nudge-right="40"
    :return-value.sync="date"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
  <v-text-field
    slot="activator"
    v-model="date"
    :label="label"
    prepend-icon="event"
    readonly
  ></v-text-field>
  <v-date-picker v-model="date" no-title scrollable locale="zh-cn">
    <v-spacer></v-spacer>
    <v-btn flat color="primary" @click="date=''">重置</v-btn>
    <v-btn flat color="primary" @click="menu = false">取消</v-btn>
    <v-btn flat color="primary" @click="$refs.menu.save(date);$emit('input',date)">确认</v-btn>
  </v-date-picker>
</v-menu>
</div>
</template>

<script>
    export default {
      data: () => ({
        date:'',
        //date: new Date().toISOString().substr(0, 10),
        menu: false
      }),
      props:{
        label:String,
        value:String,
        readonly:Boolean
      },
      watch:{
        value:function(newValue,oldValue) {
          this.date = newValue;
        },
        date:function(newValue) {
        }
      }
    }
</script>