import mode from './modeType';
export default {
    isFullScreen: false,      // 播放歌曲的主页面
    isShowMiniPlayer: false,  // 是否展示底部播放器
    isShowListPlayer: false,  // 是否展示列表播放器
    isPlaying: false,         // 是否播放歌曲
    modeType: mode.loop,      // 控制播放歌曲的模式
    songs: [],                // 歌曲列表
    currentSong: {},          // 当前播放的歌曲
    currentIndex: 0,          // 当前播放的歌曲索引
    currentLyric: {},         // 当前播放的歌曲的歌词
    curTime: 0,               // 当前播放的时间
    favoriteList: [],         // 喜欢歌曲的列表
    historyList: [],          // 歌曲播放历史列表
}