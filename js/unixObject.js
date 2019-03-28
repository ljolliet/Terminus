class UnixObject {

    constructor(name) {
        this._name = name;
        this._readAccess = true;
        this._writeAccess = true;
        this._execAccess = true;
    }

    setAccesses(read, write, exec){
        this.readAccess = read;
        this.writeAccess = write;
        this.execAccess = exec;
    }
    addAccesses(read, write, exec){
        if(read != null) this.readAccess = true;
        if(write != null) this.writeAccess = true;
        if(exec != null) this.execAccess = true;
    }
    removeAccesses(read, write, exec){
        if(read != null) this.readAccess = false;
        if(write != null) this.writeAccess = false;
        if(exec != null) this.execAccess = false;
    }


    setRights(value) {
        let options;
        let r = null, w = null, x = null;
        // if pattern chmod +xwr object
        if (value.startsWith("+") || value.startsWith("-") || value.startsWith("=")) {
            options = value.slice(1, value.length);
            for (let i = 0; i < options.length; i++) {
                switch (options.charAt(i)) {
                    case "r":
                        r = true;
                        break;
                    case "w":
                        w = true;
                        break;
                    case "x":
                        x = true;
                        break;
                    case "-":
                        break;
                    default :
                        return false;
                }
            }
            if (value.startsWith("+") )
                this.addAccesses(r,w,x);
            else if (value.startsWith("-") )
                this.removeAccesses(r,w,x);
            else if (value.startsWith("=") )
                this.setAccesses(r,w,x);
            }
        else        // if pattern chmod 647 object
            switch (parseInt(value)) {
                case 0 :
                    this.setAccesses(false,false,false);
                    break;
                case 1 :
                    this.setAccesses(false,false,true);
                    break;
                case 2 :
                    this.setAccesses(false,true,false);
                    break;
                case 3 :
                    this.setAccesses(false,true,true);
                    break;
                case 4 :
                    this.setAccesses(true,false,false);
                    break;
                case 5 :
                    this.setAccesses(true,false,true);
                    break;
                case 6 :
                    this.setAccesses(true,true,false);
                    break;
                case 7 :
                    this.setAccesses(true,true,true);
                    break;
                default :
                    return false;
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