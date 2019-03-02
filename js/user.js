class User {


    /**
     * @param {String} login
     */
    constructor(login) {
        this._items = [];
        this._trophies = [];
        this._commandsAuthorized = [COMMAND_TYPE.CAT, COMMAND_TYPE.CD, COMMAND_TYPE.EXIT, COMMAND_TYPE.HELP, COMMAND_TYPE.LS]; // five basics commands already available
        this._login = login;
        this._currentLocation = Place.home; //null if not initialized
        this._currentQuest = null;
    }

    get currentQuest() {
        return this._currentQuest;
    }

    set currentQuest(value) {
        this._currentQuest = value;
    }

    /**
     * @param {Item} item To add to user items.
     */
    addItem(item) {
        this.items.push(item);
        this.items.sort();
    }

    /**
     * @param {String} trophy To add to user trophies.
     */
    addTrophy(trophy) {
        this.trophies.push(trophy);
    }

    /**
     * @param {COMMAND_TYPE} command To add to user allowed commands.
     */
    addCommand(command) {
        this.commandsAuthorized.push(command);
    }

    /**
     * @return {String} User login.
     */
    get login() {
        return this._login;
    }

    /**
     * @return {Item[]} Items owned by the user.
     */
    get items() {
        return this._items;
    }

    /**
     * @return {String[]} Quests name finished by the user.
     */
    get trophies() {
        return this._trophies;
    }

    /**
     * @return {COMMAND_TYPE[]} Commands allowed.
     */
    get commandsAuthorized() {
        this._commandsAuthorized.sort();
        return this._commandsAuthorized;
    }

    /**
     * @return {Place} The current place.
     */
    get currentLocation() {
        return this._currentLocation;
    }

    /**
     * @param {Place} place New current place/location.
     */
    set currentLocation(place) {
        this._currentLocation = place;
    }

    /**
     * @param {String} placeName To update the current location.
     * @return {boolean} True if the update is possible (if value place is contained in the current location).
     */
    moveTo(placeName) {
        switch (placeName) {
            case "." :  // current location
                return true;
            case"..":   // parent
                if (this.currentLocation.parent === null)
                    return false;
                this.currentLocation = this.currentLocation.parent;
                return true;
            case "~" :  // home
                if (Place.home !== null) {
                    this.currentLocation = Place.home;
                    return true;
                }
                break;
            case  "/":  // root
                if (Place.root !== null) {
                    this.currentLocation = Place.root;
                    return true;
                }
                break;

            default : // son
                for (let p of this.currentLocation.places)
                    if (p.name === placeName) { //contains
                        this.currentLocation = p;
                        return true;
                    }
                break;
        }
        return false;
    }

    /**
     * @param entityName
     * @return
     */
    read(entityName) {
        for (let e of this.currentLocation.entities)
            if (entityName === e.name) {
                return e.text
            }
        return "";
    }

    /**
     * @param {String }questName Name of the quest to launch.
     * @return {INFO} FOUND if the quest exists and the launching succeed,
     * UNAVAILABLE if a quest is already launched and UNKNOWN if the quest doesn't exist.
     */
    launch(questName) {
        if (this.currentQuest == null) {
            for (let q of this.currentLocation.quests)
                if (q.name === questName) {
                    if(q.status===STATUS.DONE)
                        return INFO.FINISHED;
                    q.status = STATUS.STARTED;
                    this.currentQuest = q;
                    return INFO.FOUND;
                }
            return INFO.UNKNOWN;
        }
        return INFO.UNAVAILABLE;
    }

    /**
     * @param {String } command Last command that will be compared to required commands.
     * @return {Quest} The quest if finished, null otherwise.
     */
    checkQuest(command) {
        if (this.currentQuest.commandRequired[0] === command.toString())
            this.currentQuest.commandRequired.shift(); // remove first element
        if (this.currentQuest.commandRequired.length === 0) {   // end quest
            this.currentQuest.status = STATUS.DONE;
            for (let cr of this.currentQuest.commandRewards)
                this.addCommand(cr);
            this.addTrophy(this.currentQuest.name);
            let copy = this.currentQuest;
            this.currentQuest = null;
            return copy;
        }
        return null;
    }
}