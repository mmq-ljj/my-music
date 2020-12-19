// 这个JS文件就是专门用于管理请求各种接口地址的
import Network from './network'

export const getBanner = () => Network.get('banner?type=2')
export const getSongDetail = (data) => Network.get('song/detail', data)
export const getSongLyric = (data) => Network.get('lyric', data)
export const getSongURL = (data) => Network.get('song/url', data)



