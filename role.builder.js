var _super = require("./roles")

class Builder extends _super {
    setupBody() {
        // Creeps body parts http://support.screeps.com/hc/en-us/articles/208333929-StructureSpawn#canCreateCreep
        this._body = [WORK, CARRY, MOVE];
        this._memory = {role: 'builder', building: false};
        this._idleSpot = {x: 40, y: 40};
        this._min = 1;
    }

    run(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
            // Try withdrawing from structures first
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_CONTAINER ) &&
                        structure.energy > 0;
                }
            });
            if (targets.length > 0) {
               _super.withdraw(creep, targets[0], RESOURCE_ENERGY);
            } else {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        }
    } 
}

module.exports = new Builder();