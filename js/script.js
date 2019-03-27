class Script{


    /**
     *
     * @param name The name of the script.
     * @param args  The args required to launch the script.
     */
    constructor(name, args){
        this._name = name;
        this._requiredargs = args;
        this._content = [];
        this._args = args;
    }

    run(){
        for(let command of this.content){
            //TODO execute each command like if the user was typing commands
        }
    }
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get args() {
        return this._args;
    }

    set args(value) {
        this._args = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }
}