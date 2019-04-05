
class IOjson{

    /**
     * It is used to read and write in json files.
     */


    /**
     * @param {string} file the file to read or write.
     */
    constructor(file) {
        this._file = file;

    }

    loadJSON(callback) {


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


    /**
     * return all places of the _file.json
     */
    getAllPlaces(){
        let json;

        return new Promise( (resolve, reject) => {
            this.loadJSON((response) => {
                json = JSON.parse(response);
                console.log(json.World.Places);
                resolve (json.World.Places);
            })
        }).catch( (err) => {
            console.log(err);
            reject(err);
        })
    }


    getPlace(placeName){
        this.getAllPlaces().then( (places) => {
            console.log(places[placeName]);
            return places[placeName];
        })
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

