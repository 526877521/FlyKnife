cc.Class({
    extends: cc.Component,

    properties: {
        zhujue  : cc.Node
    },

    update (dt) {
        this.node.x = this.zhujue.x;
        this.node.y = this.zhujue.y;
    },
});
