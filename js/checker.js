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
     * Use the function analyseCommand to check the command.
     * 
     * The commands given here is a command object created by the
     * *getCommandList* function from the *Parser* class.
     * 
     * You need to check if commandObj is not null before calling this
     * function.
     * 
     * @param {Command} command (**not null**),
     * @param {boolean} verbose if true, it writes messages on the console. Can be null.
     */
    constructor(command, verbose){
        this.command = command;
        this.verbose = (verbose == null) ? false : verbose;
    }

    /**
     * @returns true if the command is recognized.
     */
    isCommandValid(){
        return this.isValid;
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
        return this.errorMessage;
    }

    /**
     * @returns the command type.
     */
    getCommandType(){
        return this.type;
    }

    /**
     * It analyses the given command.
     */
    analyseCommand(){

        // Empty command
        if(this.command.args.length === 0){
            if(this.verbose) console.log("The command is empty.");

            this.errorMessage = "Command not found : ''";
            this.isValid = false;
            this.type = COMMAND_TYPE.UNKNOWN;
            return;
        }
        
        // Pipe command
        if(this.command.isPipe > 1){
            if(this.verbose) console.log("The command is a pipe command, and it is not supported yet.");
            
            this.errorMessage = "pipe command is not supported yet";
            this.isValid = false;
            this.type = COMMAND_TYPE.UNKNOWN;
            return;
        }

        // pour tester si la commande est autorisée
        // if(new Set(Main.user.commandsAuthorized).has(this.command.args[0])){
        //
        // }

        // Other commands
        switch(this.command.args[0]){
            case "exit":
                if(this.command.args.length > 1){
                    this.errorMessage = "exit command should not receive arguments.";
                    this.isValid = false;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                }
                this.type = COMMAND_TYPE.EXIT;
                break;

            case "help":
                if(this.command.args.length > 1){
                    this.errorMessage = "help command should not receive arguments.";
                    this.isValid = false;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                }
                this.type = COMMAND_TYPE.HELP;
                break;
                
            case "cd":
                if(this.command.args.length > 2){
                    this.errorMessage = "cd expects no or only one argument.";
                    this.isValid = false;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                }
                this.type = COMMAND_TYPE.CD;
                break;
                
            case "cat":
                if(this.command.args.length > 2){
                    this.errorMessage = "cat only expects 1 argument.";
                    this.isValid = false;
                }else if(this.command.args.length === 1){
                    this.errorMessage = "cat expects 1 argument.";
                    this.isValid = false;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                }
                this.type = COMMAND_TYPE.CAT;
            break;

            case "ls":
                if(this.command.args.length !== 1){
                    this.errorMessage = "ls does not expect any argument.";
                    this.isValid = false;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                }
                this.type = COMMAND_TYPE.LS;
            break;

            case "mv":
                if(this.command.args.length !== 3){
                    this.errorMessage = "mv expects two arguments : source and destination";
                    this.isValid = false;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                }
                this.type = COMMAND_TYPE.MV;
            break;

            case "tree":
                if(this.command.args.length !== 1){
                    this.errorMessage = "tree does not expect any argument";
                    this.isValid = false;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                }
                this.type = COMMAND_TYPE.TREE;
            break;

            case "grep":
                if(this.command.args.length !== 2){
                    this.errorMessage = "grep expects only one argument";
                    this.isValid = false;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                }
                this.type = COMMAND_TYPE.GREP;
            break;

            default:
                if(this.command.args[0].startsWith("./")){
                    if(this.command.args.length !== 1){
                        this.errorMessage = "./ does not expect any argument.";
                        this.isValid = false;
                    }else{
                        this.errorMessage = "";
                        this.isValid = true;
                        this.command.args[0] = this.command.args[0].replace("./", "");
                    }
                    this.type = COMMAND_TYPE.LAUNCH;
                }else{
                    this.errorMessage = "Command not found : " + this.command.args[0];
                    this.isValid = true;
                    this.type = COMMAND_TYPE.UNKNOWN;
                }
            break;
        }
    }
}
