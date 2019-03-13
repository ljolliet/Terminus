const trophiesName = "armoire_a_trophee";
const inventory = "inventaire";
const parentConst = "..";
const placeConst = ".";
const rootConst = "/";
const homeConst = "~";
const inventoryConst = "$INVENTAIRE";

class User {


    /**
     * @param {String} login
     * @param {Item[]} items The list of Item the user own.
     * @param {Place} inventory The place corresponding to the inventory of the user.
     * @param {String[]} trophies List of trophies, corresponding to the name of the quests succeeded.
     */
    constructor(login, items, inventory, trophies) {
        this._trophies = trophies;
        this._commandsAuthorized = [COMMAND_TYPE.CAT, COMMAND_TYPE.CD, COMMAND_TYPE.EXIT, COMMAND_TYPE.HELP, COMMAND_TYPE.LS]; // five basics commands already available
        this._login = login;
        this._currentLocation = Place.home; //null if not initialized
        this._currentQuest = null;
        this._inventory = inventory;
        this.initTrophies();
        if (this.inventory !== null)
            for (let i of items)
                this.inventory.addEntity(i);
    }

    /**
     * @returns {Quest} The quest currently running, null if none.
     */
    get currentQuest() {
        return this._currentQuest;
    }

    /**
     * @param {Quest} quest To update the quest currently running.
     */
    set currentQuest(quest) {
        this._currentQuest = quest;
    }

    /**
     * @returns {Place} The inventory of the user.
     */
    get inventory() {
        return this._inventory;
    }

    /**
     * @param {Item} item To add to user items.
     */
    addItem(item) {
        this.inventory.addEntity(item);

    }

    /**
     * @param {String} trophy To add to user trophies.
     */
    addTrophy(trophy) {
        this.trophies.push(trophy);
        if (this.inventory !== null) {
            let entity;
            if ((entity = this.inventory.getEntity(trophiesName)) !== null) {
                entity.text = entity.text + trophy + "\n";
            }
        }
    }

    /**
     * @return {String[]} Quests name finished by the user.
     */
    get trophies() {
        return this._trophies;
    }

    /**
     * Init "armoire_a_trophee" with the trohies already won.
     */
    initTrophies() {
        if ((this.inventory.getEntity(trophiesName)) === null) {
            let text = "";
            for (let t of this.trophies)
                text += t + "\n";
            this.addItem(new Item(trophiesName, text));
        }
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
        let it = [];
        for (let i of this.inventory.entities)
            if (i instanceof Item)
                it.push(i);
        return it;
    }

    /**
     * @return {String} The path of the current location.
     */
    getPath(){
        return this.currentLocation.path;
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
            case placeConst :  // current location
                return true;
            case parentConst:   // parent
                if (this.currentLocation.parent === null)
                    return false;
                this.currentLocation = this.currentLocation.parent;
                return true;
            case homeConst :  // home
                if (Place.home !== null) {
                    this.currentLocation = Place.home;
                    return true;
                }
                break;
            case  rootConst :  // root
                if (Place.root !== null) {
                    this.currentLocation = Place.root;
                    return true;
                }
                break;
            case inventoryConst:
                if (this.inventory !== null) {
                    this.currentLocation = this.inventory;
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
     * @param entityName The name of the entity.
     * @return {String} The text that corresponds to the entity, "" if the name doesn't exist
     */
    read(entityName) {
        for (let e of this.currentLocation.entities)
            if (entityName === e.name)
                return e.text;
        return "";
    }

    /**
     * @param {String }questName Name of the quest to launch.
     * @return {INFO} FOUND if the quest exists and the launching succeed,
     * UNAVAILABLE if a quest is already launched and UNKNOWN if the quest doesn't exist.
     */
    launch(questName) {
        if (this.currentQuest === null) {   // if a quest is not already launched
            for (let q of this.currentLocation.quests)
                if (q.name === questName) {
                    if (q.status === STATUS.DONE)   // if quest already finished
                        return INFO.FINISHED;
                    for (let dependency of q.questsRequired)
                        if (dependency.status !== STATUS.DONE)  // if a dependency (quest)  is not finished
                            return INFO.LOCKED;
                    q.status = STATUS.STARTED;  // if quest find, launching quest
                    this.currentQuest = q;
                    return INFO.FOUND;
                }
            return INFO.UNKNOWN;    // else : quest not found
        }
        return INFO.UNAVAILABLE;   // a quest is already launched
    }

    /**
     * @param {String } command Last command that will be compared to required commands.
     * @return {Quest} The quest if finished, null otherwise.
     */
    checkQuest(command) {
        let d = new Date();

        if (this.currentQuest.commandRequired[0].toString() === command.toString()) {
            this.currentQuest.commandRequired.shift(); // remove first element
            console.log("Quest command recognise");
        }
        if (this.currentQuest.commandRequired.length === 0) {   // end quest
            this.currentQuest.status = STATUS.DONE;
            for (let cr of this.currentQuest.commandRewards)
                this.addCommand(cr);
            this.addTrophy(this.currentQuest.name +"  "+ d.toLocaleString());
            let copy = this.currentQuest;
            this.currentQuest = null;
            return copy;
        }
        return null;
    }

    /**
     * Function used to move an item source to destination, if destination does not exist, source is renamed as destination.
     * @param {String} source    The name of the item to move.
     * @param {String} destination   The name of the destination of the item.
     * @returns {boolean}   True if the move is authorized done.
     */
    moveItem(source, destination) {
        let index, cpt = -1;
        let item = null;
        //check if the source item exists
        for (let e of this.currentLocation.entities) {
            cpt++;
            if (e.name === source)
                if (e instanceof Item) {
                    index = cpt;
                    item = e;
                }
        }
        //if it exists
        if (index !== -1 && item !== null) {
            switch (destination) {
                case placeConst :  // current location
                    return true;
                case parentConst:   // parent
                    if (this.currentLocation.parent === null)
                        return false;
                    this.currentLocation.entities.splice(index, 1);
                    this.currentLocation.parent.addEntity(item);
                    return true;
                case homeConst :  // home
                    if (Place.home !== null) {
                        this.currentLocation.entities.splice(index, 1);
                        Place.home.addEntity(item);
                        return true;
                    }
                    break;
                case  rootConst :  // root
                    if (Place.root !== null) {
                        this.currentLocation.entities.splice(index, 1);
                        Place.root.addEntity(item);
                        return true;
                    }
                    break;
                case inventoryConst:
                    if (this.inventory !== null) {
                        this.currentLocation.entities.splice(index, 1);
                        this.inventory.addEntity(item);
                        return true;
                    }
                    break;
                default : // son
                    let place;
                    if ((place = this.currentLocation.getPlace(destination)) === null)
                        item.name = destination;
                    else {
                        this.currentLocation.entities.splice(index, 1);
                        place.addEntity(item);
                    }
                    return true;
            }
        }
        //else
        return false;
    }

}