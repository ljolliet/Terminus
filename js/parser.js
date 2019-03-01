/**
 * It is used to parse a command that the user has typed.
 * It supports :
 * - Commands without arguments (cd, ls, ...),
 * - Commands with arguments (ls -la, ...),
 * - Commands with pipes (ls -la | grep folder, ...)
 */
class Parser {

    /**
     *
     * @param {string} command the command that the user typed.
     * @param {boolean} verbose if true, it writes information about parsing
     */
    constructor(command, verbose) {
        this.command = command;
        this.verbose = verbose;

        this.commands = [];
    }

    /**
     * It parses the command.
     * You should use getCommands() to retrieve the command parsed.
     */
    parseCommand() {
        if (this.command.length == 0) {
            if (this.verbose) {
                console.log("[Parser] The command is empty");
            }

            this.commands.push({
                main: "",
                args: ""
            });
        } else {
            // The terminal may create some "&nbsp;" which are spaces, se we need to replace it
            let fixedCommand = this.command.replace(/\u00a0/g, " ")

            // We use a regex to remove the tabs, the new lines, and extra spaces
            fixedCommand = this.command.replace(/\s\s+/g, " ");

            // We devide the command in multiple commands if there was a pipe
            let cmds = fixedCommand.split("|");

            // For each commands between the pipe, we will add its details to the array
            for (let i = 0; i < cmds.length; i++) {
                let args = cmds[i].split(" ");

                // Shift removes the first item and returns the removed item
                let cmdMain = args.shift();
                let cmdArgs = args;

                let cmdObj = {
                    main: cmdMain,
                    args: cmdArgs
                };

                this.commands.push(cmdObj);
            }

            if (this.verbose) {
                console.log(this.commands);
            }
        }
    }

    /**
     * @param {string} command a command that the user has typed.
     */
    setCommand(command) {
        this.command = command;
    }

    /**
     * @returns the command.
     */
    getCommand() {
        return this.command;
    }

    /**
     * The value returned is a **list of all the commands** in this format :
     *
     * obj = { main: theMainCommand,
     *         args: theArguments
     *       };
     *
     * - theMainCommand: it is a string containing the main command
     * - theArguments: it is a list of string containing all of the arguments.
     *
     *
     * **Example : The user types ls -la | grep folder**
     *
     * The output will be :
     * [{main: "ls", args: ["-la"]},
     *  {main: "grep", args: ["folder"]}];
     *
     * **Example on how to use it :**
     *
     * let commands = getCommands();
     * - commands[0].main or commands[0]["main"] returns the first main command,
     * - commands[0].args or commands[0]["args"] returns the arguments of the first command.
     * Then, if the user used one or more pipes, the commands are sorted, and you have to go to the
     * index #1 for the second command, then #2 for the third and so on.
     *
     * @returns all the commands parsed (list of {main, args}) **never null**.
     */
    getCommandList() {
        if (this.commands === null) {
            return [];
        } else {
            return this.commands;
        }
    }
}