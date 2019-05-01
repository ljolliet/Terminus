class IOjson{

    /**
     * It is used to read and write in json files.
     */


    /**
     * @param {string} file the file to read or write.
     */
    constructor(json) {
        let strWorldJson = JSON.stringify(json);
        this._json = JSON.parse(strWorldJson);
    }

    // ---------------------------------------- Get all place elements ------------------------------- //
    /**
     * return all places of the _file.json
     */
    getAllPlaces(){
        return this._json.World.Places;
    }


    getPlace(id){
        let places = this.getAllPlaces();
        let place = places.find( (place) => {
            return (place.id === id);
        });
        return place;
    }

    getPlaceQuests(id){
        return this.getPlace(id).quests;
    }

    getAccessiblePlace(id){
        return this.getPlace(id).next_Place;
    }

    getPlacePNJ(id){
        return this.getPlace(id).pnj;
    }

    getPlaceItems(id){
        return this.getPlace(id).items;
    }

    getPlaceScript(id){
        return this.getPlace(id).script;
    }

    // ---------------------------------------- Get all quests elements ------------------------------- //

    /**
     * return all quests of the _file.json
     */
    getAllQuests(){
        return this._json.World.Quests;
    }

    getQuest(id){
        let quests = this.getAllQuests();
        return quests.find((quest) => {
            return quest.id === id;
        });
    }

    getQuestRequirements(id){
        return this.getQuest(id).requirement;
    }

    getQuestCommandsRewards(id){
        return this.getQuest(id).commands_Rewards;
    }

    getQuestStatus(id){
        return this.getQuest(id).status;
    }

    getQuestTextStart(id){
        return this.getQuest(id).text_Start;
    }

    getQuestTextEnd(id){
        return this.getQuest(id).text_End;
    }

    getQuestCommandRequired(id){
        return this.getQuest(id).commandRequired;
    }

    // ---------------------------------------- Get all user elements ------------------------------- //

    getUser(){
        return this._json.World.User;
    }

    getUserCommands(){
        return this.getUser().commands;
    }

    setUserCommands(user) {
        this.getUserCommands().forEach((command) => {

        switch (command) {
            case "exit":
                user.addCommand(COMMAND_TYPE.EXIT);
                break;

            case "help":
                user.addCommand(COMMAND_TYPE.HELP);
                break;

            case "cd" :
                user.addCommand(COMMAND_TYPE.CD);
                break;

            case "cat" :
                user.addCommand(COMMAND_TYPE.CAT);
                break;

            case "ls" :
                user.addCommand(COMMAND_TYPE.LS);
                break;

            case "mv" :
                user.addCommand(COMMAND_TYPE.MV);
                break;

            case "tree" :
                user.addCommand(COMMAND_TYPE.TREE);
                break;

            case "grep" :
                user.addCommand(COMMAND_TYPE.GREP);
                break;

            case "jobs" :
                user.addCommand(COMMAND_TYPE.JOBS);
                break;

            case "clear" :
                user.addCommand(COMMAND_TYPE.CLEAR);
                break;

            case "man" :
                user.addCommand(COMMAND_TYPE.MAN);
                break;

            case "yes" :
                user.addCommand(COMMAND_TYPE.YES);
                break;

            case "chmod" :
                user.addCommand(COMMAND_TYPE.CHMOD);
                break;

            case "touch" :
                user.addCommand(COMMAND_TYPE.TOUCH);
                break;

            case ">" :
                user.addCommand(COMMAND_TYPE.WRITE);
                break;

            case ">>" :
                user.addCommand(COMMAND_TYPE.APPEND);
                break;

            default :
                user.addCommand(COMMAND_TYPE.UNKNOWN);
                break;
        }
        });
    }

    init(login, PlaceTab, QuestTab){
        // translate quests from json
        for (let q of this.getAllQuests()) {
            QuestTab.push(new Quest(q.name, q.id));
        }

        // Create Quests
        QuestTab.forEach( (quest) => {

            let questRequirementTab = this.getQuestRequirements(quest.id);

            //add quest's quest required
            questRequirementTab.forEach( (questRequired) => {
                let q = this.findQuest(questRequired);

                quest.addQuestsRequired(q);
            });

            // set quest's initial text
            quest.initialText = this.getQuestTextStart(quest.id);

            // set quest's end text
            quest.endText = this.getQuestTextEnd(quest.id);

            //add quest's commands required
            this.getQuestCommandRequired(quest.id).forEach( (command) => {

                if (command.includes('#login')){
                    quest.addCommandRequired(command.replace('#login', login));
                }
                else
                    quest.addCommandRequired(command);
            });

            //add quest's commands rewards
            this.getQuestCommandsRewards(quest.id).forEach( (command) => {
                switch (command) {
                    case "exit":
                        quest.addCommandRewards(COMMAND_TYPE.EXIT);
                        break;

                    case "help":
                        quest.addCommandRewards(COMMAND_TYPE.HELP);
                        break;

                    case "cd" :
                        quest.addCommandRewards(COMMAND_TYPE.CD);
                        break;

                    case "cat" :
                        quest.addCommandRewards(COMMAND_TYPE.CAT);
                        break;

                    case "ls" :
                        quest.addCommandRewards(COMMAND_TYPE.LS);
                        break;

                    case "mv" :
                        quest.addCommandRewards(COMMAND_TYPE.MV);
                        break;

                    case "tree" :
                        quest.addCommandRewards(COMMAND_TYPE.TREE);
                        break;

                    case "grep" :
                        quest.addCommandRewards(COMMAND_TYPE.GREP);
                        break;

                    case "jobs" :
                        quest.addCommandRewards(COMMAND_TYPE.JOBS);
                        break;

                    case "clear" :
                        quest.addCommandRewards(COMMAND_TYPE.CLEAR);
                        break;

                    case "man" :
                        quest.addCommandRewards(COMMAND_TYPE.MAN);
                        break;

                    case "yes" :
                        quest.addCommandRewards(COMMAND_TYPE.YES);
                        break;

                    case "chmod" :
                        quest.addCommandRewards(COMMAND_TYPE.CHMOD);
                        break;

                    case ">" :
                        quest.addCommandRewards(COMMAND_TYPE.WRITE);
                        break;

                    case ">>" :
                        quest.addCommandRewards(COMMAND_TYPE.APPEND);
                        break;

                    default :
                        quest.addCommandRewards(COMMAND_TYPE.UNKNOWN);
                        break;

                }
            })
        });


        // translate places from json
        for (let p of this.getAllPlaces()) {
            PlaceTab.push(new Place(p.placeName, p.id));
        }

        // create Places
        PlaceTab.forEach( (place) => {

            let nextPlaceTab = this.getAccessiblePlace(place.id);

            //add accessible places from place
            nextPlaceTab.forEach( (nextPlace) => {
                let next = this.findPlace(nextPlace);

                place.addPlace(next);
            });

            // add place's quests
            this.getPlaceQuests(place.id).forEach( (quest) => {
                let q = this.findQuest(quest);
                if (login === "admin") {
                    q.questsRequired = [];
                }
                place.addQuest(q);

            });

            // add place's PNJ
            this.getPlacePNJ(place.id).forEach( (pnj) => {
                let pnj1 = new PNJ(pnj.name, pnj.text);
                place.addEntity(pnj1);
            });

            // add place's Items
            this.getPlaceItems(place.id).forEach( (item) => {
                let i = new Item(item.name, item.text);
                place.addEntity(i);
            });

            // add place's scripts
            if (this.getPlaceScript(place.id)[0] !== undefined){

                let obj = this.getPlaceScript(place.id)[0];
                let script = new Script(obj.name, obj.args);
                script.content = obj.content;

                place.addScript(script);
            }

        });
    }

    /**
     * Search in PlaceTab and return a place
     * @param {int} id The id of the place
     * @returns {Place}
     */
    findPlace(id){

        return PlaceTab.find(function (place) {
            return (place.id === id);
        });
    }

    /**
     * Search in PlaceTab and return a place
     * @param {int} id The id of the Quest
     * @returns {Quest}
     */
     findQuest(id){

        return QuestTab.find(function (quest) {
            return (quest.id === id);
        });
    }
}

