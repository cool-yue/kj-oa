<template>
  <div>
   <people-management-search-bar/>
   <v-toolbar flat color="white">
      <v-toolbar-title>人员管理</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="700px">
        <v-btn slot="activator" color="primary" dark class="mb-2">添加人员</v-btn>

        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.code" label="编号" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.userName" label="姓名" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.gender" label="性别" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.racial" label="民族" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                 <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.birthOrigin" label="籍贯" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select :items="degreeItems" v-model="editedItem.degree" label="学历" :readonly="isViewDetail"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select :items="politicalItems" label="政治面貌" v-model="editedItem.political" :readonly="isViewDetail"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.identityNum" label="身份证号" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tel" label="电话" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.graduateSchool" label="毕业学校" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.graduateDate" label="毕（肄）业时间" :readonly="isViewDetail"></time-picker>
                </v-flex>
                 <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.major" label="所学专业" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.joinWorkDate" label="参与工作时间" :readonly="isViewDetail"></time-picker>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.workAge" label="工龄" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.joinSjyDate" label="进入设计院时间" :readonly="isViewDetail"></time-picker>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select :items="contractTypeItems" v-model="editedItem.contractType" label="合同类型" :readonly="isViewDetail"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.contractEndDate" label="合同到期时间" :readonly="isViewDetail"></time-picker>
                </v-flex>
                <v-flex xs12 sm12 md12><div></div></v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.currentTitle" label="现任专业技术资格名称" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.currentTitleGetDate" label="取得资格时间" :readonly="isViewDetail"></time-picker>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.currentTitleHireDate" label="聘任起始时间" :readonly="isViewDetail"></time-picker>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.preTitle" label="低一级专业技术资格名称" :readonly="isViewDetail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.preTitleGetDate" label="取得资格时间" :readonly="isViewDetail"></time-picker>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.preTitleGetHireDate" label="聘任起始时间" :readonly="isViewDetail"></time-picker>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close" >{{ closeModal }}</v-btn>
            <v-btn color="blue darken-1" flat @click="save" v-if="!isViewDetail || editedIndex === -1">确定</v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>
      <input type="file" ref="file" v-show="false" @change="handleImport($event)"/>
      <v-btn  color="primary" dark class="mb-2" @click="importItem">批量导入</v-btn>
      <v-btn  color="error" dark class="mb-2" @click="showDelete" :disabled="deleteActivate">删除</v-btn>
    </v-toolbar>

  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="humanList"
    item-key="uid"
    select-all
    :pagination.sync="tableDefaultSetting"
    :total-items = "total"
    class="elevation-1"
    @update:pagination = "handlePagination"
  >
    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          primary
          hide-details
        ></v-checkbox>
      </td>
      <!--<td class="text-xs-center">{{ props.item.uid }}</td>-->
      <td>{{ props.item.userName }}</td>
      <td class="text-xs-center">{{ props.item.age }}</td>
      <td class="text-xs-center">{{ props.item.gender }}</td>
      <td class="text-xs-center">{{ props.item.degree }}</td>
      <td class="text-xs-center">{{ props.item.code }}</td>
      <td class="text-xs-center">{{ props.item.tel }}</td>
      <td class="text-xs-center">{{ props.item.joinWorkDate }}</td>
      <td class="text-xs-center">{{ props.item.joinSjyDate }}</td>
      <td class="text-xs-center">{{ props.item.contractEndDate }}</td>
      <td class="justify-center layout px-0">
          <v-icon
            small
            class="ml-2 mr-2"
            title="编辑"
            @click="showItem(props.item,false)"
          >
            edit
          </v-icon>
          <!--
          <v-icon
            small
            title="删除"
            class="mr-2"
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
          -->
          <v-icon
            small
            title="详情"
            @click="showItem(props.item,true)"
          >
            details
          </v-icon>
      </td>
    </template>
  </v-data-table>
  <delete-modal v-model="showDeleteModal" @delete="deleteItem"></delete-modal>
  </div>
