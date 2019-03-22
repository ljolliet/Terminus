/**
 *  To check the parent implementation.
 *  When a place is added to another, it parent is updated.
 */
QUnit.test("Place parent", function (assert) {

    let a = new Place("a");
    let b = new Place("b");
    let c = new Place("c");
    let d = new Place("d");
    a.addPlace(b);
    b.addPlace(c);
    b.addPlace(d);
    assert.equal(a.parent, null, "1st place has no parent");
    assert.equal(b.parent, a, "2nd place has 1st as parent");
    assert.equal(c.parent, b, "3rd place has 2nd as parent");
    assert.equal(d.parent, b, "4th place has 2nd as parent");
});

/**
 *  To check the root implementation.
 *  Static attribute root change to access to it from any place (like "/" in shell)
 */
QUnit.test("Place root", function (assert) {

    let a = new Place("a");
    assert.equal(Place.root, null, "Root is null because is not initialized");
    Place.root = a;
    assert.equal(Place.root, a, "Root initialized");
    let b = new Place("b");
    assert.equal(Place.root, a, "Root stay the same for another place");
    let c = new Place("c");
    Place.root = b;
    b.addPlace(c);
    assert.equal(Place.root, b, "Adding a place to another doesn't affect this function");

});

/**
 *  To check the home implementation.
 *  Static attribute root change to access to it from any place (like "~" in shell)
 */
QUnit.test("Place home", function (assert) {
    let message = "Correct home";
    let a = new Place("a");
    assert.equal(Place.home, null, "Home is null because is not initialized");
    Place.home = a;
    assert.equal(Place.home, a, "Home initialized");
    let b = new Place("b");
    assert.equal(Place.home, a, "   Home stay the same for another place");
    let c = new Place("c");
    Place.home = c;
    b.addPlace(c);
    assert.equal(Place.home, c, "Adding a place to another doesn't affect this function");

});

/**
 *  To check currentLocation implementation and the function moveTo.
 */
QUnit.test("User place change", function (assert) {

    let user = new User("user", [], null, []);
    let parent = new Place("parent");
    let son = new Place("son");
    parent.addPlace(son);
    user.currentLocation = parent;
    assert.equal(user.currentLocation, parent, "Current location is set");
    assert.equal(user.moveTo("son"), true, "Going to a sub-place that exists is accepted");
    assert.equal(user.currentLocation, son, "Current location is updated as sub-place");
    assert.equal(user.moveTo("else"), false, "Going to a sub-place that doesn't exist is refused");
    assert.equal(user.currentLocation, son, "Current location stay the same");
    assert.equal(user.moveTo("."), true, "Going to the current location ('.') is accepted");
    assert.equal(user.currentLocation, son, "Current location stay the same");
    assert.equal(user.moveTo(".."), true, "Going to parent ('..') is accepted");
    assert.equal(user.currentLocation, parent, "Current location is updated as parent");
    assert.equal(user.moveTo(".."), false, "Going to parent ('..') is refused if the current is root (no parent)");
    assert.equal(user.currentLocation, parent, "Current location stay the same");


});

/**
 *  To check the function read of User class.
 */
QUnit.test("Reading entity", function (assert) {
    let user = new User("user", [], null, []);
    let place = new Place("place");
    let pnj = new PNJ("pnj", "welcome");
    let item = new Item("item", "content");
    place.addEntity(pnj);
    place.addEntity(item);tree
    user.currentLocation = place;
    assert.equal(user.read("pnj"), "welcome", "PNJ text read");
    assert.equal(user.read("item"), "content", "Item text read");
    assert.equal(user.read("else"), null, "No entity found");
});

/**
 * To check the functions launch nd check quest of the User class.
 */
