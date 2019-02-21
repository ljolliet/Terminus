class Entity{
    /**
     * Do not use simple entity but prefer PNJ and Item directly.
     * @param {String} name 
     * @param {String} text 
     */
    constructor(name, text){
        this.name = name;
        this.text = text;
    }
}
class PNJ extends Entity{
    constructor(name,text){
        super(name,text);
    }
}
class Item extends Entity{
    constructor(name,text){
        super(name,text);
    }
}