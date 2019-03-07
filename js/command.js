class Command{

    /**
     * @param args [[string]] all the arguments (it is a list because we need to separate the pipe commands) **can't be null**
     */
    constructor(args){
        if(args === null) this._args = [[""]];
        else this._args = args;

        this._isPipe = this._args.length > 1;
    }

    /**
     * @returns {[[string]]} the original command given in the constructor.
     */
    get originalCommand(){
        return this._args;
    }

    /**
     * @returns {boolean} true whenever the command is a pipe command.
     */
    get isPipe(){
        return this._isPipe;
    }

    /**
     * This function is usable when the original command is not a pipe command.
     * You should use getCommand(index) to get the command at a specified index if the original command is a pipe command.
     */
    get args(){
        if(this._args.length === 0){
            return [""];
        }else {
            return this._args[0];
        }
    }

    /**
     * This function is usable only if the original command is a pipe command.
     * @param index Integer the index of the command (only if the command is a pipe command)
     * @returns {Command} the command at the specified index.
     */
    getCommand(index){
        if(index > this._args.length){
            throw "The command at index " + index + " does not exist. There are only " + this._args.length + " commands.";
        }else{
            return new Command([this._args[index]]);
        }
    }
}