module.exports = {
    catchKey: "gameCatchKey",
    catchData: {
        uid: null,
        archivedFile: [],//存档数据
        residueChessNum: 0,//剩余棋子数量
        currentLevel: 1
    },
    _isInit: false,
    initLocalStorage() {
        if (this._isInit === false) {
            this._isInit = true;

            let saveStr = cc.sys.localStorage.getItem(this.catchKey);
            if (saveStr) {
                let saveObj = JSON.parse(saveStr);
                this.catchData.uid = saveObj.uid;
                this.catchData.archivedFile = saveObj.archivedFile;
                this.catchData.residueChessNum = saveObj.residueChessNum;
                this.catchData.currentLevel = saveObj.currentLevel;

            } else {
                this.catchData.archivedFile = [3, 4, 5, 10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27,
                    28, 29, 30, 31, 32, 33, 34, 35, 38, 39, 40, 45, 46, 47];
                this.catchData.residueChessNum = 32;
                this.catchData.uid = null;
                this.catchData.currentLevel = 1;
            }
        } else {
            console.log("[GameLocalStorage] has init");
        }
    },
    setUid(data) {
        this.catchData.uid = data;
        this._save();
    },
    getUid() {
        return this.catchData.uid;
    },

    setArchivedFile(data) {
        this.catchData.archivedFile = data;
        this._save();
    },
    getArchivedFile() {
        return this.catchData.archivedFile;
    },
    setCurrentLevel(data) {
        this.catchData.currentLevel = data;
        this._save();
    },
    getCurrentLevel() {
        return this.catchData.currentLevel;
    },
    setResidueChessNum(data) {
        this.catchData.residueChessNum = data;
        this._save();
    },
    getResidueChessNum() {
        return this.catchData.residueChessNum;
    },

    _save() {
        let saveStr = JSON.stringify(this.catchData);
        cc.sys.localStorage.setItem(this.catchKey, saveStr);
    },


};