</template>
<script>
  import PeopleManagementSearchBar from "./PeopleManagementSearchBar";
  import timePicker from "../shared/timePicker";
  import deleteModal from "../shared/DeleteModal";
  import { tableDefaultSetting } from "../shared/config.js";
  import {transferDatabaseData,transferLocalData} from "./model.js";
  import { hasNoKey } from '../../utils/utils.js';
  export default {
    name:"peopleManagement",
    data () {
      return {
        showDeleteModal:false,
        isViewDetail:false,
        tableDefaultSetting,
        politicalItems:["群众","共青团员","中共党员"],
        degreeItems:["专科","本科","硕士研究生","博士研究生"],
        contractTypeItems:["有固定期限","无固定期限","人才派遣","劳务派遣","劳务分包"],
        dialog: false,
        editedItem:{
          birthOrigin:"",
          code:"",
          contractEndDate: "",
          contractType:"",
          currentTitle: "",
          currentTitleGetDate: "",
          currentTitleHireDate: "",
          degree: "",
          gender: "",
          graduateDate: "",
          graduateSchool: "",
          identityNum: "",
          joinSjyDate: "",
          joinWorkDate: "",
          major: "",
          userName: "",
          political: "",
          preTitle: "",
          preTitleGetDate: "",
          preTitleGetHireDate: "",
          racial: "",
          tel: "",
          workAge: "",
          password:"123"
        },
        selected: [],
        editedIndex: -1,
        total:0,
        headers: [
          //{ text: 'id',align: 'center', value: 'uid',sortable: false},
          { text: '姓名',align: 'center',value: 'userName',sortable: false},
          { text: '年龄', value: 'age',align: 'center'},
          { text: '性别', value: 'gender', align: 'center'},
          { text: '学历', value: 'degree' ,align: 'center'},
          { text: '员工编码', value: 'code', align: 'center'},
          { text: '电话', value: 'tel', align: 'center'},
          { text: '参加工作时间', value: 'joinWorkDate' ,align: 'center'},
          { text: '进入设计院时间', value: 'joinSjyDate' ,align: 'center'},
          { text: '合同到期时间', value: 'contractEndDate' ,align: 'center'},
          { text: '操作', value: 'contractEndDate' ,align: 'center'}
        ],
        humanList: [],
        humanSearchList:[],
        cachedHumanList:[]
      }
    },
    components:{
      PeopleManagementSearchBar,
      timePicker,
      deleteModal
    },
    provide() {
      return {
        peopleManagementComp:this
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '添加人员' : this.isViewDetail?'人员详细':'编辑人员';
      },
      closeModal() {
        return this.isViewDetail === true ? "关闭" : "取消";
      },
      deleteActivate() {
        return this.selected.length === 0;
      }
    },
    methods:{
      showItem(item,isViewDetail) {
        this.isViewDetail = isViewDetail;
        this.editedIndex = this.humanList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      showDelete(item) {
        //const index = this.humanList.indexOf(item)
        //confirm('Are you sure you want to delete this item?') && this.humanList.splice(index, 1)
        this.showDeleteModal = true;
      },
      deleteItem() {
        console.log(this.selected);
        this.selected.forEach(item => {
          let index = this.humanList.indexOf(item);
          this.humanList.splice(index, 1);
        });
        this.selected = [];
      },
      importItem() {
         this.$refs.file.click();
      },
      handleImport(event) {
          console.log(event.target.files);
      },
      close () {
          this.dialog = false
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300);
          let data = transferLocalData(this.editedItem);
          console.log(data);
          fetch("/pqms/users",{
                method:"post",
                headers:{
                    "Content-Type":"application/json;charset=utf-8;"
                },
                body:JSON.stringify(data)
            }).then( res => {
                console.log(res);
                console.log("");
            }).catch(function(err) {
                console.log("err",err);
            });
      },
      save() {
        console.log(this.editedItem)
        if (this.editedIndex > -1) {
          Object.assign(this.humanList[this.editedIndex], this.editedItem)
        } else {
          this.humanList.unshift(this.editedItem)
        }
        this.close()
      },
      getUserList(page=1,rowsPerPage=10,queryParam={}) {
        let source
        // 如果没有传参数,表示是普通的查询
        // 如果有参数,表示这里是带参查询
        // 需要把之前的结果缓存,因为当点击重置的时候,会把缓存的条目重新显示出来
        if ( hasNoKey(queryParam) ) {
          this.cachedHumanList = this.humanList;
        }
        fetch(`/pqms/userslist?current=${page}&rowCount=${rowsPerPage}`,
        {
          method:"post",
          headers:{
              "Content-Type":"application/json;charset=utf-8;"
          },
          body:JSON.stringify(queryParam)
        }).then(response =>response.json()).then((response)=> {
          //console.log(response);
            this.total = response.total;
            console.log( response.total);
            let rows = response.rows.map((item)=>{
              return transferDatabaseData(item);
            })
            this.humanList = rows;
        })
      },
      handlePagination(aaa) {
          let {page,rowsPerPage} = aaa;
          this.getUserList(page,rowsPerPage,this.queryParam)
      }
    },
    beforeMount() {
        this.getUserList();
    },
    watch:{
      selected:function(newVal) {
        console.log(newVal);
      }
    }
  }
</script>