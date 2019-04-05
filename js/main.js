const COLOR = {
    QUEST_DONE: "#79e234",
    QUEST_IN_PROGRESS: "#ef9029",
    QUEST_TODO: "#ef2929",
    PLACE: "#709ede",
    ITEM: "#ffffff",
    PNJ: "#ba55d3",
    SCRIPT: "#ffd700",
    OTHER: "#444444"
};

class Main {
    static printAllowed = true;

    static init(login) {
        //creating small world
        let quest = new Quest("quete");

        quest.initialText = "tente help puis essaie de regarder autour de toi ...";
        quest.endText = "Bien joué !";
        quest.addCommandRequired("help");
        quest.addCommandRequired("ls");
        quest.addCommandRewards(COMMAND_TYPE.MV);


        let quest2 = new Quest("quete2");

        quest2.initialText = "regarder autour de toi ...";
        quest2.endText = "Bien joué !";
        quest2.addCommandRequired("ls");
        quest2.addCommandRewards(COMMAND_TYPE.TREE);
        quest2.addQuestsRequired(quest);

        let script1 = new Script("hack-quetes.sh", "");
        script1.content = [
            "./quete.sh",
            "help",
            "ls",
            "cd A21",
            "./quete2.sh",
            "ls"
        ];

        /*let ioJson =  new IOjson("World.json");

        let Place_1 = ioJson.getPlace("Place_1");
        console.log(Place_1.getAll());*/

        let campus = new Place("campus");
        Place.root = campus;
        let bethanie = new Place("bethanie");
        Place.home = bethanie; // will be set has user's current location.
        let A22 = new Place("A22");
        let A21 = new Place("A21");

        let pnj = new PNJ("tata", "bonjour");
        let item = new Item("item", "superbe item");
        campus.addPlace(bethanie);
        bethanie.addQuest(quest);
        A21.addQuest(quest2);
        bethanie.addScript(script1);
        bethanie.addPlace(A22);
        bethanie.addPlace(A21);
        bethanie.addEntity(new Item(".caché", "contenue caché"));
        let p = new Place("Etage_1");
        let p2 = new Place("201");
        A21.addPlace(p);
        p.addPlace(p2);
        bethanie.addEntity(pnj);
        bethanie.addEntity(item);
        console.log(bethanie);

        let inventory = new Place("inventaire");
        bethanie.addPlace(inventory); // usually inventory is in home Place
        this.user = new User(login, [new Item("carte", "donnees")], inventory, []);
        if (login === "admin") {
            this.user.addCommand(COMMAND_TYPE.MV);
            this.user.addCommand(COMMAND_TYPE.TREE);
            this.user.addCommand(COMMAND_TYPE.GREP);
            this.user.addCommand(COMMAND_TYPE.JOBS);
            this.user.addCommand(COMMAND_TYPE.CLEAR);
            this.user.addCommand(COMMAND_TYPE.YES);
            this.user.addCommand(COMMAND_TYPE.CHMOD);
        }
        console.log(this.user); //here current location is bethanie (home)
    }

    /**
     * THIS FUNCTION SHOULD BE CALLED INSTEAD OF this.printMessage.
     * It will cancel this.printing if a pipe command is running.
     * @param message Message to this.print.
     * @param path Optional. If true, the function will this.print the path before the message.
     */
    static print(message, path = false){
        if(this.printAllowed){
            printMessage(message, path);
        }
    }

    /**
     * THIS FUNCTION SHOULD BE CALLED INSTEAD OF colorMessage.
     * It will cancel this.printing if a pipe command is running.
     * Print a colored message on the console output.
     * @param colorMsg [string, string]
     *          - 0: string to write
     *          - 1: string corresponding to the color
     */
    static colorPrint(colorMsg){
        if(this.printAllowed){
            colorMessage(colorMsg);
        }
    }

    /**
     * THIS FUNCTION SHOULD BE CALLED FROM THE TERMINAL.
     * It calls executeCommand(input, command) correctly by handling pipes.
     * @param {string} command a command typed by the user.
     */
    static executeCommand(command){
        let parser = new Parser(command, false);
        let parsedCommand = parser.getParsedCommand();

        if(parsedCommand.isPipe){
            this.printAllowed = false;
            let output = "";
            for(let i = 0; i < parsedCommand.size; i ++){
                if(i === parsedCommand.size - 1) this.printAllowed = true;

                let command = parsedCommand.getCommand(i);

                if(command.args[0] === "yes")
                    printMessage("Il est interdit d'utiliser yes avec pipe. On va donc ignorer yes.");
                else
                    output = this._executeCommand(output, command);
            }
        }else{
            this._executeCommand("", parsedCommand);
        }
    }