QUnit.test("Launching and checking quest", function (assert) {
    let user = new User("user", [], null, []);
    let place = new Place("place");
    user.currentLocation = place;

    let quest = new Quest("quest");
    quest.initialText = "welcome";
    quest.endText = "well done";
    quest.addCommandRequired("ls");
    quest.addCommandRequired("help");
    quest.addCommandRewards(COMMAND_TYPE.MV);

    let quest2 = new Quest("quest2");
    quest2.addCommandRequired("ls");

    place.addQuest(quest);
    place.addQuest(quest2);

    assert.equal(quest.status, STATUS.TODO, "Quest status initialized, to start");
    assert.equal(user.currentQuest, null, "No quest running");
    assert.equal(user.launch("else"), INFO.UNKNOWN, "Wrong quest name, quest not launched");
    assert.equal(user.launch("quest.sh"), INFO.FOUND, "Quest launched"); // add .sh to the name
    assert.equal(quest.status, STATUS.STARTED, "Status updated");
    assert.equal(user.currentQuest, quest, "Quest is running");
    assert.equal(user.launch("quest2.sh"), INFO.UNAVAILABLE, "Can't launch a second quest at the same time");
    assert.equal(user.currentQuest.commandRequired.length, 2, "Two command required");
    assert.equal(user.currentQuest.commandRequired[0], "ls", "Right command entered");
    assert.equal(user.checkQuest("ls"), null, "Write command entered but one left");
    assert.equal(user.checkQuest("cat tata"), null, "Wrong command entered, also one left");
    assert.equal(user.currentQuest.commandRequired.length, 1, "One command required");
    assert.equal(user.checkQuest("help"), quest, "End text displayed");
    assert.equal(quest.status, STATUS.DONE, "Quest finished");
    assert.equal(user.currentQuest, null, "No quest running");
    assert.equal(user.commandsAuthorized.includes(COMMAND_TYPE.MV), true, "New command reward");
    assert.equal(user.launch("quest.sh"), INFO.FINISHED, "Can't do the same quest again");
    assert.equal(user.launch("quest2.sh"), INFO.FOUND, "Now another quest can be launched");
});


/**
 * Tests about inventory and trophies management.
 */
QUnit.test("Inventory & trophies", function (assert) {
    let inventory = new Place("inventory");
    let user = new User("user", [new Item("card", "data"), new Item("bag", "content")], inventory, ["try.sh", "try2.sh"]);
    assert.equal(inventory.entities[0], user.items[0], "User 1st item is the same as inventory one");
    assert.equal(inventory.entities[1], user.items[1], "User 2nd item is the same as inventory one");
    assert.equal(inventory.entities.length, 3, "trophy armory is in the items"); // 3 with armoire_a_trophee
});

QUnit.test("Startwith", function (assert) {
    let user = new User("user", [], null, []);
    let parent = new Place("parent");
    let place = new Place("place");
    let place2 = new Place("place2");
    let quest = new Quest("quest");
    let quest2 = new Quest("quest2");
    let pnj = new PNJ("Quentin");
    let item = new Item("paul");
    parent.addPlace(place);
    parent.addPlace(place2);
    parent.addQuest(quest);
    parent.addEntity(pnj);
    parent.addEntity(item);
    place.addQuest(quest2);
    user.currentLocation = parent;
    assert.equal(user.currentLocation.getStartWith("").includes(parent), false, "Does not contain itself");
    assert.equal(user.currentLocation.getStartWith("pla").includes(place), true, "Works with a Place");
    assert.equal(user.currentLocation.getStartWith("pla").includes(place2), true, "Works with another Place and the same pattern");
    assert.equal(user.currentLocation.getStartWith("q").includes(quest), true, "Works with a Quest");
    assert.equal(user.currentLocation.getStartWith("q").includes(quest2), false, "Does not work with something in a subplace");
    assert.equal(user.currentLocation.getStartWith("Q").includes(pnj), true, "Works with a PNJ");
    assert.equal(user.currentLocation.getStartWith("q").includes(pnj), true, "Ignore case");
    assert.equal(user.currentLocation.getStartWith("p").includes(item), true, "Works with an Item");
    assert.equal(user.currentLocation.getStartWith("p").includes(place), true, "Works with a short pattern");
    assert.equal(user.currentLocation.getStartWith("place2").includes(place2), true, "Works with a long pattern");
});


