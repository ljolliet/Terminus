// Status list
const STATUS = {
    TODO: 0,
    STARTED: 1,
    DONE: 2
};

class Quest {
    constructor(name) {
        this._status = STATUS.TODO;
        this._endText = "";
        this._initialText = "";
        this._commandRequired = [];
        this._commandRewards = [];
        this._name = name;
    }

    /**
     * @return {String} Name
     */
    get name() {
        return this._name;
    }

    /**
     * @return {int} Advancement status.
     */
    get status() {
        return this._status;
    }

    /**
     * @return {String} Text displayed at the end.
     */
    get endText() {
        return this._endText;
    }

    /**
     * @return {String} Presentation text.
     */
    get initialText() {
        return this._initialText;
    }

    /**
     * @return {String[]} Command array required to finish the quest.
     */
    get commandRequired() {
        return this._commandRequired;
    }

    /**
     * @return {String[] }Command rewards array.
     */
    get commandRewards() {
        return this._commandRewards;
    }

    /**
     * @param {String} command Add to requirements.
     */
    addCommandRequired(command) {
        this._commandRequired.push(command);
    }

    /**
     * @param {String[]} commands Add multiple commands to requirements.
     */
    addCommandsRequired(commands) {
        for (let c of commands)
            this._commandRequired.push(c);
    }

    /**
     * @param {String[]} command Add to rewards.
     */
    addCommandRewards(command) {
        this._commandRewards.push(command);
    }

    /**
     * @param {COMMAND_TYPE} value To update quest advancement status.
     */
    set status(value) {
        this._status = value;
    }

    /**
     * @param {String} value To update text displayed at the end.
     */
    set endText(value) {
        this._endText = value;
    }

    /**
     * @param {String} value To update text displayed at the beginning.
     */
    set initialText(value) {
        this._initialText = value;
    }

}