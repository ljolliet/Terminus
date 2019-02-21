var TODO = 0;
var STARTED = 1;
var DONE = 2;

class Quest {

    constructor(name) {
        this.name = name;
        this.status = 0;
    }

    /**
     * @returns {String} Name
     */
    getName() { return this.name; }
    /**
     * @returns {String} Presentation text.
     */
    getInitialtext() { return this.initialText; }
    /**
    * @returns {Command[] }Command rewards array.
     */
    getCommandRewards() { return this.commandRewards; }
    /**
    * @returns {String} Text displayed at the end.
    */
    getEndText() { return this.endtext; }
    /**
     * @returns {Command[]} Command array required to finish the quest.
     */
    getCommandRequired() { return this.commandRequired; }
    /**
     * @returns {int} Advancement status.
     */
    getStatus() { return this.status; }
    /**
     * @param {Command[]} command Add to requirements.
     */
    addCommandRequired(command) { this.commandRequired.push(command); }
    /**
     * @param {Command[]} command Add to rewards.
     */
    addCommandRewards(command) { this.commandRewards.push(command); }

}