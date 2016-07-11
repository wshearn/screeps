var creepManager = require('./creepManager');

module.exports.loop = function () {
    for (var name in Memory.spawns) {
        if (!Game.spawns[name]) {
            console.log("Destroying: " + name);
            delete Memory.spawns[name];
        }
    }
    creepManager.spawnCreeps();
    creepManager.run();
}