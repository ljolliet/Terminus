class Main {

    static init() {
        let user = new User("toto");
        let quest = new Quest("try");
        quest.initialText = "try quest !";
        quest.endText = "Well done" ;
        quest.addCommandRequired("ls");

        let campus = new Place("campus");
        let bethanie = new Place("bethanie");

        let pnj = new PNJ("tata", "welcome");
        campus.addPlace(bethanie);
        campus.addQuest(quest);
        campus.addEntity(pnj);
        console.log(campus.toString())

    }

    /**
     * It parses, analyses and interprets the command given in argument.
     * It also writes the result to the terminal.
     * @param {string} command a command typed by the user.
     */
    static executeCommand(command) {

        // First we need to parse the command
        let parser = new Parser(command, false);
        parser.parseCommand();
        let parsedCommand = parser.getCommandList();

        // Now we have the command list, so we can check if there are some errors
        let commandChecker = new CommandChecker(parsedCommand, false);
        commandChecker.analyseCommand();

        let isValid = commandChecker.isCommandValid();
        let errorMessage = commandChecker.getErrorMessage();

        switch (commandChecker.getCommandType()) {
            case COMMAND_TYPE.UNKNOWN:
                printMessage(errorMessage);
                break;

            case COMMAND_TYPE.EXIT:
                if (isValid) Main.exit();
                else printMessage(errorMessage);
                break;

            case COMMAND_TYPE.HELP:
                if (isValid) Main.help();
                else printMessage(errorMessage);
                break;

            case COMMAND_TYPE.CD:
                if (isValid) Main.cd(command[0]);
                else printMessage(errorMessage);
                break;

            case COMMAND_TYPE.CAT:
                if (isValid) Main.cat(command[0]);
                else printMessage(errorMessage);
                break;

            case COMMAND_TYPE.LS:
                if (isValid) Main.ls(command[0]);
                else printMessage(errorMessage);
                break;
        }
    }


    /**
     * Here goes the code when the user has typed exit.
     */
    static exit() {
    }

    /**
     * Here goes the code when the user has typed help.
     */
    static help() {
    }

    /**
     * Here goes the code when the user has typed cd.
     * @param {string} command the command detail.
     */
    static cd(command) {
    }

    /**
     * Here goes the code when the user has typed cat.
     * @param {string} command the command detail.
     */
    static cat(command) {
    }

    /**
     * Here goes the code when the user has typed ls.
     * @param {string} command the command detail.
     */
    static ls(command) {
    }

}