/**
 * Tests about the item movement
 */
QUnit.test("Move an item", function (assert) {
    let inventory = new Place("inventory");
    let user = new User("user", [], inventory, []);
    let parent = new Place("parent");
    Place.root = parent;
    let place = new Place("place");
    Place.home = place;
    let subplace = new Place("subplace");
    parent.addPlace(place);
    place.addPlace(subplace);
    user.currentLocation = place;
    let item = new Item("item", "content");
    let item2 = new Item("item2", "content");
    let item3 = new Item("item3", "content");
    let item4 = new Item("item4", "content");
    let pnj = new PNJ("pnj", "content");
    place.addEntity(item);
    place.addEntity(item2);
    place.addEntity(item3);
    place.addEntity(item4);
    place.addEntity(pnj);
    assert.equal(user.moveItem("item", "subplace"), true, "Move an item is authorized");
    assert.equal(subplace.entities.includes(item), true, "Move has been done");
    assert.equal(place.entities.includes(item), false, "Item no longer in the origin place");
    assert.equal(user.moveItem("pnj", "subplace"), false, "Move a pnj is not authorized");
    assert.equal(subplace.entities.includes(pnj), false, "Move has not been done");
    assert.equal(place.entities.includes(pnj), true, "PNJ stayed in the origin place");
    assert.equal(user.moveItem("item2", "something"), true, "Move an item to something that does not exist works");
    assert.equal(item2.name, "something", "Move has been done, item's name has changed");
    assert.equal(user.moveItem("something", "."), true, "Move an item to the same place works");
    assert.equal(place.entities.includes(item2), true, "Move has been done");
    assert.equal(item2.name, "something", "The name hasn't change.");
    assert.equal(user.moveItem("something", ".."), true, "Move an item to his parent works");
    assert.equal(parent.entities.includes(item2), true, "Move has been done");
    assert.equal(user.moveItem("item3", "~"), true, "Move an item to home works");
    assert.equal(place.entities.includes(item3), true, "Move has been done");
    assert.equal(user.moveItem("item4", "/"), true, "Move an item to root works");
    assert.equal(parent.entities.includes(item4), true, "Move has been done");
    assert.equal(subplace.entities.includes(pnj), false, "Move has not been done");
    assert.equal(user.moveItem("pnj", "something"), false, "Move a pnj to something that does not exist does not works");
    assert.equal(pnj.name, "pnj", "Move not done, name unchanged");
});

/**
 * Dependency management tests
 */
QUnit.test("questDependency", function (assert) {
    let quest = new Quest("quest");
    quest.addCommandRequired("ls");
    let quest2 = new Quest("quest2");
    quest2.addCommandRequired("cat");
    let quest3 = new Quest("quest3");
    quest3.addCommandRequired("cd toto");
    quest2.addQuestsRequired(quest);
    quest3.addQuestsRequired(quest2);
    let place = new Place("place");
    let user = new User("toto",[],null,[]);
    user.currentLocation = place;
    place.addQuest(quest);
    place.addQuest(quest2);
    place.addQuest(quest3);
    assert.equal(user.launch("quest2.sh"), INFO.LOCKED, "Second quest not available");
    assert.equal(user.launch("quest3.sh"), INFO.LOCKED, "Third quest not available");
    assert.equal(user.launch("quest.sh"), INFO.FOUND, "First quest available");
    assert.equal(user.checkQuest("ls"), quest, "First quest finished");
    assert.equal(user.launch("quest3.sh"), INFO.LOCKED, "Third quest not available");
    assert.equal(user.launch("quest2.sh"), INFO.FOUND, "Now the second quest is available");
    assert.equal(user.checkQuest("cat"), quest2, "Second quest finished");
    assert.equal(user.launch("quest3.sh"), INFO.FOUND, "Now the third quest is available");
    assert.equal(user.checkQuest("cd toto"), quest3, "third quest finished");

});

/**
 * command.js tests
 */
