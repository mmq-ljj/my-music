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
export default {
    // changeFullScreen(state, flag) {
    //     state.isFullScreen = flag
    // }
    // 歌曲全屏播放界面
    [SET_FULL_SCREEN](state, flag) {
        state.isFullScreen = flag
        // 如果需要歌曲全屏的播放界面，应该关掉mini播放界面和列表播放界面
        if (flag) {
            state.isShowMiniPlayer = false
            state.isShowListPlayer = false
        }
    },
    // mini播放界面
    [SET_MINI_PLAYER](state, flag) {
        state.isShowMiniPlayer = flag
        // 如果mini播放界面显示，其他的不显示
        if (flag) {
            state.isFullScreen = false
            state.isShowListPlayer = false
        }
    },
    [SET_LIST_PLAYER](state, flag) {
        state.isShowListPlayer = flag
    },
    [SET_IS_PLAYING](state, flag) {
        state.isPlaying = flag
    },
    [SET_MODE_TYPE](state, flag) {
        state.modeType = flag
    },
    [SET_SONG_DETAIL](state, list) {
        state.songs = list
    },
    [SET_SONG_LYRIC](state, lyric) {
        state.currentLyric = lyric
    },
    // 删除列表播放页面的歌曲
    [SET_DEL_SONG](state, index) {
        // 根据索引 删除列表播放页面 对应歌曲
        if (index !== undefined) {
            state.songs.splice(index, 1)
        } else {
            // 如果删除所有歌曲 没有传入索引 
            state.songs = []
        }
        if (index < state.currentIndex) {
            state.currentIndex = state.currentIndex - 1
        }
        // 如果删除列表里所有歌曲 关闭播放三个页面
        if (state.songs.length === 0) {
            state.isFullScreen = false
            state.isShowMiniPlayer = false
            state.isShowListPlayer = false
        }
    },
    // 通过索引 切换列表歌曲
    [SET_CURRENT_INDEX](state, index) {
        if (index < 0) {
            index = state.songs.length - 1
        } else if (index > state.songs.length) {
            index = 0
        }
        state.currentIndex = index
    },
    // 设置歌曲当前播放时间的方法
    [SET_CURRENT_TIME](state, time) {
        state.curTime = time
    },
    // 添加歌曲到喜欢列表里
    [SET_FAVORITE_SONG](state, song) {
        let result = state.favoriteList.find((currentValue) => {
            return currentValue.id === song.id
        })
        if (result === undefined) {
            state.favoriteList.push(song)
        }
    },
    // 渲染喜欢列表
    [SET_FAVORITE_LIST](state, list) {
        state.favoriteList = list
    },
    // 播放历史的歌曲
    [SET_HISTORY_SONG](state, song) {
        let result = state.historyList.find((currentValue) => {
            return currentValue.id === song.id
        })
        // 如果没有这首歌
        if (result === undefined) {
            // 如果播放历史里的歌曲大于30首删掉第一首歌
            if (state.historyList.length > 30) {
                state.historyList.splice(0, 1)
            }
            state.historyList.push(song)
        }
    },
    // 播放历史的歌曲列表
    [SET_HISTORY_LIST](state, list) {
        state.historyList = list
    }
}