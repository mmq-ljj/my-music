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
// 获取歌手单曲
export const getArtistsSongs = (data) => Network.get('/artists', data)
// 获取榜单
export const getTopListDetail = () => {
    return new Promise(function (resolve, reject) {
        let category = {
            officialList: [
                { name: '云音乐飙升榜', id: 3 },
                { name: '云音乐新歌榜', id: 0 },
                { name: '网易原创歌曲榜', id: 2 },
                { name: '云音乐热歌榜', id: 1 }
            ],
            recList: [
                { name: '云音乐说唱榜', id: 23 },
                { name: '云音乐电音榜', id: 25 },
                { name: '云音乐欧美新歌榜', id: 32 },
                { name: '抖音排行榜', id: 26 },
                { name: '云音乐ACG音乐榜', id: 22 },
                { name: '云音乐古典音乐榜', id: 24 }
            ],
            globalList: [
                { name: '美国Billboard周榜', id: 6 },
                { name: 'UK排行榜周榜', id: 5 },
                { name: 'Beatport全球电子舞曲榜', id: 21 },
                { name: '日本Oricon周榜', id: 10 },
                { name: 'iTunes榜', id: 8 },
                { name: '英国Q杂志中文版周榜', id: 29 }
            ],
            otherList: [
                { name: 'KTV唛榜', id: 7 },
                { name: '法国 NRJ Vos Hits 周榜', id: 19 },
                { name: '新声榜', id: 27 },
                { name: '云音乐韩语榜', id: 28 },
                { name: '电竞音乐榜', id: 30 },
                { name: '云音乐欧美热歌榜', id: 31 }
            ],
            // titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
            titles: { officialList: '官方榜', recList: '推荐榜' }
        }
        Network.get('toplist/detail')
            .then(function (data) {
                // console.log(data);
                data.list.forEach(function (obj) {
                    let flag = false
                    for (let key in category) {
                        for (let i = 0; i < category[key].length; i++) {
                            if (category[key][i].name === obj.name) {
                                category[key][i].rank = obj
                                flag = true
                                break
                            }
                        }
                        if (flag) {
                            break
                        }
                    }
                })
                // console.log(category);
                resolve(category)
            })
            .catch(function (err) {
                reject(err)
            })
    })
}
// 获取榜单歌曲
export const getTopList = (data) => Network.get('toplist/detail', data)
// 输入框搜索 返回内容
export const getSearchList = (data) => Network.get('search?type=1', data)
// 热搜列表
export const getSearchHot = () => Network.get('search/hot', ) 




