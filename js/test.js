/**
 *
 *
 *
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
    assert.equal(Place.root, b, message);
    assert.equal(Place.root, b, message);
});

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
    assert.equal(Place.home, b, message);
    assert.equal(Place.home, b, message);
    assert.equal(Place.home, b, message);
});
