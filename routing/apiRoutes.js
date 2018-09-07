// ===============================================================================
// LOAD DATA
// ===============================================================================

var friendsData = require("../app/data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // BFF Object
    var bff = {
      name: "",
      photo: "",
      matchScore: Infinity
    };

    // Grab survey scores for comparison with friendsArray scores
    var surveyAnswers = req.body;
    var surveyScores = surveyAnswers.scores;
    
    // Algorithm calculation variable
    var scoreCalc;

    // Scoring algorithm
    for (var i = 0; i < friendsData.length; i++) {
      var potentialBff = friendsData[i];
      scoreCalc = 0;

      console.log(potentialBff.name);

      // loop through all the scores of each friend
      for (var j = 0; j < potentialBff.scores.length; j++) {
        var potentialBffScore = potentialBff.scores[j];
        var currentScore = surveyScores[j];

        // calculate the difference between the scores, add them to get the final score calculation
        scoreCalc += Math.abs(parseInt(currentScore) - parseInt(potentialBffScore));
      }

      // If the sum of differences is less then the differences of the current bff
      if (scoreCalc <= bff.matchScore) {
        // Reset the bff to be the new friend.
        bff.name = potentialBff.name;
        bff.photo = potentialBff.photo;
        bff.matchScore = scoreCalc;
      }
    }

    // Return bff json to render to page
    res.json(bff);

  });
}
