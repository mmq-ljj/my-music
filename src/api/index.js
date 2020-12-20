// 这个JS文件就是专门用于管理请求各种接口地址的
import Network from './network'

export const getBanner = () => Network.get('banner?type=2')
export const getSongDetail = (data) => Network.get('song/detail', data)
export const getSongLyric = (data) => Network.get('lyric', data)
export const getSongURL = (data) => Network.get('song/url', data)
// export const getHotArtists = () => Network.get('/top/artists?offset=0&limit=5')
// 获取热门歌手的ajax请求
export const getHotArtists = () => {
    return new Promise(function (resolve, reject) {
        Network.get('/top/artists?offset=0&limit=5')
            .then(function (result) {
                resolve(result.artists)
            })
            .catch(function (err) {
                reject(err)
            })
    })
}
// 获取指定字母歌手的ajax请求
export const getLetterArtists = (letter) => {
    return new Promise(function (resolve, reject) {
        let lettersArtists = []
        Network.all([
            Network.get(`artist/list?offset=0&limit=5&type=-1&area=7&initial=${letter}`),
            Network.get(`artist/list?offset=0&limit=5&type=-1&area=96&initial=${letter}`),
            // Network.get(`artist/list?offset=0&limit=5&cat=1001&initial=${letter}`),
            // Network.get(`artist/list?offset=0&limit=5&cat=1002&initial=${letter}`),
            // Network.get(`artist/list?offset=0&limit=5&cat=1003&initial=${letter}`),
            // Network.get(`artist/list?offset=0&limit=5&cat=2001&initial=${letter}`),
            // Network.get(`artist/list?offset=0&limit=5&cat=2002&initial=${letter}`),
            // Network.get(`artist/list?offset=0&limit=5&cat=2003&initial=${letter}`)
        ])
            .then(function (result) {
                // console.log(result);
                result.forEach(function (item) {
                    lettersArtists.push(...item.artists)
                })
                // console.log(lettersArtists);
                resolve(lettersArtists)

            })
            .catch(function (err) {
                reject(err)
            })
    })
}
// 获取所有歌手的ajax请求
export const getAllArtists = (letter) => {
    return new Promise(function (resolve, reject) {
        let keys = ['热']
        let list = [getHotArtists()]
        for (let i = 65; i < 91; i++) {
            let char = String.fromCharCode(i)
            // console.log(char);
            keys.push(char)
            list.push(getLetterArtists(char))
        }
        Network.all(list)
            .then(function (result) {
                let obj = {}
                obj.keys = keys
                obj.list = result
                resolve(obj)
            })
            .catch(function (err) {
                reject(err)
            })
    })

}



