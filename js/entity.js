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
}

class PNJ extends Entity {
    constructor(name, text) {
        super(name, text);
    }

    toString() {
        return "PNJ : " + this.name;
    }
}

class Item extends Entity {
    constructor(name, text) {
        super(name, text);
    }

    toString() {
        return "Item : " + this.name;
    }
}