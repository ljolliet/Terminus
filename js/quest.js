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
        this._questsRequired = [];
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