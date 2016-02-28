//Creates the mongo db collection (similar to a table in SQL)
// It's referred to playlists in mongo, but within the js files
// variable reference is playList.
playList = new Mongo.Collection("playlists");

// ------------------------
// CLIENT ONLY CODE
// ------------------------
if (Meteor.isClient) {
  
  
  // ------------------------
  // HELPER FUNCTIONS
  // ------------------------
  Template.playList.helpers({
    playListItem: function () {
      return playList.find({});
    }
  });

  
    
  // ------------------------
  // EVENT FUNCTIONS
  // ------------------------
  Template.playListData.events({
    'click .js-fav-button': function () {
      // Place holder for logging the number of clicks
      // to the favorite button.  Simply update to the 
      // db when the event occurs. 
      console.log("Clicked the favorite button!");
      playList.update( {_id: this._id  },
                      {$set: {favorite:true} });
    }
  });
}



// ------------------------
// SERVER ONLY CODE
// ------------------------
if (Meteor.isServer) {
  Meteor.startup(function () {
    // Populate the db with some default code
    if (!playList.findOne()){
        console.log("No playlist contents yet. Creating starter data.");
        playList.insert({
            title:"Mozart 1 ",             
            description:"This is the first liturgical piece by Mozart.", 
            duration:123, 
            createdOn:new Date()
        });
    } 
  } );
}
