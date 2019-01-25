<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md2>
          <v-text-field label="员工编号" v-model="search.code"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md2>
          <v-select :items="items" label="学历" v-model="search.degree"></v-select>
        </v-flex>
        <v-flex xs12 sm6 md2>
          <time-picker label="出生日期"></time-picker>
        </v-flex>
        <v-flex xs12 sm6 md2>
          <time-picker label="参加工作时间"></time-picker>
        </v-flex>
        <v-flex xs12 sm6 md2>
          <time-picker label="进入设计院时间"></time-picker>
        </v-flex>
        <v-flex xs12 sm6 md2>
          <time-picker label="合同到期时间"></time-picker>
        </v-flex>
        <v-btn color="primary" dark class="mb-2">查询</v-btn>
        <v-btn color="primary" dark class="mb-2">重置</v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
    import timePicker from "../shared/timePicker"
    export default {
        data() {
            return {
                items:["专科","本科","硕士研究生","博士研究生"],
                search:{
                    code:"",
                    degree:"",
                }
            }
        },
        inject:['peopleManagementComp'],
        components:{
          timePicker
        }
    }
</script>