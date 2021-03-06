class Script extends UnixObject {


    /**
     * Script constructor, corresponding to unix script
     * @param {String} name The name of the script.
     * @param {String} args  The args required to launch the script.
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
     * Script launching
     * @param {String[]}args The args of the script.
     * @return {COMMAND_STATUS} The status of the script's launching.
     */
    run(args) {
        let correctArgs = true;
        for (let i = 0; i < this.args.length; i++)
            if (this.args[i].toLowerCase() !== args[i].toLowerCase())
                correctArgs = false;
        if (correctArgs && this.args.length === args.length) {
            let index = 0;
            let that = this;
            let runner = setInterval(function () {
                if (index === that.content.length) {
                    clearInterval(runner)
                    printConsolePath();
                    Main.printUserPath = true;
                } else {
                    Main.printUserPath = false;
                    Main.executeCommand(that.content[index]);
                    index++;
                }
            }, 50);
            return COMMAND_STATUS.CORRECT;
        }
        return COMMAND_STATUS.INCORRECT_1;
    }

    /**
     * @param {String} base The String to put before an element.
     * @param {String} shift between an element and a sub element, not used here.
     * @param id  not used here
     * @return {String} The description of the place as a tree.
     */
    description(base, shift = "", id = 0) {
        return "./" + this.name;
    }

    /**
     * @return {String} The args waited by the script.
     */
    get args() {
        return this._args;
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