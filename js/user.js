class User {

    constructor(login) {
        this.login = login;
    }
    /**
     * @return {Item[]} Items owned by the user.
     */
    getItems() { return this.items; }
    /**
     * @return {String[]} Quests name finished by the user.
     */
    getTrophies() { return this.trophies; }
    /**
     * @return {Command[]} Commands allowed.
     */
    getCommandsAuthorized() { return this.commandsAuthorized; }
    /**
     * @param {Item} item To add to user items.
     */
    addItem(item) { this.items.push(item); }
    /**
     * @param {String} trophy To add to user trophies. 
     */
    addTrophy(trophy) { this.trophies.push(trophy); }
    /**
     * @param {Command} command To add to user allowed commands.
     */
    addCommand(command) { this.commandsAuthorized.push(command); }

}