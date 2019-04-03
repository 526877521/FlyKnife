module.exports = {
    isVisitor: false,
    token: null,// 用户token
    serverTime: null,
    isGreenHand: true,
    playInfo: {
        uid: null,
        nickName: "",
        avatarUrl: "",//头像
        gender: 0,//性别
        level: 0,
        gameId: 6,

    },
    leftPanelItem:{
        mainPositionId: 200001,
    },
    enterMainWay: "",//进入到主场景的方式
    playerGameState: {
        soundOn: false,
        shakeOn: false,
    },
    share: null,
    appId: null,
    directFun: false,//正在跳转场景
    watchVideoInfo: {
        watchVideoCount: 0,
    }
};