<template>
  <div id="container">
  <transition><alert ref="alert"></alert></transition>
  <v-app id="inspire" v-if="isLogin">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-group prepend-icon="person" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-title>人力资源</v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-for="(item, i) in humanResourceList"
              :key="i"
              @click="currentComponent='PeopleManagement'"
            >
              <v-list-tile-title v-text="item"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>研发中心OA系统</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
            <v-menu offset-y left>
              <v-btn
                slot="activator"
                flat
              >
              <span>admin</span>
              <v-icon>arrow_drop_down</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile
                  v-for="(item, index) in userOptions"
                  :key="index"
                  @click="handleUserOptions()"
                >
                   <v-list-tile-action>
                      <v-icon color="pink">{{item.icon}}</v-icon>
                   </v-list-tile-action>
                   <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
               </v-list>
            </v-menu>
     </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-flex text-xs-center>
            <component :is="currentComponent" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app inset>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
  <login v-if="!isLogin" @login="isLogin=true;"></login>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import PeopleManagement from './components/humanResource/PeopleManagement';
import Login from './Login';
import Alert from './components/shared/Alert'
//import Login from './components/Login';
const humanResourceList = ['人员管理'];

export default {
  name: 'App',
  data () {
    return {
      isLogin:false,
      drawer:null,
      currentComponent:"PeopleManagement",
      humanResourceList,
      userOptions:[{title:"登出",icon:"power_settings_new"}]
    }
  },
  methods:{
    handleUserOptions(index) {
      this.isLogin = false;
      window.sessionStorage.removeItem("isLogin");
    }
  },
  components: {
    Login,
    //HelloWorld,
    PeopleManagement,
    Alert
  },
  beforeMount() {
      let isLogin = window.sessionStorage.getItem("isLogin");
      if (isLogin === "true") {
          this.isLogin = true;
      } else {
          this.isLogin = false;
      }     
  },
  watch:{
    isLogin:function(newValue){
      console.log("isLogin",newValue);
    }
  }
}
</script>
