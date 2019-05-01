/**
 * Used to return the status of the command to the main, and to print something as a result.
 * @type {{CORRECT: number, PERMISSION_ISSUE: number, INCORRECT_1: number, INCORRECT_2: number}}
 */
const COMMAND_STATUS = {
    CORRECT: 0,
    INCORRECT_1: 1,
    INCORRECT_2: 2,    // used when the second argument is the issue
    PERMISSION_ISSUE: 3
};


class Command {

    /**
     * @param {[[string]]} args all the arguments (it is a list because we need to separate the pipe commands) **can't be null**
     */
    constructor(args) {
        if (args === null) {
            this._args = [[""]];
        } else {
            this._args = args;
        }

        try {
            // test if args is an array of array
            let v = this._args[0];
        } catch (ignored) {
            throw ignored;
            //throw "Illegal argument: Command constructor needs [ [ string ] ] parameter.";
        }

        this._isPipe = this._args.length > 1;
    }

    /**
     * @returns {[[string]]} the original command given in the constructor.
     */
    get originalCommand() {
        return this._args;
    }

    /**
     * @return {string} it returns the original command formatted correctly.
     */
    toString() {
        let cmd = "";
        for (let i = 0; i < this._args.length; i++) {
            for (let j = 0; j < this._args[i].length; j++) {
                if (j === this._args[i].length - 1) cmd += this._args[i][j];
                else cmd += this._args[i][j] + " ";
            }
            if (i !== this._args.length - 1) cmd += " | ";
        }
        return cmd;
    }

    /**
     * @returns {boolean} true whenever the command is a pipe command.
     */
    get isPipe() {
        return this._isPipe;
    }

    /**
     * This function is usable when the original command is not a pipe command.
     * You should use getCommand(index) to get the command at a specified index if the original command is a pipe command.
     */
    get args() {
        if (this._args.length === 0) {
            return [""];
        } else {
            return this._args[0];
        }
    }

    /**
     * This function is usable only if the original command is a pipe command.
     * @param index Integer the index of the command (only if the command is a pipe command)
     * @returns {Command} the command at the specified index.
     */
    getCommand(index) {
        if (index > this._args.length) {
            throw "The command at index " + index + " does not exist. There are only " + this._args.length + " commands.";
        } else {
            return new Command([this._args[index]]);
        }
    }

    /**
     * It returns the number of commands (useful only if the original command is a pipe command)
     * @return {number}
     */
    get size() {
        return this._args.length;
    }

    /**
     * It formats options into an array.
     * Input:  -abc
     * Output: ["a", "b", "c"]
     * @param {string} unformattedOptions something like "-abc"
     * @returns {[string]} something like ["a", "b", "c"]
     */
    static formatOptions(unformattedOptions) {
        if (unformattedOptions === "" || unformattedOptions == null) return [];

        unformattedOptions = unformattedOptions.replaceAll("-", "");
        unformattedOptions = unformattedOptions.replaceAll(" ", "");

        let formattedOptions = [];
        for (let i = 0; i < unformattedOptions.length; i++) {
            formattedOptions.push(unformattedOptions[i]);
        }
        return formattedOptions;
    }

    /**
     * It returns the closest commands according to the given prefix :
     *
     * @param prefix {string} command prefix,
     * @return {[string]} the closest commands.
     */
    static getClosestCommands(prefix) {
        let matches = [];

        for (let key in COMMAND_TYPE) {
            if (COMMAND_TYPE.hasOwnProperty(key)) {
                // Check if the command starts with the command typed
                if (COMMAND_TYPE[key].startsWith(prefix)) {
                    // Check if the command is authorized
                    if (Main.user.commandsAuthorized.indexOf(COMMAND_TYPE[key]) > -1) {
                        matches.push(COMMAND_TYPE[key]);
                    }
                }
            }
        }
        return matches;
    }
}