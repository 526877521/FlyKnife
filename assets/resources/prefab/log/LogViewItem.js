cc.Class({
    extends: cc.Component,

    properties: {
        word: {displayName: "提示语", default: null, type: cc.Label},

    },


    onLoad() {

    },

    start() {

    },
    runLogAction(str) {
        this.word.string = str;
        let delay = cc.delayTime(2);
        let remove = cc.removeSelf(true);
        let seq = cc.sequence([delay, remove]);
        this.node.runAction(seq);
    },

    // update (dt) {},
});