    /**
     * It parses, analyses and interprets the command given in argument.
     * It also writes the result to the terminal.
     * @param {string} input the input of the last command (related to pipe).
     * @param {Command} parsedCommand a command typed by the user.
     * @return {string} the output of the command called.
     */
    static _executeCommand(input, parsedCommand) {

        let commandChecker = new Checker(parsedCommand, this.user, false);

        let isValid = commandChecker.isCommandValid();
        let errorMessage = commandChecker.getErrorMessage();

        let output = "";

        switch (commandChecker.getCommandType()) {
            case COMMAND_TYPE.UNKNOWN:
                this.print(errorMessage);
                break;

            case COMMAND_TYPE.EXIT:
                if (isValid) output = Main.exit();
                else this.print(errorMessage);
                break;

            case COMMAND_TYPE.HELP:
                if (isValid) output = Main.help();
                else this.print(errorMessage);
                break;

            case COMMAND_TYPE.CD:
                if (isValid) output = Main.cd(parsedCommand.args);
                else this.print(errorMessage);
                break;

            case COMMAND_TYPE.CAT:
                if (isValid) output = Main.cat(input, parsedCommand.args);
                else this.print(errorMessage);
                break;

            case COMMAND_TYPE.LS:
                if (isValid)
                    if (parsedCommand.args.length === 1) output = Main.ls([]);
                    else output = Main.ls(Command.formatOptions(parsedCommand.args[1]));
                else this.print(errorMessage);
                break;

            case COMMAND_TYPE.LAUNCH:
                if (isValid) output = Main.launch(input, parsedCommand.args[0].slice(2));
                else this.print(errorMessage);
                break;

            case COMMAND_TYPE.MV:
                if (isValid) output = Main.mv(parsedCommand.args[1], parsedCommand.args[2]);
                else this.print(errorMessage);
                break;

            case COMMAND_TYPE.TREE:
                if (isValid) output = Main.tree();
                else this.print(errorMessage);
                break;

            case COMMAND_TYPE.GREP:
                if (isValid) output = Main.grep(input, parsedCommand.args[1]);
                else this.print(errorMessage);
                break;

            case COMMAND_TYPE.JOBS:
                if (isValid) output = Main.jobs();
                else this.print(errorMessage);
                break;

            case COMMAND_TYPE.CLEAR:
                if (isValid) output = Main.clear();
                else this.print(errorMessage);
                break;

            case COMMAND_TYPE.MAN:
                if (isValid) output = Main.man(parsedCommand.args[1]);
                else this.print(errorMessage);
                break;
            case COMMAND_TYPE.YES:
                if (isValid) output = Main.yes(parsedCommand.args[1], parsedCommand.isPipe);
                else this.print(errorMessage);
                break;
            case COMMAND_TYPE.CHMOD:
                if (isValid) output = output = Main.chmod(parsedCommand.args[1], parsedCommand.args[2]);
                else this.print(errorMessage);
                break;
        }

        Main.questAdvancement(parsedCommand.toString());

        return output;
    }


    /**
     * Here goes the code when the user has typed exit.
     */
    static exit() {
        if (this.user.currentQuest !== null) {
            this.print("Quête " + this.user.currentQuest.name + " stoppée");
            this.user.currentQuest = null;
        } else {
            // this.print("Tu es sur que tu souhaites quitter Terminus ? (yes/no)")
            reload();
        }

        return "";
    }

    /**
     * Here goes the code when the user has typed help.
     * @return {string} the command output.
     */
    static help() {
        let commands = "";
        for (let c of this.user.commandsAuthorized)
            commands += c.toString() + " ";
        this.print(commands);

        return commands;
    }

