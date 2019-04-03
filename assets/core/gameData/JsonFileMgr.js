let JsonFileCfg = require('JsonFileCfg');
module.exports = {
    getStageLevel(residueChessNum) {
        let stageLevelData = JsonFileCfg.file.stageLevel.data.data;
        for (let i = 0; i < stageLevelData.length; i++) {
            let residueChess = stageLevelData[i]["residueChess"];
            if (residueChess == residueChessNum) {
                return stageLevelData[i];
            }
        }
        return null;
    },
    getLevelStageTip(id) {
        let stageLevelData = JsonFileCfg.file.stageLevel.data.data;
        for (let i = 0; i < stageLevelData.length; i++) {
            let stageLevelId = stageLevelData[i]["id"];
            if (stageLevelId == id) {
                return stageLevelData[i];
            }
        }
        return null;
    }
};
