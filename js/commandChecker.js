
// Command list
var CMD_UNKNOWN = -1;
var CMD_EXIT    = 0;
var CMD_HELP    = 1;
var CMD_CD      = 2;
var CMD_CAT     = 3;
var CMD_LS      = 4;

class CommandChecker{

    /**
     * Use the function analyseCommand to check the command.
     * 
     * The commands given here is a command object created by the
     * *getCommandList* function from the *Parser* class.
     * 
     * You need to check if commandObj is not null before calling this
     * function.
     * 
     * @param {commandList} commandObj command list (**not null**),
     * @param {boolean} verbose if true, it write messages on the console.
     */
    constructor(commandObj, verbose){
        this.command = commandObj;
        this.verbose = verbose;
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
     * - getCommandType returns CMD_UNKNOWN.
     * 
     * Case (2) :
     * - isCommandValid returns false,
     * - getCommandTypes returns something else than CMD_UNKOWN.
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
        if(this.command.length == 0){
            if(this.verbose) console.log("The command is empty.");

            this.errorMessage = "Command not found : ''";
            this.isValid = false;
            this.type = CMD_UNKNOWN;
            return;
        }
        
        // Pipe command
        if(this.command.length > 1){
            if(this.verbose) console.log("The command is either a pipe command, and it is not supported yet.")
            
            this.errorMessage = "Command not found : ''";
            this.isValid = false;
            this.type = CMD_UNKNOWN;
            return;
        }

        // Other commands
        switch(this.command[0].main){
            case "exit":
                if(this.command[0].args.length > 0){
                    this.errorMessage = "exit command should not receive arguments.";
                    this.isValid = false;
                    this.type = CMD_EXIT;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                    this.type = CMD_EXIT;
                }
                break;

            case "help":
                if(this.command[0].args.length > 0){
                    this.errorMessage = "help command should not receive arguments.";
                    this.isValid = false;
                    this.type = CMD_HELP;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                    this.type = CMD_HELP;
                }
                break;
                
            case "cd":
                if(this.command[0].args.length > 1){
                    this.errorMessage = "cd expects no or only one argument.";
                    this.isValid = false;
                    this.type = CMD_CD;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                    this.type = CMD_CD;
                }
                break;
                
            case "cat":
                if(this.command[0].args.length > 1){
                    this.errorMessage = "cat only expects 1 argument.";
                    this.isValid = false;
                    this.type = CMD_CAT;
                }else if(this.command[0].args.length == 0){
                    this.errorMessage = "cat expects 1 argument.";
                    this.isValid = false;
                    this.type = CMD_CAT;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                    this.type = CMD_CAT;
                }
            break;

            case "ls":
                if(this.command[0].args.length != 0){
                    this.errorMessage = "ls does not expect any argument.";
                    this.isValid = false;
                    this.type = CMD_LS;
                }else{
                    this.errorMessage = "";
                    this.isValid = true;
                    this.type = CMD_LS;
                }
            break;

            default:
                this.errorMessage = "Command not found : " + this.command[0].main;
                this.isValid = true;
                this.type = CMD_EXIT;
            break;
        }
    }
}
