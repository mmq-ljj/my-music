import {
    SET_FULL_SCREEN,
    SET_MINI_PLAYER,
    SET_LIST_PLAYER,
    SET_IS_PLAYING,
    SET_MODE_TYPE,
    SET_SONG_DETAIL,
    SET_SONG_LYRIC,
    SET_DEL_SONG,
    SET_CURRENT_INDEX,
    SET_CURRENT_TIME,
    SET_FAVORITE_SONG,
    SET_FAVORITE_LIST,
    SET_HISTORY_SONG,
    SET_HISTORY_LIST
} from './mutations-type'
import { getSongDetail, getSongLyric, getSongURL } from '../api/index';

export default {
    // setFullScreen({ commit }, flag) {
    //     commit('changeFullScreen', flag)
    //   }
    setFullScreen({ commit }, flag) {
        commit(SET_FULL_SCREEN, flag)
    },
    setMiniPlayer({ commit }, flag) {
        commit(SET_MINI_PLAYER, flag)
    },
    setListPlayer({ commit }, flag) {
        commit(SET_LIST_PLAYER, flag)
    },
    setIsPlaying({ commit }, flag) {
        commit(SET_IS_PLAYING, flag)
    },
    setModeType({ commit }, flag) {
        commit(SET_MODE_TYPE, flag)
    },
    // 获取歌曲详情
    async setSongDetail({ commit }, ids) {
        // let { data: res } = await this.$http.get(`song/detail?ids=${ids}`)
        // 获取多首歌的详情
        let result = await getSongDetail({ ids: ids.join(',') })
        // 获取多首歌的地址
        let urls = await getSongURL({ id: ids.join(',') });
        // console.log(urls);
        let list = []
        result.songs.forEach((value, index) => {
            let obj = {}
            // obj.url = urls.data[index].url
            for (let j = 0; j < urls.data.length; j++) {
                //  item 循环出来的每一个播放地址
                let item = urls.data[j]
                if (value.id === item.id) {
                    obj.url = item.url
                    break
                }
            }
            obj.id = value.id
            obj.name = value.name
            let singer = ''
            value['ar'].forEach((item, index) => {
                if (index === 0) {
                    singer = item.name
                } else {
                    singer += '-' + item.name
                }
            })
            obj.singer = singer
            obj.picUrl = value['al'].picUrl
            list.push(obj)
        })
        commit(SET_SONG_DETAIL, list)
    },
    // 获取歌词
    async getSongLyric({ commit }, id) {
        let result = await getSongLyric({ id: id })
        // console.log(result.lrc.lyric);
        // let { data: res } = await this.$http.get(`/lyric?id=${id}`)
        // console.log(res);
        let obj = parseLyric(result.lrc.lyric)
        // console.log(obj);
        commit(SET_SONG_LYRIC, obj)
    },
    // 根据索引 删除列表播放页面 对应歌曲
    setDelSong({ commit }, index) {
        commit(SET_DEL_SONG, index)
    },
    // 通过索引 切换列表歌曲
    setCurrentIndex({ commit }, index) {
        commit(SET_CURRENT_INDEX, index)
    },
    // 调用mutations里SET_CURRENT_TIME这个方法去修改 当前播放时间
    setCurrentTime({ commit }, time) {
        commit(SET_CURRENT_TIME, time)
    },
    // 添加歌曲到喜欢列表里
    setFavoriteSong({ commit }, song) {
        commit(SET_FAVORITE_SONG, song)
    },
    // 在created生命周期里 调用该方法 再通过commit去调用mutations里的方法修改state里的喜欢列表
    setFavoriteList({ commit }, list) {
        commit(SET_FAVORITE_LIST, list)
    },
    // 在历史列表里添加已经播放过的歌曲
    setHistorySong({ commit }, song) {
        commit(SET_HISTORY_SONG, song)
    },
    //  调用该方法 再通过commit去调用mutations里的方法修改state里的历史播放列表
    setHistoryList({ commit }, list) {
        commit(SET_HISTORY_LIST, list)
    },
}
// 格式化歌词方法
function parseLyric(lrc) {
    let lyrics = lrc.split('\n')
    // [00:00.000] 作曲 : 林俊杰
    // 1.定义正则表达式提取[00:00.000]
    let reg1 = /\[\d*:\d*\.\d*\]/g
    // 2.定义正则表达式提取 [00
    let reg2 = /\[\d*/i
    // 3.定义正则表达式提取 :00
    let reg3 = /\:\d*/i
    // 4.定义对象保存处理好的歌词
    let lyricObj = {}
    lyrics.forEach(function (lyric) {
        // 1.提取时间
        let timeStr = lyric.match(reg1)
        if (!timeStr) { return }
        timeStr = timeStr[0]
        // 2.提取分钟
        let minStr = timeStr.match(reg2)[0].substr(1)
        // 3.提取秒钟
        let secondStr = timeStr.match(reg3)[0].substr(1)
        // 4.合并时间, 将分钟和秒钟都合并为秒钟
        let time = parseInt(minStr) * 60 + parseInt(secondStr)
        // 5.处理歌词
        let text = lyric.replace(reg1, '').trim()
        // 6.保存数据
        lyricObj[time] = text
    })
    return lyricObj
}