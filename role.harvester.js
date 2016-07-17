var _super = require("./roles")

class Harvester extends _super {
    setupBody() {
        // Creeps body parts http://support.screeps.com/hc/en-us/articles/208333929-StructureSpawn#canCreateCreep
        this._body = [WORK, CARRY, CARRY, MOVE, MOVE];
        this._memory = {role: 'harvester', harvesting: true};
        this._idleSpot = {x: 30, y: 30};
        this._min = 2;
    }

    run(creep) {
        if (_super.shouldSuicide(creep)) {
            creep.suicide();
        }

        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory['harvesting'] = false;
        }

        if (creep.memory['harvesting'] == true) {
            creep.memory.idle = false;
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_TOWER ) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                creep.memory.idle = false;
                var transferRes = creep.transfer(targets[0], RESOURCE_ENERGY);
                if (transferRes == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                } else if (transferRes == OK) {
                    creep.memory['harvesting'] = true;
                }
            } else {
                if (!creep.memory.idle) {
                    creep.moveTo(this._idleSpot.x, this._idleSpot.y);
                    if (creep.pos.x == this._idleSpot.x && creep.pos.y == this._idleSpot.y) {
                        creep.memory.idle = true;
                    }
                }
            }
        }
    }
}

module.exports = new Harvester();