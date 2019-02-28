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
    }

    /**
     * @param {Item} item To add to user items.
     */
    addItem(item) {
        this._items.push(item);
    }

    /**
     * @param {String} trophy To add to user trophies.
     */
    addTrophy(trophy) {
        this._trophies.push(trophy);
    }

    /**
     * @param {COMMAND_TYPE,COMMAND_TYPE[]} command To add to user allowed commands.
     */
    addCommand(command) {
        this._commandsAuthorized.push(command);
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
     * @return boolean True if the update is possible (if value place is contained in the current location).
     */
    moveTo(placeName) {
        if (placeName === ".") // current location
            return true; // no change needed
        else if (placeName === "..") // parent
        {
            this.currentLocation = this.currentLocation.parent;
            return true;
        } else
            for (let p of this.currentLocation.places)
                if (p.name === placeName) { //contains
                    this.currentLocation = p;
                    return true;
                }
        return false;
    }
}