//Challenge HW for unit 7

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
//var game_key = "";



//possible twist to add: game is best out of three, but a player can only choose each option once.
//if I get really bored. I could use the giphyAPI to play a 'rock beating scissors' and so on gif after every round





//initialize variables needed
var player1 = "";
var player2 = "";
var player_uno = false;
var player_dos = false;
var uno_guess = "";
var dos_guess = "";
var p1_wins = 0;
var p2_wins = 0;
var ties = 0;


$(document).ready(function () {

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
            player_uno = true;
            console.log(player_uno);
        } else if (player2 === "") {
            player2 = $("#player_name").val();
            database.ref().update({
                data_player2: player2
            });
            player_dos = true;
        } else {
            alert("Sorry! This game already has two players");
            console.log(player1);
            console.log(player2);
        }

        if (player_uno === true) {

            $(".uno").on("click", function () {

                uno_guess = $(this).attr("alt");
                database.ref().update({
                    data_p1guess: uno_guess
                });
                console.log("you clicked " + $(this).attr("alt"));
                player_uno = false;
                WhoWillWin();
                // if (player_dos === false) {
                //     player_uno = true;
                // }
            });
        } else if (player_dos === true) {

            $(".dos").on("click", function () {
                dos_guess = $(this).attr("alt");
                database.ref().update({
                    data_p2guess: dos_guess
                });
                console.log("you clicked " + $(this).attr("alt"));
                player_dos = false;
                WhoWillWin();
                //     if (player_uno === false) {
                //         player_dos = true;
                //     }
            });
        }
    });

    function WhoWillWin() {
        if (uno_guess !== "" && dos_guess !== "") {
            if (uno_guess === dos_guess) {
                ties++;
                $("#tieses").text(ties);
            } else if (uno_guess === "rock" && dos_guess === "paper") {
                p2_wins++;
                $("#p2w").text(p2_wins);
            } else if (uno_guess === "paper" && dos_guess === "scissors") {
                p2_wins++;
                $("#p2w").text(p2_wins);
            } else if (uno_guess === "scissors" && dos_guess === "rock") {
                p2_wins++;
                $("#p2w").text(p2_wins);
            } else {
                p1_wins++;
                $("#p1w").text(p1_wins);
            }
        } else {
            alert("waiting for other player to choose...");
        }
    }



});

database.ref("data_player1").on("value", function (snapshot) {

    if (snapshot.exists()) {
        //game_key = snapshot.key;
        console.log(snapshot.val());
        player1 = snapshot.val();
        $("#player1_name").text(player1);
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref("data_player2").on("value", function (snapshot) {

    if (snapshot.exists()) {
        console.log(snapshot.key);
        player2 = snapshot.val();
        $("#player2_name").text(player2);
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref("data_p1guess").on("value", function (snapshot) {

    uno_guess = snapshot.val();


    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref("data_p2guess").on("value", function (snapshot) {

    dos_guess = snapshot.val();

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});