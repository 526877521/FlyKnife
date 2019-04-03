/**
 *
 */
cc.Class({
    extends: cc.Component,

    properties: {},
    /**
     *  发生碰撞的情况分析
     *      1. 父节点的子节点碰撞  不进行考虑
     *      2. 非相同父节点  将碰撞到的刀scale值缩小  并添加到self的父节点上
     *      3. 障碍物 将self从父节点移除  扩大scale值
     tag:1 转盘上的刀
     tag:2 障碍物
     tag:11 大地图上的刀
     tag:3 主角
     */

    onCollisionEnter(other, self) {
        //开始进行拾取刀操作
        if (self.tag === 1 && other.tag === 11) { //转盘刀--地图刀
            Game.KnifeManager.destoryKnife(other.node);
            //拾取
            Game.MainScene.addKnifePrefab();
        } else if ((self.tag === 11 && other.tag === 1) ||//地图刀--转盘刀
            (self.tag === 11 && other.tag === 3)) { //地图刀--主角
            Game.KnifeManager.destoryKnife(self.node);
            //拾取
            Game.MainScene.addKnifePrefab();
        } else if (self.tag === 1 && other.tag === 2) {//转盘刀--障碍物
            console.log("碰撞到障碍物");
            //刀碰撞到障碍物  改变刀的父节点 scale数值
            Game.MainScene.subKnifePrefab(self.node);

        }


    },
    // update (dt) {},
});
