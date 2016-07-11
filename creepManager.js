var Roles = {
    Harvester: require("./role.harvester"),
    Upgrader:  require("./role.upgrader"),
    Builder:   require("./role.builder")
}

class CreepManager {
    constructor() {
    }

    spawnCreeps() {
        for (var role in Roles) {
            var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == Roles[role].Memory.role);
            if (creeps.length < Roles[role].Min) {
                for (var spawn in Game.spawns) {
                    if (Game.spawns[spawn].canCreateCreep(Roles[role].Body) == OK) {
                        Game.spawns[spawn].createCreep(Roles[role].Body, undefined, Roles[role].Memory);
                        break;
                    }
                }
            }
        }
    }

    run() {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            for (var role in Roles) {
                if (Roles[role].Memory.role == creep.memory.role) {
                    Roles[role].run(creep);
                }
            }
        }
    }
}

module.exports = new CreepManager();