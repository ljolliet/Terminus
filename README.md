# Terminus

Game that teach to IT students how to use a shell, and in the same time gives information about the [University of Bordeaux](https://www.u-bordeaux.fr/Universite/Campus/Campus-Talence-Pessac-Gradignan).
## Getting Started

On the master branch, are available the different released version of the project. Open terminus.html to launch the project.
If you want to see the project in development (that can contain issues), checkout dev branch.

### Prerequisites

This project uses [ECMAScript 6](http://es6-features.org/) and is compatible with recent versions of the following navigators :


* Chrome
* Edge
* Firefox
* Opera 
* Safari

## Features

### V1.2

* Script management (!= quests)
* Commands yes, chmod, grep, man, touch
* Pipe management (|) so each command now return a string 
* Write and append management (\>\> and \>) 
* Rights/permission management (rwx)
* Json file reading
* Json template finished
* Hand json writing of the world
* Hand json writing of the man
* Using #_ tokens in json to add particular word (like login)
* CTRL-C 
* Fixing a few bugs about completion, mv command, script arguments
* Secured admin mode
* Yes/no when exiting 
* Adding a new quest
* Adding several pnj to explain more the functions available.


### V1.1

* commands mv, tree, jobs, clear
* Up/down arrows
* Tab on a command and Objects (Places/Item/Quests ...) 
* Hidden place/entity
* Options in commands
* Path after login@terminus
* Quest dependency 
* Admin mode
* Simplify command management
* Fr version

### V1.0

* First version of the js graphics
* The 5 basic commands : cat, cd, ls, exit help
* Basic places sample
* Quest Launching 
* '!' before the name of the place
* Trophies management
* Inventory of the user
* Root directory/place --\> '/' and home --\> '~'
* Alphabetic order when the user list (ls) the content of a Place

## Known issues

* The way the quest is checking that the command is the one expected is not the best a all.
We managed it the simplest possible way : comparing the String command to the one expected.
It is the major thing we could improve in the future. 

## Running the tests

Open the page tests.html that uses [QUnit](https://code.jquery.com/qunit) library.


## Deployment

Last realeased available at [https://ljolliet.github.io/Terminus/](https://ljolliet.github.io/Terminus/), which is a deployment of the master branch.

## Versioning

We use [Github](http://github.com/) for versioning. For the versions available, see the [tags on this repository](https://github.com/ljolliet/Terminus/tags). 

## Authors

* **Nicolas Desclaux** [@Ndesclaux](https://github.com/Ndesclaux)
* **Lilian Gallon** [@N3ROO](https://github.com/N3ROO)
* **Louis Jolliet** [@ljolliet](https://github.com/ljolliet)
* **Louis Sicardon** [@louissicardon](https://github.com/louissicardon)
* **Paul Vigneau** [@paulvigneau](https://github.com/paulvigneau)


See also the list of [contributors](https://github.com/ljolliet/Terminus/contributors) who participated in this project.


Also available : the [Scrum board](https://github.com/ljolliet/Terminus/projects/1) guiding this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

This ReadMe has been written from this [template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).


