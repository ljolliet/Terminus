const json = '{\n' +
    '  "World": {\n' +
    '    "Places": [\n' +
    '      {\n' +
    '        "placeName": "Campus",\n' +
    '        "next_Place": [\n' +
    '          "Arts_et_Metiers",\n' +
    '          "Bethanie",\n' +
    '          "Doyen_Brus"\n' +
    '        ],\n' +
    '        "quests": [],\n' +
    '        "pnj": [],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "Bethanie",\n' +
    '        "next_Place": [\n' +
    '          "A21",\n' +
    '          "A22",\n' +
    '          "CREMI",\n' +
    '          "pont"\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          "la_traversée_eternelle.sh"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "Pr.Chen",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "A22",\n' +
    '        "next_Place": [\n' +
    '          "Amphi_Henri_Poincaré",\n' +
    '          "Amphi_Thomas_Edison",\n' +
    '          "guichet_unique"\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          "le_vaste_monde.sh"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "Pr.Ofaite",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "Amphi_Henri_Poincaré",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [\n' +
    '          "les_documents_confidentiels.sh"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "A.Dumbledore",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "Amphi_Thomas_Edison",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [],\n' +
    '        "pnj": [],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "guichet_unique",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [\n' +
    '          "le_rangement_IKEA.sh"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "A.Dibou",\n' +
    '            "text": ""\n' +
    '          },\n' +
    '          {\n' +
    '            "name": "Deadpool",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [\n' +
    '          {\n' +
    '            "name": "carte_etudiante",\n' +
    '            "text": ""\n' +
    '          },\n' +
    '          {\n' +
    '            "name": "certificat_de_scolarité",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "Inventaire",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [\n' +
    '          "armoire_a_trophées.sh"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "A.Dibou",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [\n' +
    '          {\n' +
    '            "name": "armoire_a_trophées",\n' +
    '            "text": ""\n' +
    '          },\n' +
    '          {\n' +
    '            "name": "liens_utiles",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "CREMI",\n' +
    '        "next_Place": [\n' +
    '          "1er_Etage",\n' +
    '          "2eme_Etage",\n' +
    '          "3eme_Etage"\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          "ENT_legendaire.sh"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "Fred&Jamy",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [\n' +
    '          {\n' +
    '            "name": "lien_ent",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "3eme_Etage",\n' +
    '        "next_Place": [\n' +
    '          "passage_interdit"\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          "power.sh"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "Dark_Lord",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "pont",\n' +
    '        "next_Place": [\n' +
    '          "passage_interdit"\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          "les_constructeurs_de_l\'extreme.sh"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "Frodon",\n' +
    '            "text": ""\n' +
    '          },\n' +
    '          {\n' +
    '            "name": "Gandalf",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [],\n' +
    '        "script": [\n' +
    '          {\n' +
    '            "name": "traversée_pont.sh",\n' +
    '            "content": [\n' +
    '            ],\n' +
    '            "args": [\n' +
    '            ]\n' +
    '          }\n' +
    '        ]\n' +
    '      }\n' +
    '    ],\n' +
    '    "Quests": [\n' +
    '      {\n' +
    '        "number": 1,\n' +
    '        "name": "Super Nom de Quête",\n' +
    '        "requirement": [\n' +
    '          "Quest_X"\n' +
    '        ],\n' +
    '        "commands_Rewards": [\n' +
    '          "Command_1",\n' +
    '          "Command_2"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          "Dumbledor",\n' +
    '          "PNJ 2"\n' +
    '        ],\n' +
    '        "status": "Bloquée",\n' +
    '        "text_Start": "azertyuiopqsdfghjklmwxcvbn",\n' +
    '        "text_End": "azertyuiopqsdfghjklmwxcvbn",\n' +
    '        "commandRequired": [\n' +
    '          "ls -a",\n' +
    '          "cat myFile.txt"\n' +
    '        ]\n' +
    '      }\n' +
    '    ],\n' +
    '    "User": {\n' +
    '      "pseudo": "XxSuperEtudiantTrôFort33xX",\n' +
    '      "inventaire": [\n' +
    '        {\n' +
    '          "name": "Lampe",\n' +
    '          "text": "Utilise blablabla"\n' +
    '        }\n' +
    '      ],\n' +
    '      "commands": [\n' +
    '        "ls",\n' +
    '        "cat",\n' +
    '        "cd"\n' +
    '      ],\n' +
    '      "questsEnded": [\n' +
    '        "Quest_1"\n' +
    '      ]\n' +
    '    }\n' +
    '  }\n' +
    '}\n' +
    '\n';

class IOjson{

    /**
     * It is used to read and write in json files.
     */


    /**
     * @param {string} file the file to read or write.
     */
    constructor(/*file*/) {
        this._json = JSON.parse(json);
    }

    /*loadJSON(callback) {

       var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
       xobj.open('GET', this._file, true); // Replace 'my_data' with the path to your file
       xobj.onreadystatechange = function () {
           if (xobj.readyState == 4 && xobj.status == "200") {
               // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
               callback(xobj.responseText);
           }
       };
       xobj.send(null);
   }
*/

    // ---------------------------------------- Récupération des différents éléments de Place ---------------------- //
    /**
     * return all places of the _file.json
     */
    getAllPlaces(){
        return this._json.World.Places;
    }


    // Rentrer parent en plus pour vérifier que le parent de la place soit le même que celui
    getPlace(name, parent){
        let places = this.getAllPlaces();
        console.log(places);
        let place = places.find( (place) => {
            return (place.placeName === name && place.parent === parent);
        });
        console.log(place);
        return place;
    }

    getAccessiblePlace(name){
        return this.getPlace(name).next_Place;
    }

    getPlacePNJ(placeName){
        return this.getPlace(placeName).pnj;
    }

    getPlaceItems(placeName){
        return this.getPlace(placeName).items;
    }

    getPlaceScript(placeName){
        return this.getPlace(placeName).script;
    }

    // ---------------------------------------- Récupération des différents éléments de Quest ---------------------- //

    /**
     * return all quests of the _file.json
     */
    getAllQuests(){
        return this._json.World.Quests;
    }

    getQuest(questName){
        let quests = this.getAllQuests();
        console.log(quests);
        let quest = quests.find( (quest) => {
            return quests.name === questName;
        });
        console.log(quest);
        return quest;
    }

    getQuestRequirements(questName){
        return this.getQuest(questName).requirement;
    }

    getQuestCommandsRewards(questName){
        return this.getQuest(questName).commands_Rewards;
    }

    getQuestPNJ(questName){
        return this.getQuest(questName).pnj;
    }

    getQuestStatus(questName){
        return this.getQuest(questName).status;
    }

    getQuestTextStart(questName){
        return this.getQuest(questName).text_Start;
    }

    getQuestTextEnd(questName){
        return this.getQuest(questName).text_End;
    }

    getQuestCommandRequired(questName){
        return this.getQuest(questName).commandRequired;
    }


    /*  Getters and Setters   */

    getFile(){
        return this._file;
    }

    setFile(file){
        this._file = file;
    }
}

