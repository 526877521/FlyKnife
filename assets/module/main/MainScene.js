let Observer = require("Observer");
window.Game = window.Game || {};
cc.Class({
    extends: cc.Component,

    properties: {
        hero: {default: null, displayName: "主角", type: cc.Node},
        circlePanel: {default: null, displayName: "转盘", type: cc.Node},
        knife: {default: null, displayName: "小刀", type: cc.Prefab},
    },
    onLoad() {
        Game.MainScene = this;
        //开启碰撞检测
        cc.director.getCollisionManager().enabled = true;
        this.addListener();
    },
    //初始化触摸事件
    addListener() {
        this.node.on("touchstart", this._touchStart, this);
        this.node.on("touchmove", this._touchMove, this);
        this.node.on("touchend", this._touchEnd, this);
        this.node.on("touchcancel", this._touchEnd, this);
    },
    //鼠标点击
    _touchStart() {
        this.hero.setScale(0.5);
        //刀开始旋转
        this._circle();
    },
    _touchMove(event) {
        //let timgNode = this.node.getChildByName("timg")
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.hero.setPosition(pos);
    },

    _touchEnd() {
        this.circlePanel.setScale(1);
        this.circlePanel.pauseAllActions();
    },
    //向转盘上添加刀
    addKnifePrefab() {
        let knife = Game.KnifeManager.createKnife();
        knife.setScale(0.05);

        let count = this.circlePanel.childrenCount;
        console.log(" 向转盘上添加刀  此时子节点数量为", count);
        let perAngle = parseFloat((360 / (count + 1)).toFixed(2));
        for (let k = 0; k < count; k++) {
            let childNode = this.circlePanel.children[k];
            let posAngle = perAngle * k;
            let radian = parseFloat((angle1 * Math.PI / 180).toFixed(2));
            childNode.setRotation(angle1 - 120);
            let vecX = parseFloa(150 * Math.cos(radian).toFixed(2));
            childNode.setPosition(150 * Math.cos(radian), 150 * Math.sin(radian));
        }

        let angle1 = angle * count;
        let radian = angle1 * Math.PI / 180;

        knife.setPosition(150 * Math.cos(radian), 150 * Math.sin(radian));
        knife.setRotation(angle1 - 120);
        knife.getComponent(cc.PolygonCollider).tag = 1;
        this.circlePanel.addChild(knife);
    },
    /**
     * 从转盘上移除刀
     * @constructor
     *  1.修改位置  2.设置角度
     */

    subKnifePrefab(node) {
        node.getComponent(cc.PolygonCollider).tag = 11;
        node.removeFromParent(false);
        let count = this.circlePanel.childrenCount;
        let angle = (360 / count).toFixed(2);
        for (let k = 0; k < count; k++) {
            let childNode = this.circlePanel.children[k];
            let angle1 = angle * k;
            let radian = (angle1 * Math.PI / 180).toFixed(2);
            childNode.setRotation(angle1 - 120);
            childNode.setPosition(150 * Math.cos(radian), 150 * Math.sin(radian));
        }

        Game.KnifeManager.destoryKnife(node);
    },


    //旋转
    _circle() {
        if (this.runAction) {
            this.circlePanel.resumeAllActions();
        } else {
            let actionBy = cc.rotateBy(2, 360);
            this.runAction = cc.repeatForever(actionBy);
            this.circlePanel.runAction(this.runAction);
        }

    }


    // update (dt) {},
});
