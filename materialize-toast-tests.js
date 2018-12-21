// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by materialize-toast.js.
import { name as packageName } from "meteor/mozfet:materialize-toast";

// Write your tests here!
// Here is an example.
Tinytest.add('materialize-toast - example', function (test) {
  test.equal(packageName, "materialize-toast");
});