QUnit.test("command.js", function (assert) {

    // We use deepEqual to compare Array objects

    // Constructor tests
    assert.deepEqual((new Command(null)).originalCommand, [
        [""]
    ], "If the given args variable is null, then it changes to an empty string array");
    assert.deepEqual((new Command([
        [""]
    ])).originalCommand, [
        [""]
    ], "Test originalCommand() with empty args");

    // args() tests
    assert.deepEqual((new Command([
        ["ls"]
    ])).args, ["ls"], "Test args() with 1 arg and isPipe = false");
    assert.deepEqual((new Command([
        ["cat", "file"]
    ])).args, ["cat", "file"], "Test args() with 2 args and isPipe = false");
    assert.deepEqual((new Command([
        ["mv", "src", "dst"]
    ])).args, ["mv", "src", "dst"], "Test args() with 3 args and isPipe = false");
    assert.deepEqual((new Command([
        ["ls"], "grep"
    ])).args, ["ls"], "Test args() with 1 arg and isPipe = true");

    // getCommand(index) tests
    let cmd = new Command([
        ["cmd1", "arg1"],
        ["cmd2"],
        ["cmd3", "arg1", "arg2"]
    ]);
    assert.deepEqual(cmd.getCommand(0), new Command([
        ["cmd1", "arg1"]
    ]), "Test getCommand(index) with index = 0");
    assert.deepEqual(cmd.getCommand(1), new Command([
        ["cmd2"]
    ]), "Test getCommand(index) with index = 1");
    assert.deepEqual(cmd.getCommand(2), new Command([
        ["cmd3", "arg1", "arg2"]
    ]), "Test getCommand(index) with index = 2");
    assert.throws(cmd.getCommand(3), "Test getCommand(index) with index = 3 (out of bounds)");

    // isPipe tests
    assert.equal((new Command(null)).isPipe, false, "test isPipe with null args");
    assert.equal((new Command([
        ["ls"]
    ])).isPipe, false, "test isPipe with simple arg");
    assert.equal((new Command([
        ["ls"],
        ["ls"]
    ])).isPipe, true, "test isPipe with simple arg");
    assert.equal((new Command([
        ["cmd1", "arg1"],
        ["cmd2"],
        ["cmd3", "arg1", "arg2"]
    ])).isPipe, true, "test isPipe with complex args");

    // formatOptions tests
    assert.deepEqual(Command.formatOptions("-abc"), ["a", "b", "c"], "Basic test #1");
    assert.deepEqual(Command.formatOptions(""), [], "Basic test #2");
    assert.deepEqual(Command.formatOptions("abc"), ["a", "b", "c"], "Basic test #3");
    assert.deepEqual(Command.formatOptions("-abc -def"), ["a", "b", "c", "d", "e", "f"], "Basic test #4");

    // toString tests
    assert.equal((new Command([
        ["ls"]
    ])).toString(), "ls", "test toString without args");
    assert.equal((new Command([
        ["ls", "-a"]
    ])).toString(), "ls -a", "test toString with simple arg");
    assert.equal((new Command([
        ["cmd1", "arg1"],
        ["cmd2"],
        ["cmd3", "arg1", "arg2"]
    ])).toString(), "cmd1 arg1 | cmd2 | cmd3 arg1 arg2", "test toString with pipe");

    // getClosestCommand tests : it will be broken each time we add commands
    assert.deepEqual(Command.getClosestCommands("c"), ["cd", "cat", "clear"], "test closes commands");
});

/**
 * parser.js tests
 */
