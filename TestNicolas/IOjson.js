const json = '{\n' +
    '  "World": {\n' +
    '    "Places": [\n' +
    '      {\n' +
    '        "placeName": "Campus",\n' +
    '        "parent": null,\n' +
    '        "next_Place": [\n' +
    '          "Arts_et_Metiers",\n' +
    '          "Bethanie",\n' +
    '          "Doyen_Brus"\n' +
    '        ],\n' +
    '        "quests": ["test", "test2"],\n' +
    '        "pnj": ["pnj1", "pnj2"],\n' +
    '        "items": ["item1", "item2"],\n' +
    '        "script": ["azer", "tyuiop"]\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "Bethanie",\n' +
    '        "parent": "Campus",\n' +
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
    '            "text": "Bonjour le nouveau, comment ça va ? Alors, il est pas génial le début de ce jeu ? Prêt pour une aventure de folie ? Très bien, je ne peux pas entendre ta réponse mais je suis sûr que tu t’éclates déjà. Pour commencer ce voyage palpitant, choisis ton premier poke… Ah mince, je me suis trompé de jeu. J’ai régressé dans le métier de PNJ pour arriver dans un jeu pareil après mon précédent job… Reprenons. \\nUtilise la commande help pour voir toutes les commandes à ta disposition.\\nUtilise la commande cd pour te déplacer aux lieux alentours (de couleur bleue lorsque tu fais ls). Surtout, n’oublie pas de lancer la quête (de couleur rouge lorsque tu fais ls) en faisant ./la_traversée_éternelle.sh."\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "A22",\n' +
    '        "parent": "Bethanie",\n' +
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
    '        "parent": "A22",\n' +
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
    '        "parent": "A22",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [],\n' +
    '        "pnj": [],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "guichet_unique",\n' +
    '        "parent": "A22",\n' +
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
    '        "parent": "A22",\n' +
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
    '        "parent": "Bethanie",\n' +
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
    '        "parent": "CREMI",\n' +
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
    '        "parent": "Bethanie",\n' +
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
    '      },\n' +
    '      {\n' +
    '        "placeName": "A21",\n' +
    '        "parent": "Bethanie",\n' +
    '        "next_Place": [\n' +
    '          "1er_Etage",\n' +
    '          "2eme_Etage",\n' +
    '          "3eme_Etage"\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          "la_recherche_interminable.sh"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "S.Holmes",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [\n' +
    '          {\n' +
    '            "name": "groupes_de_langue",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "1er_Etage",\n' +
    '        "parent": "A21",\n' +
    '        "next_Place": [\n' +
    '          "150"\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "Mr.Bean",\n' +
    '            "text": "..."\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "150",\n' +
    '        "parent": "1er_Etage",\n' +
    '        "next_Place": [\n' +
    '          "150"\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          "I_love_English.sh"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "Dora",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [\n' +
    '          {\n' +
    '            "name": ".hidden",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "script": []\n' +
    '      }\n' +
    '    ],\n' +
    '    "Quests": [\n' +
    '      {\n' +
    '        "number": 1,\n' +
    '        "name": "la_traversée_eternelle.sh",\n' +
    '        "requirement": [],\n' +
    '        "commands_Rewards": [],\n' +
    '        "status": "TODO",\n' +
    '        "text_Start": "Rends-toi à l’Amphithéâtre Henri Poincaré dans le bâtiment A22, tu es en retard jeune dress… *hum hum* élève. Dépêche-toi." ,\n' +
    '        "text_End": null,\n' +
    '        "commandRequired": [\n' +
    '          "cd A22",\n' +
    '          "cd Amphi_Henri_Poincaré"\n' +
    '        ]\n' +
    '      }\n' +
    '    ],\n' +
    '    "User": {\n' +
    '      "pseudo": null,\n' +
    '      "inventory": [],\n' +
    '      "commands": [\n' +
    '        "ls",\n' +
    '        "cat",\n' +
    '        "cd",\n' +
    '        "help",\n' +
    '        "exit",\n' +
    '        "man"\n' +
    '      ],\n' +
    '      "questsEnded": []\n' +
    '    }\n' +
    '  }\n' +
    '}';

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

    // ---------------------------------------- Récupération des différents éléments de Place ---------------------- //
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

    getAccessiblePlace(name, parent){
        return this.getPlace(name, parent).next_Place;
    }

    getPlacePNJ(placeName, parent){
        return this.getPlace(placeName, parent).pnj;
    }

    getPlaceItems(placeName, parent){
        return this.getPlace(placeName, parent).items;
    }

    getPlaceScript(placeName, parent){
        return this.getPlace(placeName, parent).script;
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
        let quest = quests.find( (quest) => {
            return quest.name === questName;
        });
        return quest;
    }

    getQuestRequirements(questName){
        return this.getQuest(questName).requirement;
    }

    getQuestCommandsRewards(questName){
        return this.getQuest(questName).commands_Rewards;
    }

    /*getQuestPNJ(questName){
        return this.getQuest(questName).pnj;
    }*/

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

    test(){
        console.log("Test methodes pour Places : ");
        console.log(this.getAllPlaces());
        console.log(this.getAccessiblePlace("Campus", null));
        console.log(this.getPlacePNJ("Campus", null));
        console.log(this.getPlaceItems("Campus", null));
        console.log(this.getPlaceScript("Campus", null));

        console.log("Test methodes pour Quests : ");
        console.log(this.getAllQuests());
        console.log(this.getQuest("la_traversée_eternelle.sh"));
        console.log(this.getQuestRequirements("la_traversée_eternelle.sh"));
        console.log(this.getQuestCommandsRewards("la_traversée_eternelle.sh"));
        //console.log(this.getQuestPNJ("la_traversée_eternelle.sh"));
        console.log(this.getQuestStatus("la_traversée_eternelle.sh"));
        console.log(this.getQuestTextStart("la_traversée_eternelle.sh"));
        console.log(this.getQuestTextEnd("la_traversée_eternelle.sh"));
        console.log(this.getQuestCommandRequired("la_traversée_eternelle.sh"));

    }
}

