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
        console.log(this._json);

        //this._json = JSON.parse(json);
    }

    // ---------------------------------------- Get all place elements ------------------------------- //
    /**
     * return all places of the _file.json
     */
    getAllPlaces(){
        return this._json.World.Places;
    }


    // Rentrer parent en plus pour vérifier que le parent de la place soit le même que celui
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
        //console.log(this._json.World.User.login);
        return this._json.World.User;
    }

    getUserLogin(){
       /* console.log("LOGIN : ");
        console.log(this.getUser().login);*/
        return this.getUser().login;
    }

    getUserInventory(){
        return this.getUser().inventory;
    }

    getUserCommands(){
        return this.getUser().commands;
    }

    getUserQuestsEnded(){
        return this.getUser().questsEnded;
    }



    /*  Getters and Setters   */

    getFile(){
        return this._file;
    }

    setFile(file){
        this._file = file;
    }

    test(){

        console.log("Test methodes pour Places : ");
        console.log(this.getAllPlaces());
        console.log(this.getAccessiblePlace(0));
        console.log(this.getPlacePNJ(0));
        console.log(this.getPlaceItems(0));
        console.log(this.getPlaceScript(0));

        console.log("Test methodes pour Quests : ");
        console.log(this.getAllQuests());
        console.log(this.getQuest(1));
        console.log(this.getQuestRequirements(1));
        console.log(this.getQuestCommandsRewards(1));
        //console.log(this.getQuestPNJ("la_traversée_eternelle.sh"));
        console.log(this.getQuestStatus(1));
        console.log(this.getQuestTextStart(1));
        console.log(this.getQuestTextEnd(1));
        console.log(this.getQuestCommandRequired(1));

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
                console.log(quest.commandRequired);
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
                console.log(this.getPlaceScript(place.id)[0].name);
                console.log(this.getPlaceScript(place.id)[0].args);
                console.log(this.getPlaceScript(place.id)[0].content);
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

