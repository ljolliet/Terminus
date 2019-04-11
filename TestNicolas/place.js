class Place extends UnixObject {

    constructor(place){
        super(name);
        this._places = [];
        this._entities = [];
        this._quests = [];
        this._scripts = [];
        this._parent = null;
    }

    /**
     * @return {UnixObject[]} All the entities, places, quests, ordered alphabetically.
     */
    get all() {
        let all = [];
        for (let e of this.entities)
            all.push(e);
        for (let p of this.places)
            all.push(p);
        for (let q of this.quests)
            all.push(q);
        for (let s of this.scripts)
            all.push(s);
        all.sort((a, b) => a.name > b.name); // sort the array alphabetically comparing the names of the Objects

        return all;
    }

    /**
     * Recursive function.
     * @param {String} base Pattern that start a line.
     * @param {String} shift  Shift between an element and a sub element.
     * @param {int} id The tree height, that augment every time there is a subplace.
     * @return {String} The description of the place as a tree.
     */
    description(base, shift, id) {
        let tree = this.name;
        for (let el of this.all) {
            tree += "\n";
            for (let i = 0; i < id; i++) {
                tree += shift;
            }

            tree += base + el.description(base, shift, id + 1);
        }
        return tree;
    }

    /**
     * @param {String} pattern The pattern that should start name of the object.
     * @return {Object[]} every Object that starts with the pattern, it ignores case.
     */
    getStartWith(pattern) {
        let list = [];
        for (let o of this.all)
            if (o.name.startsWith(pattern.toLowerCase()) || o.name.startsWith(pattern.toUpperCase()))
                list.push(o);
        return list;
    }

    /**
     * @return {{Place,Quest}[]} The Quests that are started, with the Place corresponding.
     */
    getQuestStarted() {
        let quests = [];
        for (let q of this.quests)
            if (q.status === STATUS.STARTED)
                quests.push([this, q]);
        for (let p of this.places)
            for (let pq of p.getQuestStarted())
                quests.push(pq);
        console.log(quests);
        return quests;
    }

    /**
     * @return {boolean} True if the Place contains a quest that the user didn't started.
     */
    containsQuestTodo() {
        for (let q of this.quests)
            if (q.status === STATUS.TODO) {
                for (let d of q.questsRequired)
                    if (d.status !== STATUS.DONE)   // to check if the quest is available (all dependencies done)
                        return false;
                return true;
            }
        return false;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    /**
     * @return {String} Path of this place, starting by root or home.
     */
    get path() {
        if (this === Place.root || this.parent === null)
            return "/";
        else if (this === Place.home)
            return "~/";
        else
            return this.parent.path + this.name + "/";
    }

    /**
     * @return {Place[]} The places array.
     */
    get places() {
        return this._places;
    }

    /**
     * @return {Entity[]} The entities array.
     */
    get entities() {
        this._entities.sort();
        return this._entities;
    }

    /**
     * @param {Entity[]} value To update entities array.
     */
    set entities(value) {
        this._entities = value;
    }

    /**
     * @return {Quest[]} The quests array.
     */
    get quests() {
        return this._quests;
    }

    /**
     * @return {Script[]} The scripts array.
     */
    get scripts() {
        return this._scripts;
    }

    /**
     * @return {Place} Parent place.
     */
    get parent() {
        return this._parent;
    }


    /**
     * @param {Place} place To update parent place.
     */
    set parent(place) {
        this._parent = place;
    }

    /**
     * @param {Place} place To add in places array.
     */
    addPlace(place) {
        this.places.push(place);
        place.parent = this;
    }

    /**
     * @param {Quest} quest To add in quests array.
     */
    addQuest(quest) {
        this.quests.push(quest);
    }

    /**
     * @param {Entity} entity To add in entities array.
     */
    addEntity(entity) {
        this.entities.push(entity);
    }

    /**
     * @param {Script} script To add in scripts array.
     */
    addScript(script) {
        this.scripts.push(script);
    }

    /**
     * @param {String }entityName The name of the entity to find
     * @return {Entity} The entity corresponding to the name.
     */
    getEntity(entityName) {
        for (let e of this.entities)
            if (e.name === entityName)
                return e;
        return null;
    }

    /**
     * @param {String } placeName The name of the place to find
     * @return {Place} The place corresponding to the name.
     */
    getPlace(placeName) {
        for (let e of this.places)
            if (e.name === placeName)
                return e;
        return null;
    }

}

//inelegant but that works ..
Place.home = null;
Place.root = null;

