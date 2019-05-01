class Entity extends UnixObject {

    /**
     * Do not use simple entity but prefer PNJ and Item directly. It corresponds to a file.
     * @param {String} name The name of the entity.
     * @param {String} text The text that contains the entity.
     */
    constructor(name, text) {
        super(name);
        this._text = text;
    }

    /**
     * @return {String} The text corresponding to the entity.
     */
    get text() {
        return this._text;
    }

    /**
     * @param text To update the text.
     */
    set text(text) {
        this._text = text;
    }

    /**
     * @param {String} base The String to put before an element.
     * @param {String} shift between an element and a sub element, not used here.
     * @param {int} id  not used in Entity.
     * @return {String} The description of the place as a tree.
     */
    description(base, shift = "", id = 0) {
        return this.name;
    }
}

class PNJ extends Entity {
    /**
     * PNJ constructor, a pnj cannot be moved
     * @param {String} name The name of the PNJ.
     * @param {String} text The text that contains the PNJ.
     */
    constructor(name, text) {
        super(name, text);
        this.writeAccess = false;
    }
}

class Item extends Entity {
    /**
     * Item constructor, an item can be moved
     * @param {String} name The name of the item.
     * @param {String} text The text that contains the item.
     */
    constructor(name, text) {
        super(name, text);
    }
}