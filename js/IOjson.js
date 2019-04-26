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
}

