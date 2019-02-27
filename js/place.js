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

    //TODO : error if parent = null (root) @ljolliet
    toString() {
        let s = "Place [" + this.name + ": parent : " + this.parent.name;
        s += ", places : ";
        for (let p of this.places)
            s += p.name + ",";
        s += ", entities : ";
        for (let e of this.entities)
            s += e.toString() + ",";
        s += ", quests : ";
        for (let q of this.quests)
            s += q.name + ",";
        s += "]";
        return s;
    }

}

//inelegant but that works .. wait not really TODO @ljolliet
Place.home = null;
Place.root = null;

