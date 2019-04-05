/**
 * It is used to parse a command that the user has typed.
 * It supports :
 * - Commands without arguments (cd, ls, ...),
 * - Commands with arguments (ls -la, ...),
 * - Commands with pipes (ls -la | grep folder, ...)
 */
class Parser {

    /**
     * It creates a Parser class that parses automatically the command given.
     * @param {string} command the command that the user typed.
     * @param {boolean} verbose if true, it writes information about parsing
     */
        constructor(command, verbose = false) {
        this._command = command;
        this._verbose = verbose;
        this._commands = [];

        this._parseCommand();
    }

    /**
     * It parses the command.
     * You should use getCommands() to retrieve the command parsed.
     */
    _parseCommand() {
        if (this._command.length === 0) {
            if (this._verbose) {
                console.log("[Parser] The command is empty");
            }
        } else {
            // We use a regex to remove the tabs, the new lines, and extra spaces
            let fixedCommand = this._command.replace(/\s\s+/g, " ");

            // The terminal may create some "&nbsp;" which are spaces, se we need to replace it
            // !!!! DO NOT EDIT THIS LINE, THE FIRST SPACE IS A &nbsp; SPACE (char code 160), AND
            // THE RIGHT ONE IS A REGULAR SPACE (char code 32)
            fixedCommand = fixedCommand.replaceAll(" ", " ");

            // We need to remove the spaces before and after the pipe, otherwise the split
            // takes "" as the main command
            fixedCommand = fixedCommand.replaceAll("| ", "|");
            fixedCommand = fixedCommand.replaceAll(" |", "|");

            // We divide the command in multiple commands if there was a pipe
            let cmds = fixedCommand.split("|");

            // For each commands between the pipe, we will add its details to the array
            for (let i = 0; i < cmds.length; i++) {
                let args = cmds[i].split(" ");
                this._commands.push(args);
            }

            if (this._verbose) {
                console.log(this._commands);
            }
        }
    }

    /**
     * It updates the command and parses it.
     * @param {string} command a command that the user has typed.
     */
    setCommand(command) {
        this._command = command;
        this._commands = [];
        this._parseCommand();
    }

    /**
     * @returns {Command} the command **can be null**.
     */
    getParsedCommand() {
        return new Command(this._commands);
    }
}

String.prototype.replaceAll = function (search, replacement) {
    const target = this;
    return target.split(search).join(replacement);
};