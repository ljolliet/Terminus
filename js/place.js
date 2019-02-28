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
        // use : let root = new Place("root") ; Place.root = root ;
    }
    /**
     * @return {Object[]} All the entities, places, quests, ordered alphabetically.
     */
    get all(){
        let all = [];
        for(let e of this.entities)
            all.push(e);
        for(let p of this.places)
            all.push(p);
        for(let q of this.quests)
            all.push(q);
        all.sort((a,b) => a.name > b.name); // sort the array alphabetically comparing the names of the Objects
        return all;


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
        return this._entities;
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
     * @return {Place} To update parent place.
     */
    set parent(value) {
        this._parent = value;
    }

    /**
     * @param {Place} place To add in places array.
     */
    addPlace(place) {
        this._places.push(place);
        place.parent = this;
    }

    /**
     * @param {Quest} quest To add in quests array.
     */
    addQuest(quest) {
        this._quests.push(quest);
    }

    /**
     * @param {Entity} entity To add in entities array.
     */
    addEntity(entity) {
        this._entities.push(entity);
    }

}

//inelegant but that works ..
Place.home = null;
Place.root = null;

