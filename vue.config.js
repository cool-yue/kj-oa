module.exports = {
  devServer:{
      proxy:{
          "/pqms":{
            target:"http://10.6.172.179:8080/",
            changeOrigin : true
          }
      }
  }
}