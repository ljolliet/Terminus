class Main {

    static init() {

        //creating small world
        let quest = new Quest("try");
        quest.initialText = "try quest !";
        quest.endText = "Well done";
        quest.addCommandRequired("ls");

        let campus = new Place("campus");
        Place.root = campus;
        let bethanie = new Place("bethanie");
        Place.home = bethanie; // will be set has user's current location.
        let A22 = new Place("A22");
        let A21 = new Place("A21");

        let pnj = new PNJ("tata", "welcome");
        campus.addPlace(bethanie);
        campus.addQuest(quest);
        bethanie.addPlace(A22);
        bethanie.addPlace(A21);
        bethanie.addEntity(pnj);
        console.log(bethanie);

        this.user = new User("toto");
        console.log(this.user); //here current location is bethanie (home)

        //sample :
        printMessage("cd A22");
        Main.cd("A22");
        printMessage("cd ..");
        Main.cd(".."); // parent
        printMessage("cd A2890");
        Main.cd("A2890");
        console.log(this.user);// here bethanie
        printMessage("ls");
        Main.ls("");
        printMessage("cat tata");
        Main.cat("tata");
        printMessage("cat toto");
        Main.cat("toto");
        printMessage("help");
        Main.help()
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
        let commands = "";
        for(let c of this.user.commandsAuthorized)
            commands+=c.toString()+" ";
        printMessage(commands);
    }

    /**
     * Here goes the code when the user has typed cd.
     * @param {string} command the command detail.
     */
    static cd(command) {
        //basic only
        // does not support a path, only place name
        if (!this.user.moveTo(command))// if move refused
            printMessage("cd: " + command + " : Aucun lieu de ce type");
        //else : move done
    }

    /**
     * Here goes the code when the user has typed cat.
     * @param {string} command the command detail.
     */
    static cat(command) {
        //basic only
        for (let e of this.user.currentLocation.entities) {
            if (command === e.name)
                printMessage(e.text);
            else
                printMessage("cat: " + command + " : Aucun item ou personnage de ce type");
        }
    }

    /**
     * Here goes the code when the user has typed ls.
     * @param {string} command the command detail.
     */
    static ls(command) {
        //basic only
        let m = ".. ";
        for (let p of this.user.currentLocation.all) {
            m += p.name + " ";
        }
        printMessage(m);
    }

}