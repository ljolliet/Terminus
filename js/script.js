class Script extends UnixObject {


    /**
     *
     * @param name The name of the script.
     * @param args  The args required to launch the script.
     */
    constructor(name, args) {
        super(name);
        this._content = [];
        this._args = args;
        this.readAccess = false;
        this.writeAccess = false;
        this.execAccess = false;
    }

    /**
     * Scrpt launching
     */
    run() {
        for (let command of this.content) {
            //TODO execute each command like if the user was typing commands
        }
    }

    get args() {
        return this._args;
    }

    set args(value) {
        this._args = value;
    }

    /**
     * @returns {String[]} The list of command contained in the script.
     */
    get content() {
        return this._content;
    }

    /**
     * @param {String[]} value To set the list of command contained in the script.
     */
    set content(value) {
        this._content = value;
    }
}