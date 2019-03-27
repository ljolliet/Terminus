// Command list
const COMMAND_TYPE = {
    UNKNOWN: "",
    EXIT: "exit",
    HELP: "help",
    CD: "cd",
    CAT: "cat",
    LS: "ls",
    LAUNCH: "./",
    MV: "mv",
    TREE: "tree",
    GREP: "grep",
    JOBS : "jobs",
    CLEAR : "clear",
    MAN : "man",
    YES : "yes",
    CHMOD : "chmod"
};

class Checker {

    /**
     * The command analysis is automatically done when this constructor is called.
     *
     * @param {Command} command (**not null**),
     * @param {User} user the user that typed the command
     * @param {boolean} verbose if true, it writes messages on the console. Can be null.
     */
    constructor(command, user, verbose = false) {
        this._command = command;
        this._user = user;
        this._verbose = verbose;

        this._isValid = false;
        this._errorMessage = "";
        this._type = COMMAND_TYPE.UNKNOWN;

        this._analyseCommand();
    }

    /**
     * @returns true if the command is recognized.
     */
    isCommandValid() {
        return this._isValid;
    }

    /**
     * The error message can be either :
     * (1) An error message because the command doesn't exist,
     * (2) An error message because the command is not well used.
     *
     * Examples :
     * (1) Command not found : blabla,
     * (2) Unrecognized option, use blabla --help for more information.
     *
     * Case (1) :
     * - isCommandValid returns false,
     * - getCommandType returns COMMAND_TYPE.UNKNOWN.
     *
     * Case (2) :
     * - isCommandValid returns false,
     * - getCommandTypes returns something else than COMMAND_TYPE.UNKOWN.
     *
     * @returns the error message of the command.
     */
    getErrorMessage() {
        return this._errorMessage;
    }

    /**
     * @returns the command type.
     */
    getCommandType() {
        return this._type;
    }

    /**
     * It checks the command and sets the class attributes.
     * @param command {Command} command to check,
     * @param type {COMMAND_TYPE} type of the command to check,
     * @param expectedArgc {[int]} expected number of arguments, (it is an array because it could accept 0 as well as 1)
     * @param expectedOptions {[string]} expected options
     * @param errorMessage {string} error message if argc != expectedArgc (if not set, the default message will be set)
     * @private
     */
    _checkCommand(command, type, expectedArgc, expectedOptions = [], errorMessage = "") {

        // First we need to put all the options into only one argument
        // if we have ls -a -b -c, we will then have ls -abc
        let options = "";
        let args = command.args.slice();
        let delCount = 0;
        for(let i = 0; i < args.length; i ++){
            if(args[i].startsWith("-")){
                // We need to check if the option is expected
                if((new Set(expectedOptions)).has(args[i])){
                    //if(delCount === 0) options = "-";
                    options += args[i];
                    command.args.splice(i - delCount, 1);
                    delCount ++;
                }
            }
        }
        if(delCount !== 0) command.args.push(options);

        if (!(new Set(this._user.commandsAuthorized).has(command.args[0]))) {
            this._errorMessage = "Vous n'avez pas accès à cette commande.";
            this._isValid = false;
        } else if (!(new Set(expectedArgc).has(command.args.length - 1))) {
            let defErrorMessage = "Mauvais usage de " + command.args[0] + ". " + expectedArgc[0] + " argument(s) attendu(s).";
            this._errorMessage = (errorMessage === "" ? defErrorMessage : errorMessage);
            this._isValid = false;
        } else {
            this._errorMessage = "";
            this._isValid = true;
        }
        this._type = type;
    }

    /**
     * It analyses the given command.
     */
    _analyseCommand() {

        // Empty command
        if (this._command.args.length === 0 || (this._command.args.length === 1 && this._command.args[0] === "")) {
            if (this._verbose) console.log("The command is empty.");

            this._errorMessage = "Commande non reconnue: ''.";
            this._isValid = false;
            this._type = COMMAND_TYPE.UNKNOWN;
            return;
        }

        // Pipe command
        if (this._command.isPipe > 1) {
            if (this._verbose) console.log("The command is a pipe command, and it is not supported yet.");

            this._errorMessage = "L'utilisation de pipe '|' n'est pas supportée.";
            this._isValid = false;
            this._type = COMMAND_TYPE.UNKNOWN;
            return;
        }

        // Other commands
        switch (this._command.args[0]) {
            case "exit":
                this._checkCommand(this._command, COMMAND_TYPE.EXIT, [0]);
                break;

            case "help":
                this._checkCommand(this._command, COMMAND_TYPE.HELP, [0]);
                break;

            case "cd":
                this._checkCommand(this._command, COMMAND_TYPE.CD, [0, 1], [], "Mauvais usage de cd. 0 ou 1 argument attendu.");
                break;

            case "cat":
                this._checkCommand(this._command, COMMAND_TYPE.CAT, [1]);
                break;

            case "ls":
                this._checkCommand(this._command, COMMAND_TYPE.LS, [0, 1], ["-a", "-l"], "Mauvais usage de ls. 0 ou 1 argument attendu.");
                break;

            case "mv":
                this._checkCommand(this._command, COMMAND_TYPE.MV, [2], [],  "Mauvais usage de mv. 2 arguments attendus: source et destination.");
                break;

            case "tree":
                this._checkCommand(this._command, COMMAND_TYPE.TREE, [0]);
                break;

            case "grep":
                this._checkCommand(this._command, COMMAND_TYPE.GREP, [1]);
                break;

            case "jobs":
                this._checkCommand(this._command, COMMAND_TYPE.JOBS, [0]);
                break;

            case "clear":
                this._checkCommand(this._command, COMMAND_TYPE.CLEAR, [0]);
                break;

            case "man":
                this._checkCommand(this._command, COMMAND_TYPE.MAN, [1]);
                break;

            case "yes":
                this._checkCommand(this._command, COMMAND_TYPE.YES, [0,1]);
                break;
            case "chmod":
                this._checkCommand(this._command, COMMAND_TYPE.CHMOD, [1]);
                break;

            default:
                if (this._command.args[0].startsWith("./")) {
                    if (this._command.args.length !== 1) {
                        this._errorMessage = "./ n'attend aucun argument.";
                        this._isValid = false;
                    } else if (this._command.args[0].length === 2) {
                        this._errorMessage = "./ a besoin d'un nom de script à executer (exemple: ./script.sh).";
                        this._isValid = false;
                    } else {
                        this._errorMessage = "";
                        this._isValid = true;
                        this._command.args[0] = this._command.args[0].replace("./", "");
                    }
                    this._type = COMMAND_TYPE.LAUNCH;
                } else {
                    this._errorMessage = "Commande non reconnue: '" + this._command.args[0] + "'.";
                    this._isValid = false;
                    this._type = COMMAND_TYPE.UNKNOWN;
                }
                break;
        }
    }
}