<template>
  <div id="app">
    <v-app id="inspire">
        <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>空间公司研发中心办公系统</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                      <v-text-field prepend-icon="person" name="login" label="用户名" type="text" v-model="username"></v-text-field>
                      <v-text-field prepend-icon="lock" name="password" label="密码" id="password" type="password" v-model="password" @keydown.native.enter="login"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="login">登录</v-btn>
                </v-card-actions>
                </v-card>
            </v-flex>
            </v-layout>
        </v-container>
        </v-content>
    </v-app>
  </div>
</template>
<script>
  const url="/login";
  export default {
    data() {
      return {
            username:"",
            password:""
          }
    },
    methods:{
        login() {
            fetch(url,{
                method:"post",
                headers:{
                    "Content-Type":"application/json;charset=utf-8;"
                },
                body:JSON.stringify({password:this.password,username:this.username})
            }).then( res => {
                console.log(res);
                this.$emit('login');
                window.sessionStorage.setItem("isLogin",true);
                this.$notify("success","登录成功");
            }).catch(function(err) {
                console.log("err",err);
                console.log("password or username is wrong!");
            });
        }
    }
}
</script>
<style>
</style>