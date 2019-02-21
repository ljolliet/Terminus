
// Status list
const STATUS = {
    TODO : 0,
    STARTED : 1,
    DONE : 2
};


class Quest {

    constructor(name) {
        this.name = name;
        this.status = STATUS.TODO;
        this.endText = "";
        this.initialText = "";
        this.commandRequired = [];
        this.commandRewards = [];
    }

    /**
     * @return {String} Name
     */
    getName() { return this.name; }
    /**
     * @return {String} Presentation text.
     */
    getInitialtext() { return this.initialText; }
    /**
    * @return {String[] }Command rewards array.
     */
    getCommandRewards() { return this.commandRewards; }
    /**
    * @return {String} Text displayed at the end.
    */
    getEndText() { return this.endText; }
    /**
     * @return {String[]} Command array required to finish the quest.
     */
    getCommandRequired() { return this.commandRequired; }
    /**
     * @return {int} Advancement status.
     */
    getStatus() { return this.status; } 
    /**
     * @param {String[]} command Add to requirements.
     */
    addCommandRequired(command) { this.commandRequired.push(command); }
    /**
     * @param {String[]} command Add to rewards.
     */
    addCommandRewards(command) { this.commandRewards.push(command); }

}