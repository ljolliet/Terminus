const json = '{\n' +
    '  "World": {\n' +
    '    "Places": [\n' +
    '      {\n' +
    '        "id" : 0,\n' +
    '        "placeName": "Campus",\n' +
    '        "next_Place": [\n' +
    '          17,\n' +
    '          1,\n' +
    '          18\n' +
    '        ],\n' +
    '        "quests": [],\n' +
    '        "pnj": [],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 1,\n' +
    '        "placeName": "Bethanie",\n' +
    '        "next_Place": [\n' +
    '          10,\n' +
    '          2,\n' +
    '          7,\n' +
    '          9\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          1\n' +
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
    '        "id" : 2,\n' +
    '        "placeName": "A22",\n' +
    '        "next_Place": [\n' +
    '          3,\n' +
    '          4,\n' +
    '          5,\n' +
    '          6\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          5\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "Pr.Ofaite",\n' +
    '            "text": "Les gens capables de tirer profit de l’arbre gagneront le pouvoir de voir le monde dans son ensemble."\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 3,\n' +
    '        "placeName": "Amphi_Henri_Poincare",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [\n' +
    '          2\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "A.Dumbledore",\n' +
    '            "text": "Bienvenue. Bienvenue à tous pour cette nouvelle année à la faculté informatique de Bordeaux. Au cours de cette année, vous devrez résoudre un maximum de Quêtes. Vous pouvez naviguer dans toute l’Université grâce à la commande cd. Le répertoire parent est accessible par \\"..\\". Utilisez la pour revenir en A22 par exemple ! Par contre ne va jamais au 3ème étage du CREMI, c’est formellement interdit, tu pourrais mourir dans d’atroces souffrances !  Si une quête est trop dure, vous pouvez la laisser de côté en la quittant grâce à la commande exit. Vous pourrez la reprendre plus tard."\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 4,\n' +
    '        "placeName": "Amphi_Thomas_Edison",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [],\n' +
    '        "pnj": [],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 5,\n' +
    '        "placeName": "guichet_unique",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [\n' +
    '          3\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "A.Dibou",\n' +
    '            "text": "Bonjoooooouur. Bienvenue dans le monde merveilleux d’A. Dibou, plus communément appelé “Guichet unique”. Je vais t’apprendre à utiliser ton inventaire pour que tu aies facilement accès aux objets que tu souhaites conserver. Ton inventaire se situe dans le Batiment A22, pour te simplifier la tâche tu peux y accéder en utilisant \\\\$INVENTAIRE. On appelle cela une variable d’environnement, elle te permettra d’accéder à ton inventaire où que tu sois. Pour déplacer un objet dans ton inventaire, il te suffit d’utiliser la commande mv <objet>  $INVENTAIRE pour déplacer l’objet dans ton inventaire. Souviens toi, les objets sont représentés par la couleur blanche."\n' +
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
    '            "name": "certificat_de_scolarite",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 6,\n' +
    '        "placeName": "Inventaire",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [\n' +
    '          4\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "A.Dibou",\n' +
    '            "text": "Maintenant que tu sais utiliser ton inventaire, je te conseille d’aller voir ton armoire à trophée. Tu pourras y trouver tous les trophées que tu gagneras au fil de ton année universitaire ! Pour voir les quêtes en cours tu peux utiliser la commande jobs."\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [\n' +
    '          {\n' +
    '            "name": "liens_utiles",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 7,\n' +
    '        "placeName": "CREMI",\n' +
    '        "next_Place": [\n' +
    '          14,\n' +
    '          15,\n' +
    '          8\n' +
    '        ],\n' +
    '        "quests": [\n' +
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
    '        "id" : 8,\n' +
    '        "placeName": "3eme_Etage",\n' +
    '        "next_Place": [\n' +
    '          13\n' +
    '        ],\n' +
    '        "quests": [],\n' +
    '        "pnj": [],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 9,\n' +
    '        "placeName": "pont",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [\n' +
    '          8\n' +
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
    '            "name": "traversee_pont.sh",\n' +
    '            "content": [\n' +
    '            ],\n' +
    '            "args": [\n' +
    '            ]\n' +
    '          }\n' +
    '        ]\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 10,\n' +
    '        "placeName": "A21",\n' +
    '        "next_Place": [\n' +
    '          11,\n' +
    '          16\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          6\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "S.Holmes",\n' +
    '            "text": "Hello, welcome to the Centre des Langues, let’s resolve a little colundrum. Look at the paper behind me. There are tons of names but only one corresponds to yours. Try to find it using the grep command. You can use it this way : cat name_list | grep <pattern> . With that pipe ( | ), grep is using the result of the command before the pipe. You can use the manual of grep to get more information (man grep)."\n' +
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
    '        "id" : 11,\n' +
    '        "placeName": "1er_Etage",\n' +
    '        "next_Place": [\n' +
    '          12\n' +
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
    '        "id" : 12,\n' +
    '        "placeName": "150",\n' +
    '        "next_Place": [  ],\n' +
    '        "quests": [\n' +
    '          7\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "Dora",\n' +
    '            "text": " Tu viens explorer avec moi ?! Apprenons l’anglais tout en s’amusant !\\nIl y a un objet caché dans cette salle, mais je n’arrive pas à le trouver. Peux-tu lui faire dire ce qu\'il cache ? Utilise le manuel de la commande ls pour t’aider !"\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [\n' +
    '          {\n' +
    '            "name": ".hidden",\n' +
    '            "text": ""\n' +
    '          }\n' +
    '        ],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 13,\n' +
    '        "placeName": "passage_interdit",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [\n' +
    '          9\n' +
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
    '        "id" : 14,\n' +
    '        "placeName": "1er_Etage",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [],\n' +
    '        "pnj": [],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 15,\n' +
    '        "placeName": "2eme_Etage",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [],\n' +
    '        "pnj": [],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 16,\n' +
    '        "placeName": "2eme_Etage",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [],\n' +
    '        "pnj": [],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      },\n' +
    '      {\n' +
    '        "id" : 17,\n' +
    '        "placeName": "Arts_et_Metiers",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [],\n' +
    '        "pnj": [],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      }      ,\n' +
    '      {\n' +
    '        "id" : 18,\n' +
    '        "placeName": "Doyen_Brus",\n' +
    '        "next_Place": [],\n' +
    '        "quests": [],\n' +
    '        "pnj": [],\n' +
    '        "items": [],\n' +
    '        "script": []\n' +
    '      }\n' +
    '\n' +
    '\n' +
    '    ],\n' +
    '    "Quests": [\n' +
    '      {\n' +
    '        "id": 1,\n' +
    '        "name": "la_traversee_eternelle.sh",\n' +
    '        "requirement": [],\n' +
    '        "commands_Rewards": [],\n' +
    '        "status": "TODO",\n' +
    '        "text_Start": "Rends-toi à l’Amphithéâtre Henri Poincaré dans le bâtiment A22, tu es en retard jeune dress… *hum hum* élève. Dépêche-toi.",\n' +
    '        "text_End": null,\n' +
    '        "commandRequired": [\n' +
    '          "cd A22",\n' +
    '          "cd Amphi_Henri_Poincare"\n' +
    '        ]\n' +
    '      },\n' +
    '      {\n' +
    '        "id": 2,\n' +
    '        "name": "les_documents_confidentiels.sh",\n' +
    '        "requirement": [1],\n' +
    '        "commands_Rewards": ["mv"],\n' +
    '        "status": "TODO",\n' +
    '        "text_Start": "Pour valider cette quête, tu dois te rendre au guichet unique en A22 et trouver ce qui t’appartient, une autre quête t’y attendra…",\n' +
    '        "text_End": null,\n' +
    '        "commandRequired": [\n' +
    '          "cd ..",\n' +
    '          "cd guichet_unique"\n' +
    '        ]\n' +
    '      },\n' +
    '      {\n' +
    '        "id": 3,\n' +
    '        "name": "le_rangement_IKEA.sh",\n' +
    '        "requirement": [2],\n' +
    '        "commands_Rewards": [">", ">>", "yes"],\n' +
    '        "status": "TODO",\n' +
    '        "text_Start": "Déplace ces deux objets dans ton inventaire ! Puis va vérifier dans ton inventaire si tu as bien effectué le déplacement.",\n' +
    '        "text_End": null,\n' +
    '        "commandRequired": [\n' +
    '          "mv carte_etudiante $INVENTAIRE",\n' +
    '          "mv certificat_de_scolarite $INVENTAIRE"\n' +
    '        ]\n' +
    '      },\n' +
    '      {\n' +
    '        "id": 4,\n' +
    '        "name": "armoire_a_trophees.sh",\n' +
    '        "requirement": [3],\n' +
    '        "commands_Rewards": ["tree", "grep", "jobs"],\n' +
    '        "status": "TODO",\n' +
    '        "text_Start": "Observe les quêtes que tu as terminées et le temps que tu as mis pour les résoudre dans l’armoire des trophées.",\n' +
    '        "text_End": null,\n' +
    '        "commandRequired": [\n' +
    '          "cat armoire_a_trophees"\n' +
    '        ]\n' +
    '      },\n' +
    '      {\n' +
    '        "id": 5,\n' +
    '        "name": "le_vaste_monde.sh",\n' +
    '        "requirement": [4],\n' +
    '        "commands_Rewards": ["chmod"],\n' +
    '        "status": "TODO",\n' +
    '        "text_Start": "Réussiras-tu à résoudre l’énigme du Pr.Ofaite et à devenir omniscient ?",\n' +
    '        "text_End": null,\n' +
    '        "commandRequired": [\n' +
    '          "tree"\n' +
    '        ]\n' +
    '      },\n' +
    '      {\n' +
    '        "id": 6,\n' +
    '        "name": "la_recherche_interminable.sh",\n' +
    '        "requirement": [5],\n' +
    '        "commands_Rewards": [],\n' +
    '        "status": "TODO",\n' +
    '        "text_Start": "Retrouve ton groupe d’anglais grâce à ton nom.",\n' +
    '        "text_End": null,\n' +
    '        "commandRequired": [\n' +
    '          "cat groupes_de_langue | grep #login"\n' +
    '        ]\n' +
    '      },\n' +
    '      {\n' +
    '        "id": 7,\n' +
    '        "name": "I_Love_English.sh",\n' +
    '        "requirement": [6],\n' +
    '        "commands_Rewards": [],\n' +
    '        "status": "TODO",\n' +
    '        "text_Start": "Trouve l’objet caché dans cette salle.",\n' +
    '        "text_End": "Oui c’est bien celui là ! We did it ! Hourra ! Hidden signifie caché !",\n' +
    '        "commandRequired": [\n' +
    '          "ls -a",\n' +
    '          "cat .chiper"\n' +
    '        ]\n' +
    '      },\n' +
    '      {\n' +
    '        "id": 8,\n' +
    '        "name": "les_constructeurs_de_l_extreme.sh",\n' +
    '        "requirement": [5],\n' +
    '        "commands_Rewards": [],\n' +
    '        "status": "TODO",\n' +
    '        "text_Start": "Répare le pont et traverse le à l’aide du mot de passe.",\n' +
    '        "text_End": null,\n' +
    '        "commandRequired": [\n' +
    '          "chmod +x traverser_pont.sh",\n' +
    '          "./traverser_pont.sh mellon"\n' +
    '        ]\n' +
    '      },\n' +
    '      {\n' +
    '        "id": 9,\n' +
    '        "name": "power.sh",\n' +
    '        "requirement": [3],\n' +
    '        "commands_Rewards": [],\n' +
    '        "status": "TODO",\n' +
    '        "text_Start": "Lance le sort de ton choix.\\nPS : le but de cette quête est de piéger le joueur dans un endroit où on lui a dit de ne pas se rendre. La commande yes est une boucle infinie, pour en sortir il faut utiliser CTRL+C.",\n' +
    '        "text_End": null,\n' +
    '        "commandRequired": [\n' +
    '          "yes"\n' +
    '        ]\n' +
    '      }\n' +
    '    ],\n' +
    '    "User": {\n' +
    '      "login": "test",\n' +
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

