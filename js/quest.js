// Status list
const STATUS = {
    TODO: 0,
    STARTED: 1,
    DONE: 2
};

const INFO = {
    UNKNOWN: 0,
    FOUND: 1,
    UNAVAILABLE: 2,
    LOCKED: 3,
    FINISHED: 4
};

class Quest extends UnixObject{

    constructor(name) {
        super(name);
        this._status = STATUS.TODO;
        this._endText = "";
        this._initialText = "";
        this._commandRequired = [];
        this._commandRewards = [];
        this._questsRequired = [];
        this.writeAccess = false;
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
     * @return {COMMAND_TYPE[]} Command rewards array.
     */
    get commandRewards() {
        return this._commandRewards;
    }

    /**
     * @return {Quest[]} Quests required to start this one.
     */
    get questsRequired() {
        return this._questsRequired;
    }

    /**
     * @param {Quest} quest Add to the quests required.
     */
    addQuestsRequired(quest) {
        this._questsRequired.push(quest);
    }

    /**
     * @param {String, String[]} command Add to requirements.
     */
    addCommandRequired(command) {
        this._commandRequired.push(command);
    }


    /**
     * @param {COMMAND_TYPE} command Add to rewards.
     */
    addCommandRewards(command) {
        this._commandRewards.push(command);
    }

    /**
     * @param {STATUS} value To update quest advancement status.
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

    /**
     * @param {String} base The String to put before an element.
     * @param {String} shift between an element and a sub element, not used here.
     * @param id  not used here
     * @return {String} The description of the place as a tree.
     */
    description(base, shift = "", id = 0) {
        return "./" + this.name;

    }

}