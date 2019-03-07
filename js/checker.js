// Command list
const COMMAND_TYPE = {
    UNKNOWN: -1,
    EXIT: "exit",
    HELP: "help",
    CD: "cd",
    CAT: "cat",
    LS: "ls",
    LAUNCH: "./",
    MV: "mv",
    TREE: "tree",
    GREP : "grep"
};

class Checker{


    /**
     * The command analysis is automatically done when this constructor is called.
     * 
     * @param {Command} command (**not null**),
     * @param {boolean} verbose if true, it writes messages on the console. Can be null.
     */
    constructor(command, verbose = false){
        this._command = command;
        this._verbose = verbose;

        this._isValid = false;
        this._errorMessage = "";
        this._type = COMMAND_TYPE.UNKNOWN;

        this._analyseCommand();
    }

    /**
     * @returns true if the command is recognized.
     */
    isCommandValid(){
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
    getErrorMessage(){
        return this._errorMessage;
    }

    /**
     * @returns the command type.
     */
    getCommandType(){
        return this._type;
    }

    /**
     * It analyses the given command.
     */
    _analyseCommand(){

        // Empty command
        if(this._command.args.length === 0 || (this._command.args.length === 1 && this._command.args[0] === "")){
            if(this._verbose) console.log("The command is empty.");

            this._errorMessage = "Command not found : ''";
            this._isValid = false;
            this._type = COMMAND_TYPE.UNKNOWN;
            return;
        }
        
        // Pipe command
        if(this._command.isPipe > 1){
            if(this._verbose) console.log("The command is a pipe command, and it is not supported yet.");
            
            this._errorMessage = "pipe command is not supported yet";
            this._isValid = false;
            this._type = COMMAND_TYPE.UNKNOWN;
            return;
        }

        // pour tester si la commande est autorisée
        // if(new Set(Main.user.commandsAuthorized).has(this._command.args[0])){
        //
        // }

        // Other commands
        switch(this._command.args[0]){
            case "exit":
                if(this._command.args.length > 1){
                    this._errorMessage = "exit command should not receive arguments.";
                    this._isValid = false;
                }else{
                    this._errorMessage = "";
                    this._isValid = true;
                }
                this._type = COMMAND_TYPE.EXIT;
                break;

            case "help":
                if(this._command.args.length > 1){
                    this._errorMessage = "help command should not receive arguments.";
                    this._isValid = false;
                }else{
                    this._errorMessage = "";
                    this._isValid = true;
                }
                this._type = COMMAND_TYPE.HELP;
                break;
                
            case "cd":
                if(this._command.args.length > 2){
                    this._errorMessage = "cd expects no or only one argument.";
                    this._isValid = false;
                }else{
                    this._errorMessage = "";
                    this._isValid = true;
                }
                this._type = COMMAND_TYPE.CD;
                break;
                
            case "cat":
                if(this._command.args.length > 2){
                    this._errorMessage = "cat only expects 1 argument.";
                    this._isValid = false;
                }else if(this._command.args.length === 1){
                    this._errorMessage = "cat expects 1 argument.";
                    this._isValid = false;
                }else{
                    this._errorMessage = "";
                    this._isValid = true;
                }
                this._type = COMMAND_TYPE.CAT;
            break;

            case "ls":
                if(this._command.args.length !== 1){
                    this._errorMessage = "ls does not expect any argument.";
                    this._isValid = false;
                }else{
                    this._errorMessage = "";
                    this._isValid = true;
                }
                this._type = COMMAND_TYPE.LS;
            break;

            case "mv":
                if(this._command.args.length !== 3){
                    this._errorMessage = "mv expects two arguments : source and destination";
                    this._isValid = false;
                }else{
                    this._errorMessage = "";
                    this._isValid = true;
                }
                this._type = COMMAND_TYPE.MV;
            break;

            case "tree":
                if(this._command.args.length !== 1){
                    this._errorMessage = "tree does not expect any argument";
                    this._isValid = false;
                }else{
                    this._errorMessage = "";
                    this._isValid = true;
                }
                this._type = COMMAND_TYPE.TREE;
            break;

            case "grep":
                if(this._command.args.length !== 2){
                    this._errorMessage = "grep expects only one argument";
                    this._isValid = false;
                }else{
                    this._errorMessage = "";
                    this._isValid = true;
                }
                this._type = COMMAND_TYPE.GREP;
            break;

            default:
                if(this._command.args[0].startsWith("./")){
                    if(this._command.args.length !== 1){
                        this._errorMessage = "./ does not expect any argument.";
                        this._isValid = false;
                    }else if(this._command.args[0].length === 2){
                        this._errorMessage = "./ does expect a script name (example: ./script.sh).";
                        this._isValid = false;
                    }else{
                        this._errorMessage = "";
                        this._isValid = true;
                        this._command.args[0] = this._command.args[0].replace("./", "");
                    }
                    this._type = COMMAND_TYPE.LAUNCH;
                }else{
                    this._errorMessage = "Command not found : " + this._command.args[0];
                    this._isValid = false;
                    this._type = COMMAND_TYPE.UNKNOWN;
                }
            break;
        }
    }
}
