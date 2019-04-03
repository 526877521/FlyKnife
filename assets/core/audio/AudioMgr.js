let AudioPlayer = require('AudioPlayer');
module.exports = {
    // 播放游戏主场景音乐
    playMainMusic() {
        let url = cc.url.raw("resources/music/BgMusicMain.mp3");
        AudioPlayer.playBackGroundMusic(url, true);
    },
};