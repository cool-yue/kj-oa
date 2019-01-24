<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-group
            prepend-icon="person"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>人力资源</v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-for="(item, i) in humanResourceList"
              :key="i"
              @click=""
            >
              <v-list-tile-title v-text="item"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>OA系统</v-toolbar-title>
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
</template>

<script>
import HelloWorld from './components/HelloWorld';
import PeopleManagement from './components/humanResource/PeopleManagement';
//import Login from './components/Login';
const humanResourceList = ['人员管理'];

export default {
  name: 'App',
  data () {
    return {
      drawer:null,
      currentComponent:"PeopleManagement",
      humanResourceList
    }
  },
  components: {
    HelloWorld,
    PeopleManagement
  },
}
</script>
