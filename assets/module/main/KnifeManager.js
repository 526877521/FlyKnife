/**
 * 控制刀的生成   生成的位置 依附于大地图
 *  1.生成刀的种类
 *  2.生成刀的数量
 */
window.Game = window.Game || {};
let Util = require("Util");
cc.Class({
    extends: cc.Component,

    properties: {
        knifePre: {displayName: "刀预制体", default: null, type: cc.Prefab},
    },

    onLoad() {
        Game.KnifeManager = this;
        //创建对象池
        this.knifeNodePool = new cc.NodePool();
        let initCount = 5;
        for (let i = 0; i < initCount; ++i) {
            let knife = cc.instantiate(this.knifePre); // 创建节点
            this.knifeNodePool.put(knife); // 通过 put 接口放入对象池
        }

        this.schedule(this.randomGenetateKnife, 3);

    },

    //随机生成刀 父节点为大图
    randomGenetateKnife() {
        let maxWidth = this.node.width * 0.7;
        let maxHeight = this.node.height * 0.7;
        let randomX = Util.randomByMaxValue(maxWidth);
        let randomY = Util.randomByMaxValue(maxHeight);

        let knife = this.createKnife();
        //设置碰撞tag
        knife.getComponent(cc.PolygonCollider).tag = 11;
        knife.setScale(0.08);
        knife.setPosition(randomX, randomY);
        knife.parent = this.node;

    },
    //生成
    createKnife: function () {
        let knife = null;
        if (this.knifeNodePool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            knife = this.knifeNodePool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            knife = cc.instantiate(this.knifePre);
        }
        return knife;
    },
    /**
     * 刀碰撞到障碍物  从转盘上移除  放置到大地图上
     * @param node
     */
    destoryKnife(node) {
        this.knifeNodePool.put(node);
    }

    // update (dt) {},
});
