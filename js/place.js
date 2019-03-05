class Place {


    constructor(name) {
        this._places = [];
        this._entities = [];
        this._quests = [];
        this._name = name;
        this._parent = null;
        //static attributes (see below the class):
        //Place.root
        //Place.home
        // use : let r = new Place("root") ; Place.root = r ;
    }

    /**
     * @return {Object[]} All the entities, places, quests, ordered alphabetically.
     */
    get all() {
        let all = [];
        for (let e of this.entities)
            all.push(e);
        for (let p of this.places)
            all.push(p);
        for (let q of this.quests)
            all.push(q);
        all.sort((a, b) => a.name > b.name); // sort the array alphabetically comparing the names of the Objects
        return all;


    }

    /**
     * @returns {boolean} True if the Place contains a quest that the user didn't started.
     */
    containsQuestTodo() {
        for (let q of this.quests)
            if (q.status === STATUS.TODO)
                return true;
        return false;
    }

    /**
     * @return {String} Name
     */
    get name() {
        return this._name;
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
     * @param {String} entity
     */
    deleteEntity(entity){
        //TODO Does not work
       this.entities.filter(el => el.name !== entity);
    }

}

//inelegant but that works ..
Place.home = null;
Place.root = null;