    /**
     * Here goes the code when the user has typed cd.
     * @param {[string]} args the command detail.
     * @return {string} the command output.
     */
    static cd(args) {
        let status;
        let message = "";

        if ((status = this.user.moveTo(args[1])) === COMMAND_STATUS.INCORRECT) // if move refused
            message = "cd: " + args[1] + " : Aucun lieu de ce type";
        else if (status === COMMAND_STATUS.PERMISSION_ISSUE)
            message = this.permissionMessage("cd", args[1]);
        //else : move done

        if(message !== "")
            this.print(message);

        return message;
    }

    /**
     * Here goes the code when the user has typed cat.
     * @param {String} input last command output (pipe)
     * @param {[string]} args the command detail.
     * @return {string} the command output.
     */
    static cat(input, args) {
        // does not support a path, only place name
        let text;
        let message = "";
        if ((text = this.user.read(args[1])) === null) // if move refused
            message = "cat: " + args[1] + " : Aucun item ou personnage de ce type";
        else if (text === COMMAND_STATUS.PERMISSION_ISSUE)
            message = this.permissionMessage("cat", args[1]);
        else
            message = text;

        this.print(message);

        return message;
    }

    /**
     * Here goes the code when the user has typed ls.
     * @param {String[]}options (formatted this way : ["option1", "option2])
     * @return {string} the command output.
     */
    static ls(options) {
        let objects = [];
        let message = "";
        if (!this.user.currentLocation.readAccess) {
            message = this.permissionMessage("ls", this.user.currentLocation.name);
        } else {
            if (this.user.currentLocation !== Place.root)
                objects.push(["..", COLOR.PLACE]);
            for (let p of this.user.currentLocation.all) {
                let tmp = "";
                if (!p.name.startsWith(".") || options.includes("a")) {    // don't show a hidden Entity/Place except when the command includes "all" option (-a).
                    message += p.name + " ";
                    if (p instanceof Place) {
                        if (p.containsQuestTodo())
                            tmp = "!";
                        objects.push([tmp + p.name, COLOR.PLACE]);
                    } else if (p instanceof Item) {
                        objects.push([p.name, COLOR.ITEM]);
                    } else if (p instanceof PNJ) {
                        objects.push([p.name, COLOR.PNJ]);
                    } else if (p instanceof Quest) {
                        let questAvailable = true;
                        for (let dependency of p.questsRequired) // to check if the quest is available (all dependencies done)
                            if (dependency.status !== STATUS.DONE)
                                questAvailable = false;
                        if (questAvailable) {
                            if (p.status === STATUS.TODO)
                                objects.push([p.name, COLOR.QUEST_TODO]);
                            if (p.status === STATUS.STARTED)
                                objects.push([p.name, COLOR.QUEST_IN_PROGRESS]);
                            if (p.status === STATUS.DONE)
                                objects.push([p.name, COLOR.QUEST_DONE]);
                        }
                    } else if (p instanceof Script) {
                        objects.push([p.name, COLOR.SCRIPT])
                    } else {
                        objects.push([p.name, COLOR.OTHER])
                    }
                }
            }
            this.colorPrint(objects);
        }

        return message;
    }

    /**
     * Here goes the code when the user has launched a quest.
     * @param {String} input last command output (pipe)
     * @param {String} scriptName The name of the script.
     * @return {string} the command output.
     */
    static launch(input, scriptName) {

        let message = "";

        // We try to launch the script
        let scriptLaunched = this.user.launchScript(scriptName);
        if(scriptLaunched === COMMAND_STATUS.PERMISSION_ISSUE)
            message = this.permissionMessage("./", scriptName);
        // If it did not launch, we check if it is a quest
        else if (scriptLaunched===COMMAND_STATUS.INCORRECT) {
            let info;
            if ((info = this.user.launchQuest(scriptName)) === INFO.UNKNOWN || info === INFO.LOCKED) // if quest doesn't exist
                message = "lancement de quête : " + scriptName + " : Aucune quête de ce type.";
            else if (info === COMMAND_STATUS.PERMISSION_ISSUE)
                message = this.permissionMessage("./", scriptName);
            else if (info === INFO.UNAVAILABLE)
                message = "La quête " + this.user.currentQuest.name + " est en cours, il est impossible de lancer deux quêtes simultanement.\n Pour stopper la quête en cours, tappe 'exit'.";
            else if (info === INFO.FINISHED)
                message = "La quête " + scriptName + " est déjà terminée.";
            else// INFO.FOUND
            {
                message = "Quête " + this.user.currentQuest.name + " lancée.\n";
                message += this.user.currentQuest.initialText;
            }
        }

        this.print(message);
        return message;
    }

