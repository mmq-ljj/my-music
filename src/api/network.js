import axios from 'axios'

// 进行全局配置
// 请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// 请求超时时间
axios.defaults.timeout = 3000

// 封装自己的get/post方法
export default {
    get: function (path = '', data = {}) {
        return new Promise(function (resolve, reject) {
            axios.get(path, {
                params: data
            })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                })
        })
    },
    post: function (path = '', data = {}) {
        return new Promise(function (resolve, reject) {
            axios.post(path, data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                })
        })
    },
    all: function (list) {
        return new Promise(function (resolve, reject) {
          axios.all(list)
            .then(axios.spread(function (...result) {
              // 两个请求现在都执行完成
              resolve(result)
            }))
            .catch(function (err) {
              reject(err)
            })
        })
      }
}
