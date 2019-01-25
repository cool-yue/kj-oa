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
                  <v-text-field v-model="editedItem.code" label="编号"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="姓名"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.gender" label="性别"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.racial" label="民族"></v-text-field>
                </v-flex>
                 <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.birthOrigin" label="籍贯"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select :items="degreeItems" v-model="editedItem.degree" label="学历"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select :items="politicalItems" label="政治面貌" v-model="editedItem.political"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.identityNum" label="身份证号"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.tel" label="电话"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.graduateSchool" label="毕业学校"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.graduateDate" label="毕（肄）业时间"></time-picker>
                </v-flex>
                 <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.major" label="所学专业"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.joinWorkDate" label="参与工作时间"></time-picker>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.workAge" label="工龄"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.joinSjyDate" label="进入设计院时间"></time-picker>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select :items="contractTypeItems" v-model="editedItem.contractType" label="合同类型"></v-select>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <time-picker v-model="editedItem.contractEndDate" label="合同到期时间"></time-picker>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="现任职称"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="低一级职称"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">取消</v-btn>
            <v-btn color="blue darken-1" flat @click="save">确定</v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>
      <v-btn  color="primary" dark class="mb-2" @click="">批量导入</v-btn>
      <v-btn  color="error" dark class="mb-2" @click="">批量删除</v-btn>
    </v-toolbar>

  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="humanList"
    item-key="name"
    select-all
    :rows-per-page="10"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          primary
          hide-details
        ></v-checkbox>
      </td>
      <td>{{ props.item.name }}</td>
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
            class="mr-2"
            title="编辑"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            title="删除"
            class="mr-2"
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
          <v-icon
            small
            title="详情"
            @click="showDetail(props.item)"
          >
            details
          </v-icon>
      </td>
    </template>
  </v-data-table>
  </div>
</template>
<script>
  import PeopleManagementSearchBar from "./PeopleManagementSearchBar";
  import timePicker from "../shared/timePicker"
  export default {
    name:"peopleManagement",
    data () {
      return {
        politicalItems:["群众","共青团员","中共党员"],
        degreeItems:["专科","本科","硕士研究生","博士研究生"],
        contractTypeItems:["有固定期限","无固定期限","人才派遣","劳务派遣","劳务分包"],
        dialog: false,
        editedItem:{},
        selected: [],
        editedIndex: -1,
        headers: [
          { text: '姓名',align: 'center',value: 'name',sortable: false},
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
        humanList: [
          {
            name: 'A',
            age: 33,
            gender: "男",
            degree: "本科",
            code: 6666,
            tel: "13378333333",
            joinWorkDate: '2018-01-01',
            joinSjyDate:'2018-01-01',
            contractEndDate:'2018-01-01'
          },
          {
            name: 'B',
            age: 33,
            gender: "男",
            degree: "本科",
            code: 6666,
            tel: "13378333333",
            joinWorkDate: '2018-01-01',
            joinSjyDate:'2018-01-01',
            contractEndDate:'2018-01-01'
          },
          {
            name: 'C',
            age: 33,
            gender: "男",
            degree: "本科",
            code: 6666,
            tel: "13378333333",
            joinWorkDate: '2018-01-01',
            joinSjyDate:'2018-01-01',
            contractEndDate:'2018-01-01'
          },
          {
            name: 'D',
            age: 33,
            gender: "男",
            degree: "本科",
            code: 6666,
            tel: "13378333333",
            joinWorkDate: '2018-01-01',
            joinSjyDate:'2018-01-01',
            contractEndDate:'2018-01-01'
          },
          {
            name: 'E',
            age: 33,
            gender: "男",
            degree: "本科",
            code: 6666,
            tel: "13378333333",
            joinWorkDate: '2018-01-01',
            joinSjyDate:'2018-01-01',
            contractEndDate:'2018-01-01'
          },
          {
            name: 'F',
            age: 33,
            gender: "男",
            degree: "本科",
            code: 6666,
            tel: "13378333333",
            joinWorkDate: '2018-01-01',
            joinSjyDate:'2018-01-01',
            contractEndDate:'2018-01-01'
          }
        ]
      }
    },
    components:{
      PeopleManagementSearchBar,
      timePicker
    },
    provide() {
      return {
        peopleManagementComp:this
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '添加人员' : '编辑人员'
      }
    },
    methods:{
      editItem(item) {
        this.editedIndex = this.humanList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem(item) {
        const index = this.humanList.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.humanList.splice(index, 1)
      },
      close () {
          this.dialog = false
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
      },
      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
      showDetail(item) {
        console.log(item);
      },
      deleteMultiple() {}
    },
    watch:{
      selected:function(newVal) {
        console.log(newVal);
      }
    }
  }
</script>