    /**
     * Here goes the code when the user has typed mv.
     * @param {String} source
     * @param {String} destination
     * @return {string} the command output.
     */
    static mv(source, destination) {
        let message = "";
        let status = this.user.moveItem(source, destination);
        if ( status === COMMAND_STATUS.INCORRECT) // if move refused
            message = "mv: impossible d'évaluer '" + source + "' Aucun item ce type";
        else if (status === COMMAND_STATUS.PERMISSION_ISSUE)
            message = this.permissionMessage("mv", source);
        //else : move done

        if(message !== "")
            this.print(message);

        return message;
    }

    /**
     * Here goes the code when the user has typed tree.
     * @return {string} the command output.
     */
    static tree() {
        let message = this.user.currentLocation.description("|--", NBSPACE + NBSPACE + NBSPACE, 0);
        this.print(message);

        return message;
    }

    /**
     * Here goes the code when the user has typed clear.
     * @return {string} the command output.
     */
    static clear() {
        clear();
        return "";
    }

    /**
     * Here goes the code when the user has typed grp.
     * @param {String} input last command output (pipe)
     * @param {String} options
     * @return {string} the command output.
     */
    static grep(input, options) {
        let message = "";
        if(input !== undefined) {
            for (let line of input.split("\n")) {
                for (let word of line.split(" ")) {
                    if (word.includes(options)) {
                        message += word + "\n";
                    }
                }
            }
        }

        if(message === "")
            this.print("Aucune occurence trouvée.");
        else
            this.print(message);

        return message;
    }

    /**
     * Here goes the code when the user has typed tree.
     * @return {string} the command output.
     */
    static jobs() {
        let jobList = "";
        for (let q of Place.root.getQuestStarted())
            jobList += q[0].name + " : " + q[1].name + "\n";

        let message = jobList.slice(0, jobList.length - 1); // this.print and also remove the last '\n'
        this.print(message);

        return message;
    }

    /**
     * Manage the quest advancement and display when the user finis a quest.
     * @param {String} command Last command the user entered.
     * @return {string} the command output.
     */
    static questAdvancement(command) {
        let message = "";
        if (this.user.currentQuest !== null) { // check the quest advancement.
            let quest;
            if ((quest = this.user.checkQuest(command)) !== null) {
                console.log("check quets not null");
                message = quest.endText;
                message += "Quête : " + quest.name + " terminée.";
                if (quest.commandRewards.length !== 0)
                    message = "Commande(s) : " + quest.commandRewards + " dévérouillée(s).";
            }
        }

        if(message !== "")
            this.print(message);

        return message;
    }

    /**
     * @param command
     * @return {string} the command output.
     */
    static man(command) {
        // TODO
        return "";
    }

    /**
     * @param arg {string} yes argument,
     * @param isPipe {boolean} true whenever the command is a pipe command,
     * @return {string} the command output.
     */
    static yes(arg, isPipe) {
        let message = "";
        this.actualProcess = window.setInterval(() => {
            console.log("this.print");
            if(isPipe)
                message += arg;
            else
                this.print(arg);
        }, 100);
    }

    /**
     * Stop the process that is running
     * @return {boolean} true if a process was stopped.
     */
    static stop() {
        if (this.actualProcess != null) {
            clearInterval(this.actualProcess);
            this.actualProcess = null;
            return true;
        }

        return false;
    }

    /**
     *  Chmod command implementation
     * @param {String} options The rights to apply to the object.
     * @param {String} objectName The target of the command.
     * @return {string} the command output.
     */
    static chmod(options, objectName) {
        let message = "";
        let object;
        if ((object = this.user.getAll(objectName)) === null) // found the object
            message = "chmod: impossible d'accéder à '" + objectName + "': Aucun Lieu, Item ou Script de ce type";
        else if (object.setRights(options) === false)    // set the rights
            message = "chmod: mode incorrect : '" + options + "'";

        if(message !== "")
            this.print(message);

        return message;
    }

    /**
     * @param command The command typed by the user.
     * @param objectName The name of the object concerned.
     * @returns {String} The message to this.print.
     */
    static permissionMessage(command, objectName) {
        return command + ": " + objectName + ": Permission non accordée";
    }
}