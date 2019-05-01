class UnixObject {

    /**
     * Unix object constructor,
     * @param {String} name The name of the object.
     */
    constructor(name) {
        this._name = name;
        this._readAccess = true;
        this._writeAccess = true;
        this._execAccess = true;
    }

    /**
     * @param {String} base The String to put before an element.
     * @param {String} shift between an element and a sub element, not used here.
     * @param id  not used here
     * @return {String} The description of the place as a tree.
     * Here null because a UnixObject is not an object that should be used alone,
     * but as a mother-class.
     */
    description(base, shift, id) { return null;}

    /**
     * To set the rwx access of the object.
     * @param {Boolean} read The read access.
     * @param {Boolean} write The write access.
     * @param {Boolean} exec The execution access.
     */
    setAccesses(read, write, exec){
        this.readAccess = read;
        this.writeAccess = write;
        this.execAccess = exec;
    }

    /**
     * To add rwx access to the object.
     * @param {Boolean} read The read access.
     * @param {Boolean} write The write access.
     * @param {Boolean} exec The execution access.
     */
    addAccesses(read, write, exec){
        if(read != null) this.readAccess = true;
        if(write != null) this.writeAccess = true;
        if(exec != null) this.execAccess = true;
    }

    /**
     * To remove rwx access to the object.
     * @param {Boolean} read The read access.
     * @param {Boolean} write The write access.
     * @param {Boolean} exec The execution access.
     */
    removeAccesses(read, write, exec){
        if(read != null) this.readAccess = false;
        if(write != null) this.writeAccess = false;
        if(exec != null) this.execAccess = false;
    }

    /**
     * To manage the rights.
     * @param {String} value What the user added to chmod ( +/-/= rwx, 1/2/3/4/5/6/7 )
     */
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

    /**
     * @return {String} The name of the object.
     */
    get name() {
        return this._name;
    }

    /**
     * @param {String} value To update the name of the object.
     */
    set name(value) {
        this._name = value;
    }

    /**
     * @returns {boolean} True if the read access is authorized.
     */
    get readAccess() {
        return this._readAccess;
    }
    /**
     * @returns {boolean} True if the write access is authorized.
     */
    get writeAccess() {
        return this._writeAccess;
    }

    /**
     * @returns {boolean} True if the execution access is authorized.
     */
    get execAccess() {
        return this._execAccess;
    }

    /**
     * @param {boolean} value To update the read access.
     */
    set readAccess(value) {
        this._readAccess = value;
    }

    /**
     * @param {boolean} value To update the write access.
     */
    set writeAccess(value) {
        this._writeAccess = value;
    }

    /**
     * @param {boolean} value To update the execution access.
     */
    set execAccess(value) {
        this._execAccess = value;
    }
}