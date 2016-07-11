var _super = require("./roles")

class Upgrader extends _super {
    setupBody() {
        // Creeps body parts http://support.screeps.com/hc/en-us/articles/208333929-StructureSpawn#canCreateCreep
        this._body = [WORK, CARRY, MOVE];
        this._memory = {role: 'upgrader'};
        this._idleSpot = {x: 40, y: 40};
        this._min = 2;
    }

    run(creep) {
        if (_super.shouldSuicide(creep)) {
            creep.suicide();
        }
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    } 
}

module.exports = new Upgrader();