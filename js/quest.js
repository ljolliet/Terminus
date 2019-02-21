// Status list
var TODO = 0;
var STARTED = 1;
var DONE = 2;

class Quest {

    constructor(name) {
        this.name = name;
        this.status = TODO;
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
    * @return {Command[] }Command rewards array.
     */
    getCommandRewards() { return this.commandRewards; }
    /**
    * @return {String} Text displayed at the end.
    */
    getEndText() { return this.endtext; }
    /**
     * @return {Command[]} Command array required to finish the quest.
     */
    getCommandRequired() { return this.commandRequired; }
    /**
     * @return {int} Advancement status.
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