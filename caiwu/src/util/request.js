import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
const instance = axios.create({
	baseURL: 'http://192.168.20.100:8094'
})

// 请求拦截器
instance.interceptors.request.use(
	config => {
		console.log('request:', config)
		return config
	},
	error => {
		// 对请求错误做些什么
		console.log('request error:', error)
		return Promise.reject(error)
	}
)

// 响应拦截器
instance.interceptors.response.use(
	response => {
		console.log('response:', response.data)
		return response.data
	},
	error => {
		// 对响应错误做点什么
		Message({message: error, type: 'error', duration: 1000})
		console.log('response error:', error)
		return Promise.reject(error)
	}
)

export default instance
