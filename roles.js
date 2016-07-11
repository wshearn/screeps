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
        if (creep.fatigue > 0) {
            return false;
        }
    }
}

module.exports = Roles;