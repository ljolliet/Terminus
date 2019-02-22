class Entity {

    /**
     * Do not use simple entity but prefer PNJ and Item directly.
     * @param {String} name
     * @param {String} text
     */
    constructor(name, text) {
        this._name = name;
        this._text = text;
    }

    get name() {
        return this._name;
    }

    get text() {
        return this._text;
    }

    toString() {
        return this.name;
    }
}

class PNJ extends Entity {
    constructor(name, text) {
        super(name, text);
    }

    toString() {
        return "PNJ : " + super.toString();
    }
}

class Item extends Entity {
    constructor(name, text) {
        super(name, text);
    }

    toString() {
        return "Item : " + super.toString();
    }
}