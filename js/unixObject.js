class UnixObject {

    constructor(name) {
        this._name = name;
        this._readAccess = true;
        this._writeAccess = true;
        this._execAccess = true;
    }

    setRights(value) {
        let options;
        // if pattern chmod +xwr object
        if (value.startsWith("+"))
            options = value.slice(1, value.length);
        else        // if pattern chmod 647 object
            switch (parseInt(value)) {
                case 0 :
                    options = "---";
                    break;
                case 1 :
                    options = "--x";
                    break;
                case 2 :
                    options = "-w-";
                    break;
                case 3 :
                    options = "-wx";
                    break;
                case 4 :
                    options = "r--";
                    break;
                case 5 :
                    options = "r-x";
                    break;
                case 6 :
                    options = "rw-";
                    break;
                case 7 :
                    options = "rwx";
                    break;
                default :
                    return false;
            }

        for (let i = 0; i < options.length; i++) {
            switch (options.charAt(i)) {
                case "r":
                    this.readAccess = true;
                    break;
                case "w":
                    this.writeAccess = true;
                    break;
                case "x":
                    this.execAccess = true;
                    break;
                case "-":
                    break;
                default :
                    return false;
            }
        }
        return true;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get readAccess() {
        return this._readAccess;
    }

    get writeAccess() {
        return this._writeAccess;
    }

    get execAccess() {
        return this._execAccess;
    }

    set readAccess(value) {
        this._readAccess = value;
    }

    set writeAccess(value) {
        this._writeAccess = value;
    }

    set execAccess(value) {
        this._execAccess = value;
    }
}