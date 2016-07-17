class Roles {
    constructor() {
        this.setupBody()
    }

    setupBody() {
        // Creeps body parts http://support.screeps.com/hc/en-us/articles/208333929-StructureSpawn#canCreateCreep
        this._body = [];
        this._memory = {};
        this._idleSpot = {x: 0, y: 0};
        this._min = 0;
    }

    run(creep) {
    }

    get Min() {
        return this._min;
    }
    
    get Memory() {
        return this._memory;
    }

    get Body() {
        return this._body;
    }

    static shouldSuicide(creep) {
        // If hostile creep in range and fatigue is low
        // no defense near and no attack parts
        // OR ttl is <100and I have the resources to spawn a replacement
        // then suicide
        if (creep.ticksToLive < 100 && _.sum(creep.carry) == 0) {
            return true;
        }
        if (creep.fatigue > 0) {
            return false;
        }
    }
    
    static withdraw(creep, target, energyType) {
        if (creep.withdraw(target, energyType) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
}

module.exports = Roles;