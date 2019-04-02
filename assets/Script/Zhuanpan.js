cc.Class({
    extends: cc.Component,

    properties: {
        circlePanel: {default: null, displayName: "转盘", type: cc.Node},
        knife: {default: null, displayName: "小刀", type: cc.Prefab},
    },
    onLoad() {
        //this._circle();
    },

    onBtnClickAddPrefab() {
        let knife = cc.instantiate(this.knife);
        let count = this.circlePanel.childrenCount;
        let angle = parseInt(360 / (count + 1));
        for (let k = 0; k < count; k++) {
            let childNode = this.circlePanel.children[k];
            let angle1 = angle * k;
            let radian = parseInt(angle1 * Math.PI / 180);
            childNode.setPosition(150 * Math.cos(radian), 150 * Math.sin(radian));
        }

        let angle1 = angle * count;
        let radian = angle1 * Math.PI / 180;
        knife.setPosition(150 * Math.cos(radian), 150 * Math.sin(radian));
        this.circlePanel.addChild(knife);
    },
    onBtnClickSubPrefab() {

    },


    //旋转
    _circle() {
        let actionBy = cc.rotateBy(2, -360);
        let runAction = cc.repeatForever(actionBy);
        this.circlePanel.runAction(runAction);
    }


    // update (dt) {},
});