QUnit.test("parser.js (depends on command.js)", function (assert) {
    let parser = new Parser("", false);

    // Empty command
    let cmd = parser.getParsedCommand();
    assert.equal(cmd.isPipe, false, "It wasn't a pipe command");
    assert.equal(cmd.args[0], "", "The main command should be empty");
    assert.equal(cmd.args.length, 1, "There is no extra args");

    // Simple command
    parser.setCommand("a");
    cmd = parser.getParsedCommand();
    assert.equal(cmd.isPipe, false, "It wasn't a pipe command");
    assert.equal(cmd.args[0], "a", "The main command should be 'a'");
    assert.equal(cmd.args.length, 1, "The args array should have a length of 1 since it does not have any extra args");

    // Command with arguments
    parser.setCommand("cmd arg1 arg2 arg3");
    cmd = parser.getParsedCommand();
    assert.equal(cmd.isPipe, false, "It wasn't a pipe command");
    assert.equal(cmd.args[0], "cmd", "The main command should be 'cmd'");
    assert.equal(cmd.args.length, 4, "The args array length should be 4 since we have 3 extra args");
    assert.equal(cmd.args[1], "arg1", "The 1st arg should be 'arg1'");
    assert.equal(cmd.args[2], "arg2", "The 2nd arg should be 'arg2'");
    assert.equal(cmd.args[3], "arg3", "The 3rd arg should be 'arg3'");

    // Command with arguments and pipe
    parser.setCommand("cmd1 arg1 |cmd2 arg2| cmd3 arg3");
    cmd = parser.getParsedCommand();
    assert.equal(cmd.isPipe, true, "The command is a pipe command since we use 2 pipes");
    assert.equal(cmd.getCommand(0).args[0], "cmd1", "The main command should be 'cmd1'");
    assert.equal(cmd.getCommand(0).args[1], "arg1", "The 1st arg should be 'arg1'");
    assert.equal(cmd.getCommand(1).args[0], "cmd2", "The main command should be 'cmd2'");
    assert.equal(cmd.getCommand(1).args[1], "arg2", "The 1st arg should be 'arg2'");
    assert.equal(cmd.getCommand(2).args[0], "cmd3", "The main command should be 'cmd3'");
    assert.equal(cmd.getCommand(2).args[1], "arg3", "The 1st arg should be 'arg3'");

    // Command with arguments and the 132 space (&nbsp;)
    parser.setCommand("cmd arg1 arg2 arg3");
    cmd = parser.getParsedCommand();
    assert.equal(cmd.isPipe, false, "It wasn't a pipe command");
    assert.equal(cmd.args[0], "cmd", "The main command should be 'cmd', and we use the 132 space (&nbsp;)");
    assert.equal(cmd.args.length, 4, "The args array length should be 4, since we use 3 extra args, and we use the 132 space (&nbsp;)");
    assert.equal(cmd.args[1], "arg1", "The 1st arg should be 'arg1', and we use the 132 space (&nbsp;)");
    assert.equal(cmd.args[2], "arg2", "The 2nd arg should be 'arg2', and we use the 132 space (&nbsp;)");
    assert.equal(cmd.args[3], "arg3", "The 3rd arg should be 'arg3', and we use the 132 space (&nbsp;)");

});

/**
 * checker.js tests (**depends on command.js tests**)
 */
