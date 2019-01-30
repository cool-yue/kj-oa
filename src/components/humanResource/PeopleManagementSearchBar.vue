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
          <time-picker label="出生日期" v-model="search.bornDate"></time-picker>
        </v-flex>
        <v-flex xs12 sm6 md2>
          <time-picker label="参加工作时间" v-model="search.joinWorkDate"></time-picker>
        </v-flex>
        <v-flex xs12 sm6 md2>
          <time-picker label="进入设计院时间" v-model="search.joinSjyDate"></time-picker>
        </v-flex>
        <v-flex xs12 sm6 md2>
          <time-picker label="合同到期时间" v-model="search.contractEndDate"></time-picker>
        </v-flex>
        <v-flex xs12 sm12 md12>
        <div class="text-xs-center">
          <v-btn color="primary" dark class="mb-2" @click="searchRequest">查询</v-btn>
          <v-btn color="primary" dark class="mb-2" @click="resetAllField">重置</v-btn>
        </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
    import timePicker from "../shared/timePicker";
    import { transferLocalData } from "./model.js";
    export default {
        data() {
            return {
                items:["专科","本科","硕士研究生","博士研究生"],
                search:{
                    code:"",
                    degree:"",
                    bornDate:"",
                    joinWorkDate:"",
                    joinSjyDate:"",
                    contractEndDate:""
                }
            }
        },
        inject:['peopleManagementComp'],
        components:{
          timePicker
        },
        methods:{
          resetAllField() {
              Object.keys(this.search).forEach((key)=>{
                this.search[key] = "";
              });
              this.peopleManagementComp.humanList = this.peopleManagementComp.cachedHumanList;
              this.peopleManagementComp.isSearch = false;
          },
          searchRequest() {
            if (!this.hasSetValue) return;
            let queryParam = Object.assign({},this.search);
            for (let key in queryParam) {
              if(!queryParam[key]) {
                  delete queryParam[key];
              }
            }
            this.peopleManagementComp.search(queryParam);
          }
        },
        computed:{
            hasSetValue() {
              return !!(this.search.code || this.search.degree || this.search.bornDate || this.search.joinWorkDate || this.search.joinSjyDate || this.search.contractEndDate);
            }
        }
    }
</script>