/**
 * TODO: doc
 */
class Parser{

    /**
     * 
     * @param {string} command the command that the user typed.
     * @param {boolean} verbose if true, it writes information about parsing
     */
    constructor(command, verbose){
        this.command = command;
        this.verbose = verbose;

        this.commands = [];
    }

    /**
     * TODO
     */
    parseCommand(){
        if(this.command.length == 0){
            if(this.verbose){
                console.log("[Parser] The command is empty");
            }
        }else{
            // We devide the command in multiple commands if there was a pipe
            let cmds = this.command.split("|");
            
            // For each commands between the pipe, we will add its details to the array
            for(let i = 0; i < cmds.length ; i ++){
                let args = cmds[i].split(" ");

                // Shift removes the first item and returns the removed item
                let cmdMain = args.shift();
                let cmdArgs = args;

                let cmdObj = {
                    main: cmdMain,
                    args: cmdArgs
                };

                this.commands.push(cmdObj);
            }

            if(this.verbose){
                console.log("Command list :" + this.commands);
            }
        }
    }

    /**
     * @returns the command.
     */
    getCommand(){
        return this.command;
    }

    /**
     * TODO: doc
     * @returns all the commands parsed.
     */
    getCommands(){
        return this.commands;
    }
}

/**
 * THIS IS A TEST FUNCTION :
 * It retrieves the content of the input of id "input", and parses it.
 * @param {key event} event 
 */
function runParser(e){
    if (e.keyCode == 13) {
        var input = document.getElementById("input");
        let command = input.value;
        
        let parser = new Parser(command, true);
        parser.parseCommand();
    }
}