class Place {


    constructor(name) {
        this._places = [];
        this._entities = [];
        this._quests = [];
        this._name = name;
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
     * @param {Place} place To add in places array.
     */
    addPlace(place) {
        this._places.push(place);
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

    toString() {
        let s = this.name + ":\n  places : ";
        for (let p of this.places)
            s += p.name + ",";
        s += "\n entities : ";
        for (let e of this.entities)
            s += e.toString() + ",";
        s += "\n quests : ";
        for (let q of this.quests)
            s += q.name + ",";
        return s;
    }

}