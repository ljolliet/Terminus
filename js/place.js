

class Place {


    constructor(name) {
        this.name = name;
    }
    /** 
     * @return {String} Name
     */
    getName() { return this.name; }
    /**
     * @return {Place[]} The places array.  
     */
    getPlaces() { return this.places; }
    /**
     * @return {Entities[]} The entities array.
     */
    getEntities() { return this.entities; }
    /**
     * @return {Quest[]} The quests array.
     */
    getQuests() { return this.quests; }
    /**
     * @param {Place} place To add in places array.
     */
    addPlace(place) { this.places.push(place); }
    /**
     * @param {Quest} quest To add in quests array.
     */
    addQuest(quest) { this.quests.push(quest); }
    /** 
     * @param {Entity} entitie To add in entities array.
     */
    addQuest(entitie) { this.entities.push(entitie); }

}