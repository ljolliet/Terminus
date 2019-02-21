class User {
    /**
     * @param {String} login
     */
    constructor(login) {
        this._items = [];
        this._trophies = [];
        this._commandsAuthorized = [COMMAND_TYPE.CAT, COMMAND_TYPE.CD, COMMAND_TYPE.EXIT, COMMAND_TYPE.HELP, COMMAND_TYPE.LS];
        this._login = login;
    }

    /**
     * @param {Item} item To add to user items.
     */
    addItem(item) {
        this._items.push(item);
    }

    /**
     * @param {String} trophy To add to user trophies.
     */
    addTrophy(trophy) {
        this._trophies.push(trophy);
    }

    /**
     * @param {int} command To add to user allowed commands.
     */
    addCommand(command) {
        this._commandsAuthorized.push(command);
    }

    /**
     * @param {int[]} commands To add multiple commands to user allowed commands.
     */
    addCommands(commands) {
        for (let c of commands)
            this._commandsAuthorized.push(c);
    }

    /**
     * @return {String} User login.
     */
    get login() {
        return this._login;
    }

    /**
     * @return {Item[]} Items owned by the user.
     */
    get items() {
        return this._items;
    }

    /**
     * @return {String[]} Quests name finished by the user.
     */
    get trophies() {
        return this._trophies;
    }

    /**
     * @return {COMMAND_TYPE[]} Commands allowed.
     */
    get commandsAuthorized() {
        return this._commandsAuthorized;
    }
}