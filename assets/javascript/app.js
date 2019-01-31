//Challenge HW for unit 7

$(document).ready(function () {
    //possible twist to add: game is best out of three, but a player can only choose each option once.
    //if I get really bored. I could use the giphyAPI to play a 'rock beating scissors' and so on gif after every round



    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB26RKaffVMai-rxe4rPfv52MI26tx6VM4",
        authDomain: "rps-multiplayer-47bfe.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-47bfe.firebaseio.com",
        projectId: "rps-multiplayer-47bfe",
        storageBucket: "rps-multiplayer-47bfe.appspot.com",
        messagingSenderId: "588360342603"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    //initialize variables needed
    var player1 = "";
    var player2 = "";

    database.ref().set({
        data_player1: player1,
        data_player2: player2
    });


    //first will be the handler for when the user presses start
    //next handler will be for when they click on an image

    // Whenever a user clicks the submit-bid button
    $("#submit_name").on("click", function (event) {
        // Prevent form from submitting
        event.preventDefault();


        if (player1 === "") {
            player1 = $("#player_name").val();
            database.ref().update({
                data_player1: player1
            });
            $("#player1_name").text(player1);
        } else if (player2 === "") {
            player2 = $("#player_name").val();
            database.ref().update({
                data_player2: player2
            });
            $("#player2_name").text(player2);
        } else {
            alert("Sorry! This game already has two players");
        }

        console.log(database.ref().data_player1);

    });

    database.ref("data_player1").on("value", function (snapshot) {

        player1 = snapshot.val();
        $("#player1_name").text(snapshot.val());

        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    database.ref("data_player2").on("value", function (snapshot) {

        player2 = snapshot.val();
        $("#player2_name").text(snapshot.val());

        // If any errors are experienced, log them to console.
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});