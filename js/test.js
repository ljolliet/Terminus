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
});
