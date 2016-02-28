//Creates the mongo db collection (similar to a table in SQL)
// It's referred to playlists in mongo, but within the js files
// variable reference is playList.
playList = new Mongo.Collection("playlists");

if (Meteor.isClient) {

  Template.playList.helpers({
    playListItem: function () {
      return playList.find({});
    }
  });

  Template.playList.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Populate the db with some default code
    if (!playList.findOne()){
        console.log("No playlist contents yet. Creating starter data.");
        playList.insert({
            title:"Mozart 1 ",             
            description:"This is the first liturgical piece by Mozart.", 
            createdOn:new Date()
        });
    } 
  } );
}