QUnit.test("checker.js (depends on command.js)", function (assert) {
    // Test each command one by one :
    // the first tests does not have any arguments,
    // then 1 argument, then 2, and so on

    let user = new User("test", [], null, []);

    // Check that the command is not valid if the user does not have access to the command
    let checker = new Checker(new Command([
        ["mv"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The exit command does not expect any argument");
    assert.notEqual(checker.getErrorMessage(), "", "There is an error message if the user does not have access to the command");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.MV, "The type is MV");

    // First we need to add all the commands to the user ;))
    user.addCommand(COMMAND_TYPE.TREE);
    user.addCommand(COMMAND_TYPE.LAUNCH);
    user.addCommand(COMMAND_TYPE.CAT);
    user.addCommand(COMMAND_TYPE.GREP);
    user.addCommand(COMMAND_TYPE.MV);

    // Test empty command
    checker = new Checker(new Command([
        [""]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The empty command is not valid");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of empty command is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.UNKNOWN, "The empty command type is UNKNOWN");

    // Test exit command
    checker = new Checker(new Command([
        ["exit"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The exit command does not expect any argument");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of exit is empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.EXIT, "The exit type is EXIT");
    checker = new Checker(new Command([
        ["exit", "arg"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The exit command does not expect any argument");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of an incorrect use of exit is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.EXIT, "The exit type is EXIT");

    // Test help command
    checker = new Checker(new Command([
        ["help"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The help command does not expect any argument");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of help is empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.HELP, "The help type is HELP");
    checker = new Checker(new Command([
        ["help", "arg"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The help command does not expect any argument");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of an incorrect use of help is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.HELP, "The help type is HELP");

    // Test ls command
    checker = new Checker(new Command([
        ["ls"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The ls command does expect 0 or 1 argument");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of ls is empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.LS, "The ls type is LS");
    checker = new Checker(new Command([
        ["ls", "-a"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The ls command does expect 0 or 1 argument");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of ls is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.LS, "The ls type is LS");
    checker = new Checker(new Command([
        ["ls", "-l", "-a"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The ls command does expect 0 or 1 argument, and all the options count as 1 argument");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of ls is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.LS, "The ls type is LS");
    checker = new Checker(new Command([
        ["ls", "-l", "-a", "c"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The ls command does expect 0 or 1 argument, and all the options count as 1 argument, but c is not an option");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of a correct use of ls is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.LS, "The ls type is LS");


    // Test tree command
    checker = new Checker(new Command([
        ["tree"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The tree command does not expect any argument");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of tree is empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.TREE, "The tree type is TREE");
    checker = new Checker(new Command([
        ["tree", "arg"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The tree command does not expect any argument");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of an incorrect use of tree is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.TREE, "The tree type is TREE");

    // Test ./ command
    checker = new Checker(new Command([
        ["./"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The ./ command does expect a script name");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of an incorrect use of ./ is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.LAUNCH, "The ./ type is LAUNCH");
    checker = new Checker(new Command([
        ["./script"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The ./ command does not expect any argument");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of ./ is empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.LAUNCH, "The ./ type is LAUNCH");
    checker = new Checker(new Command([
        ["./script", "arg"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The ./ command does not expect any argument");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of an incorrect use of ./ is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.LAUNCH, "The ./ type is LAUNCH");

    // Test cd command
    checker = new Checker(new Command([
        ["cd", "place1", "place2"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The cd command does not expect more than two arguments");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of an incorrect use of cd is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.CD, "The cd type is CD");
    checker = new Checker(new Command([
        ["cd", "somewhere"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The cd command does expect one or 0 argument");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of cd is empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.CD, "The cd type is CD");
    checker = new Checker(new Command([
        ["cd"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The cd command does expect one or 0 argument");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of cd is empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.CD, "The cd type is CD");

    // Test cat command
    checker = new Checker(new Command([
        ["cat", "file"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The cat command does expect one argument");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of cd is empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.CAT, "The cat type is CAT");
    checker = new Checker(new Command([
        ["cat"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The cat command does expect one or 0 argument");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of an incorrect use of cd is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.CAT, "The cat type is CAT");

    // Test grep command
    checker = new Checker(new Command([
        ["grep", "file"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The grep command does expect one argument");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of grep is empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.GREP, "The grep type is GREP");
    checker = new Checker(new Command([
        ["grep"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The grep command does expect one or 0 argument");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of an incorrect use of grep is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.GREP, "The grep type is GREP");

    // Test mv command
    checker = new Checker(new Command([
        ["mv", "src", "dst"]
    ]), user);
    assert.equal(checker.isCommandValid(), true, "The mv command does expect two arguments");
    assert.equal(checker.getErrorMessage(), "", "The error message of a correct use of mv is empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.MV, "The mv type is MV");
    checker = new Checker(new Command([
        ["mv", "src"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The grep command does expect 2 arguments");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of an incorrect use of mv is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.MV, "The mv type is MV");
    checker = new Checker(new Command([
        ["mv"]
    ]), user);
    assert.equal(checker.isCommandValid(), false, "The grep command does expect 2 arguments");
    assert.notEqual(checker.getErrorMessage(), "", "The error message of an incorrect use of mv is not empty");
    assert.equal(checker.getCommandType(), COMMAND_TYPE.MV, "The mv type is MV");

});