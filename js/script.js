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
     * Script launching
     * @param {String[]}args The args of the script.
     * @return {COMMAND_STATUS} The status of the script's launching.
     */
    run(args) {
        let correctArgs = true;
        for (let i = 0; i < this.args.length; i++)
            if (this.args[i] !== args[i])
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

    description(base, shift = "", id = 0) {
        return "./" + this.name;
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