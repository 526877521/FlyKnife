let Util = require("Util");
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
        //刀开始旋转
        this._circle();
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
        this.hero.setScale(0.8);
        //this._transformAttack();

    },

    //开始变形成攻击形态 刀相对于父节点的角度发生改变
    _transformAttack() {
        let count = this.circlePanel.childrenCount;
        for (let k = 0; k < count; k++) {
            let childNode = this.circlePanel.children[k];
            childNode.setRotation(childNode.rotation + 90);

        }

    },
    //变成普通形态
    _tranformCommon() {
        let count = this.circlePanel.childrenCount;
        for (let k = 0; k < count; k++) {
            let childNode = this.circlePanel.children[k];
            childNode.setRotation(childNode.rotation - 90);

        }
    },
    _touchMove(event) {
        //let timgNode = this.node.getChildByName("timg")
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.hero.setPosition(pos);
    },

    _touchEnd() {
        this.hero.setScale(1);
        //this._tranformCommon();
        //this.circlePanel.pauseAllActions();
    },
    //向转盘上添加刀
    addKnifePrefab() {
        let knife = Game.KnifeManager.createKnife();
        knife.setScale(0.05);
        knife.getComponent(cc.PolygonCollider).tag = 1;

        let count = this.circlePanel.childrenCount;
        console.log(" 向转盘上添加刀  此时子节点数量为", count);
        let perAngle = parseFloat((360 / (count + 1)).toFixed(2));
        for (let k = 0; k < count; k++) {
            let childNode = this.circlePanel.children[k];
            let posAngle = perAngle * k;
            let radian = parseFloat((posAngle * Math.PI / 180).toFixed(2));
            childNode.setRotation(240 - posAngle);
            let vecX = parseInt((150 * Math.cos(radian)).toFixed());
            let vecY = parseInt((150 * Math.sin(radian)).toFixed());
            childNode.setPosition(vecX, vecY);
        }

        let newAngle = perAngle * count;
        let newRadian = parseFloat((newAngle * Math.PI / 180).toFixed(2));
        let vecX = parseInt((150 * Math.cos(newRadian)).toFixed());
        let vecY = parseInt((150 * Math.sin(newRadian)).toFixed());
        knife.setPosition(vecX, vecY);
        knife.setRotation(240 - newAngle);
        this.circlePanel.addChild(knife);
    },
    /**
     * 从转盘上移除刀
     * @constructor
     *  1.修改位置  2.设置角度
     */

    subKnifePrefab(subNode) {
        subNode.getComponent(cc.PolygonCollider).tag = 11;
        subNode.removeFromParent(false);
        let count = this.circlePanel.childrenCount;
        let perAngle = (360 / count).toFixed(2);
        for (let k = 0; k < count; k++) {
            let childNode = this.circlePanel.children[k];
            let posAngle = perAngle * k;
            let radian = parseFloat((posAngle * Math.PI / 180).toFixed(2));
            childNode.setRotation(240 - posAngle);
            let vecX = parseInt((150 * Math.cos(radian)).toFixed());
            let vecY = parseInt((150 * Math.sin(radian)).toFixed());
            childNode.setPosition(vecX, vecY);
        }


        subNode.setScale(0.08);
        let randomNumber = Util.randomByMaxValue(30);
        subNode.setPosition(subNode.x + 1.3 * randomNumber, subNode.y + 1.5 * randomNumber);
        subNode.parent = this.node;


        //Game.KnifeManager.destoryKnife(node);
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
