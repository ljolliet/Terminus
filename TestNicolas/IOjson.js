const json = '{\n' +
    '  "World": {\n' +
    '    "Places": [\n' +
    '      {\n' +
    '        "placeName": "Place_1",\n' +
    '        "parent" : "null",\n' +
    '        "next_Place": [\n' +
    '          "Place_2",\n' +
    '          "Place_3"\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          "Quest_1"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "Dumbledor",\n' +
    '            "text": "Je suis Dumbledor le plus grand magicien de Poudlard !!!! "\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [\n' +
    '          {\n' +
    '            "name": "Lampe",\n' +
    '            "text": "Utilise la lampe pour te reperer"\n' +
    '          }\n' +
    '        ],\n' +
    '        "script" : [\n' +
    '          {\n' +
    '            "name" : "Script_1",\n' +
    '            "content" : [\n' +
    '              "abc",\n' +
    '              "rgb"\n' +
    '            ],\n' +
    '            "args" : [\n' +
    '              "arg_1",\n' +
    '              "arg_2"\n' +
    '            ]\n' +
    '          }\n' +
    '        ]\n' +
    '      },\n' +
    '      {\n' +
    '        "placeName": "Place_2",\n' +
    '        "parent" : "Place_1",\n' +
    '        "next_Place": [\n' +
    '          "Place_3",\n' +
    '          "Place_5"\n' +
    '        ],\n' +
    '        "quests": [\n' +
    '          "Quest_1"\n' +
    '        ],\n' +
    '        "pnj": [\n' +
    '          {\n' +
    '            "name": "Voldemor",\n' +
    '            "text": "Je suis Voldemor le plus grand mechant de Poudlard !!!! "\n' +
    '          }\n' +
    '        ],\n' +
    '        "items": [\n' +
    '          {\n' +
    '            "name": "Lampe",\n' +
    '            "text": "Utilise la lampe pour te reperer"\n' +
    '          }\n' +
    '        ],\n' +
    '        "script" : [\n' +
    '          {\n' +
    '            "name" : "Script_1",\n' +
    '            "content" : [\n' +
    '              "aasbc",\n' +
    '              "rgfzdb"\n' +
    '            ],\n' +
    '            "args" : [\n' +
    '              "arg_3",\n' +
    '              "arg_4"\n' +
    '            ]\n' +
    '          }\n' +
    '        ]\n' +
    '      }\n' +
    '    ],\n' +
    '    "Quests": [\n' +
    '      {\n' +
    '        "number" : 1,\n' +
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
    '}\n';

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
    /**
     * return all places of the _file.json
     */
    getAllPlaces(){
        return this._json.World.Places;
    }


    getPlace(placeName){

        return this.getAllPlaces()[placeName];
    }

    /**
     * return all quests of the _file.json
     */
    getAllQuests(){

    }


    /*  Getters and Setters   */

    getFile(){
        return this._file;
    }

    setFile(file){
        this._file = file;
    }
}

