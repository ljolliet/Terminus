class Main {

    static init() {

        //creating small world
        let quest = new Quest("quete");

        quest.initialText = "tente help puis essaie de regarder autour de toi ...";
        quest.endText = "Bien joué !";
        quest.addCommandRequired("help");
        quest.addCommandRequired("ls");

        quest.addCommandRewards(COMMAND_TYPE.MV);

        let campus = new Place("campus");
        Place.root = campus;
        let bethanie = new Place("bethanie");
        Place.home = bethanie; // will be set has user's current location.
        let A22 = new Place("A22");
        let A21 = new Place("A21");

        let pnj = new PNJ("tata", "bonjour");
        campus.addPlace(bethanie);
        bethanie.addQuest(quest);
        bethanie.addPlace(A22);
        bethanie.addPlace(A21);
        bethanie.addEntity(pnj);
        console.log(bethanie);

        let inventory = new Place("inventaire");
        bethanie.addPlace(inventory); // usually inventory is in home Place
        this.user = new User("toto", [new Item("carte","donnees")], inventory,["try.sh"]);
        console.log(this.user); //here current location is bethanie (home)
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
        let commandChecker = new Checker(parsedCommand, false);
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
                if (isValid) Main.cd(parsedCommand[0]);
                else printMessage(errorMessage);
                break;

            case COMMAND_TYPE.CAT:
                if (isValid) Main.cat(parsedCommand[0]);
                else printMessage(errorMessage);
                break;

            case COMMAND_TYPE.LS:
                if (isValid) Main.ls();
                else printMessage(errorMessage);
                break;

            case COMMAND_TYPE.LAUNCH:
                if (isValid) Main.launch(parsedCommand[0].main);
                else printMessage(errorMessage);
                break;
        }

        Main.questAdvancement(command);
    }


    /**
     * Here goes the code when the user has typed exit.
     */
    static exit() {
        if (this.user.currentQuest !== null) {
            printMessage("Quête " + this.user.currentQuest.name + " stoppée");
            this.user.currentQuest = null;
        } else {
            printMessage("Tu es sur que tu souhaite quitter Terminus ? (yes/no)")
            //TODO
        }
    }

    /**
     * Here goes the code when the user has typed help.
     */
    static help() {
        let commands = "";
        for (let c of this.user.commandsAuthorized)
            commands += c.toString() + " ";
        printMessage(commands);
    }

    /**
     * Here goes the code when the user has typed cd.
     * @param {string} command the command detail.
     */
    static cd(command) {
        if (!this.user.moveTo(command.args[0]))// if move refused
            printMessage("cd: " + command.args[0] + " : Aucun lieu de ce type");
        //else : move done
    }

    /**
     * Here goes the code when the user has typed cat.
     * @param {String} command the command detail.
     */
    static cat(command) {
        // does not support a path, only place name
        let text;
        if ((text = this.user.read(command.args[0])) === "")// if move refused
            printMessage("cat: " + command.args[0] + " : Aucun item ou personnage de ce type");
        else
            printMessage(text);
    }

    /**
     * Here goes the code when the user has typed ls.
     */
    static ls() {
        let m = "";
        if (this.user.currentLocation !== Place.root)
            m = ".. ";
        for (let p of this.user.currentLocation.all) {
            if (p instanceof Place && p.containsQuestTodo())
                m += "!";
            m += p.name + " ";
        }
        printMessage(m);
    }

    /**
     * Here goes the code when the user has launch a quest.
     * @param {String} questName The name of the quest.
     */
    static launch(questName) {
        let info;
        if ((info = this.user.launch(questName)) === INFO.UNKNOWN)// if quest doesn't exist
            printMessage("lancement de quête : " + questName + " : Aucune quête de ce type");
        else if (info === INFO.UNAVAILABLE) {
            printMessage("La quête " + this.user.currentQuest.name + " est en cours, il est impossible de lancer deux quêtes simultanement.\n Pour stopper la quête en cours, tappe 'exit'");
        } else if (info === INFO.FINISHED) {
            printMessage("La quête " + questName + " est déjà terminée");
        } else    // INFO.FOUND
        {
            printMessage("Quête " + this.user.currentQuest.name + " lancée");
            printMessage(this.user.currentQuest.initialText);
        }
    }


    /**
     * Manage the quest advancement and display when the user finis a quest.
     * @param {String} command Last command the user entered.
     */
    static questAdvancement(command) {
        if (this.user.currentQuest !== null) {  // check the quest advancement.
            let quest;
            if ((quest = this.user.checkQuest(command)) !== null) {
                printMessage(quest.endText);
                printMessage("Quête : " + quest.name + " terminée");
                if (quest.commandRewards.length !== 0)
                    printMessage("Commande(s) : " + quest.commandRewards + " dévérouillée(s)")
            }
        }
    }
}