/**
 *  To check the parent implementation.
 *  When a place is added to another, it parent is updated.
 */
QUnit.test("Place parent", function(assert) {
    let message = "Correct parent";
    let a = new Place("a");
    let b = new Place("b");
    let c = new Place("c");
    let d = new Place("d");

    a.addPlace(b);
    b.addPlace(c);
    b.addPlace(d);
    assert.equal(a.parent, null, message);
    assert.equal(b.parent, a, message);
    assert.equal(c.parent, b, message);
    assert.equal(d.parent, b, message);
});

/**
 *  To check the root implementation.
 *  Static attribute root change to access to it from any place (like "/" in shell)
 */
QUnit.test("Place root", function(assert) {
    let message = "Correct root";
    let a = new Place("a");
    assert.equal(Place.root, null, message);
    Place.root = a;
    let b = new Place("b");
    assert.equal(Place.root, a, message);
    assert.equal(Place.root, a, message);
    let c = new Place("c");
    b.addPlace(c);
    Place.root = b;
    assert.equal(Place.root, b, message);

});

/**
 *  To check the home implementation.
 *  Static attribute root change to access to it from any place (like "~" in shell)
 */
QUnit.test("Place home", function(assert) {
    let message = "Correct home";
    let a = new Place("a");
    assert.equal(Place.home, null, message);
    Place.home = a;
    let b = new Place("b");
    assert.equal(Place.home, a, message);
    assert.equal(Place.home, a, message);
    let c = new Place("c");
    a.addPlace(b);
    b.addPlace(c)
    Place.home = c;
    assert.equal(Place.home, c, message);

});

/**
 *  To check currentLocation implementation and the function moveTo.
 *  Access to a Place if contains in the currentLocation. Otherwise it returns false;
 */
QUnit.test("Changing place", function(assert) {
    let message = "Correct location";
    let user = new User("user");
    let parent = new Place("parent");
    let son = new Place("son");
    parent.addPlace(son);
    user.currentLocation = parent;
    assert.equal(user.currentLocation, parent, message);
    assert.equal(user.moveTo("son"), true, message);
    assert.equal(user.currentLocation, son, message);
    assert.equal(user.moveTo("else"), false, message);
    assert.equal(user.currentLocation, son, message);
    assert.equal(user.moveTo("."), true, message);
    assert.equal(user.currentLocation, son, message);
    assert.equal(user.moveTo(".."), true, message);
    assert.equal(user.currentLocation, parent, message);
    assert.equal(user.moveTo(".."), false, message);
    assert.equal(user.currentLocation, parent, message);
    
});

/**
 * parser.js test
 */
QUnit.test("Parsing", function(assert) {
    let parser = new Parser("", false);
    parser.parseCommand();

    // Empty command
    let cmdl = parser.getCommandList();
    assert.equal(cmdl.length, 1, "The command array length should be 1 since it wasn't a pipe command");
    assert.equal(cmdl[0].main, "", "The main command should be empty");
    assert.equal(cmdl[0].args.length, 0, "The args array should be empty");

    // Simple command
    parser.setCommand("a");
    parser.parseCommand();
    cmdl = parser.getCommandList();
    assert.equal(cmdl.length, 1, "The command array length should be 1 since it wasn't a pipe command");
    assert.equal(cmdl[0].main, "a", "The main command should be 'a'");
    assert.equal(cmdl[0].args.length, 0, "The args array should be empty");

    // Command with arguments
    parser.setCommand("cmd arg1 arg2 arg3");
    parser.parseCommand();
    cmdl = parser.getCommandList();
    assert.equal(cmdl.length, 1, "The command array length should be 1 since it wasn't a pipe command");
    assert.equal(cmdl[0].main, "cmd", "The main command should be 'cmd'");
    assert.equal(cmdl[0].args.length, 3, "The args array length should be 3");
    assert.equal(cmdl[0].args[0], "arg1", "The 1st arg should be 'arg1'");
    assert.equal(cmdl[0].args[1], "arg2", "The 2nd arg should be 'arg2'");
    assert.equal(cmdl[0].args[2], "arg3", "The 3rd arg should be 'arg3'");

    // Command with arguments and pipe
    parser.setCommand("cmd1 arg1 |cmd2 arg2| cmd3 arg3");
    parser.parseCommand();
    cmdl = parser.getCommandList();
    assert.equal(cmdl.length, 3, "The command array length should be 3 since we use 2 pipes");
    assert.equal(cmdl[0].main, "cmd1", "The main command should be 'cmd1'");
    assert.equal(cmdl[0].args[0], "arg1", "The 1st arg should be 'arg1'");
    assert.equal(cmdl[1].main, "cmd2", "The main command should be 'cmd2'");
    assert.equal(cmdl[1].args[0], "arg2", "The 1st arg should be 'arg2'");
    assert.equal(cmdl[2].main, "cmd3", "The main command should be 'cmd3'");
    assert.equal(cmdl[2].args[0], "arg3", "The 1st arg should be 'arg3'");

    // Command with arguments and the 132 space (&nbsp;)
    parser.setCommand("cmd arg1 arg2 arg3");
    parser.parseCommand();
    cmdl = parser.getCommandList();
    assert.equal(cmdl.length, 1, "The command array length should be 1 since it wasn't a pipe command");
    assert.equal(cmdl[0].main, "cmd", "The main command should be 'cmd', and we use the 132 space (&nbsp;)");
    assert.equal(cmdl[0].args.length, 3, "The args array length should be 3, and we use the 132 space (&nbsp;)");
    assert.equal(cmdl[0].args[0], "arg1", "The 1st arg should be 'arg1', and we use the 132 space (&nbsp;)");
    assert.equal(cmdl[0].args[1], "arg2", "The 2nd arg should be 'arg2', and we use the 132 space (&nbsp;)");
    assert.equal(cmdl[0].args[2], "arg3", "The 3rd arg should be 'arg3', and we use the 132 space (&nbsp;)");

});