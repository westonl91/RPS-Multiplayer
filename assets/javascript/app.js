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
var uno_message = "";
var dos_message = "";


$(document).ready(function () {

    $("#leave").hide();

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
            console.log("you are player uno");
            $("#name_form_div").hide("slow");
            $("#leave").show("slow");
            $("#exit_game").on("click", function() {
                player1 = "";
                $("#leave").hide("slow");
                $("#name_form_div").show("slow");
                database.ref("data_player1").remove();
                database.ref("data_p1w").remove();
            });
        } else if (player2 === "") {
            player2 = $("#player_name").val();
            database.ref().update({
                data_player2: player2
            });
            player_dos = true;
            console.log("you are player dos");
            $("#name_form_div").hide("slow");
            $("#leave").show("slow");
            $("#exit_game").on("click", function() {
                player2 = "";
                $("#leave").hide("slow");
                $("#name_form_div").show("slow");
                database.ref("data_player2").remove();
                database.ref("data_p2w").remove();
            });
        } else {
            alert("Sorry! This game already has two players");
            console.log(player1);
            console.log(player2);
        }

        if (player_uno === true) {

            $("#send_message").on("click", function(event) {
                event.preventDefault();
                uno_message = $("#player_message").val();
                console.log(uno_message);
                database.ref().update({
                    data_unoMessage: uno_message
                });
                $("#player_message").val("");
            });

            $(".uno").on("click", function () {

                uno_guess = $(this).attr("alt");
                database.ref().update({
                    data_p1guess: uno_guess
                });
                console.log("you clicked " + $(this).attr("alt"));
                $(".uno").attr("disabled", true);
                WhoWillWin();
            });
        } else if (player_dos === true) {

            $("#send_message").on("click", function(event) {
                event.preventDefault();
                dos_message = $("#player_message").val();
                console.log(dos_message);
                database.ref().update({
                    data_dosMessage: dos_message
                });
                $("#player_message").val("");
            });

            $(".dos").on("click", function () {
                dos_guess = $(this).attr("alt");
                database.ref().update({
                    data_p2guess: dos_guess
                });
                console.log("you clicked " + $(this).attr("alt"));
                $(".dos").attr("disabled", true);
                WhoWillWin();
            });
        }
    });

});

function WhoWillWin() {
    if (uno_guess !== "" && dos_guess !== "") {
        if (uno_guess === dos_guess) {
            ties++;
            database.ref().update({
                data_ties: ties
            });
        } else if (uno_guess === "rock" && dos_guess === "paper") {
            p2_wins++;
            database.ref().update({
                data_p2w: p2_wins
            });
        } else if (uno_guess === "paper" && dos_guess === "scissors") {
            p2_wins++;
            database.ref().update({
                data_p2w: p2_wins
            });
        } else if (uno_guess === "scissors" && dos_guess === "rock") {
            p2_wins++;
            database.ref().update({
                data_p2w: p2_wins
            });
        } else {
            p1_wins++;
            database.ref().update({
                data_p1w: p1_wins
            });
        }
    } else {
        alert("waiting for other player to choose...");
    }
}

function reset_game () {
    database.ref("data_p1guess").remove();
    uno_guess = "";
    database.ref("data_p2guess").remove();
    dos_guess = "";
    $("button").removeAttr("disabled");
}

// function leave_game () {
//     console.log(this.val());
// }


database.ref("data_player1").on("value", function (snapshot) {

    if (snapshot.exists()) {
        console.log(snapshot.val());
        player1 = snapshot.val();
        $("#player1_name").text(player1);
    } else {
        $("#player1_name").text("player 1");
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
    } else {
        $("#player2_name").text("player 2");
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref("data_p1guess").on("value", function (snapshot) {

    if (snapshot.exists()) {
        uno_guess = snapshot.val();
    }


    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref("data_p2guess").on("value", function (snapshot) {

    if (snapshot.exists()) {
        dos_guess = snapshot.val();
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref("data_ties").on("value", function (snapshot) {

    if (snapshot.exists()) {
        ties = snapshot.val();
        $("#tieses").text(ties);
        alert("it's a tie!");
        reset_game();
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref("data_p2w").on("value", function (snapshot) {

    if (snapshot.exists()) {
        p2_wins = snapshot.val();
        $("#p2w").text(p2_wins);
        alert(player2 + " wins!");
        reset_game();
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref("data_p1w").on("value", function (snapshot) {

    if (snapshot.exists()) {
        p1_wins = snapshot.val();
        $("#p1w").text(p1_wins);
        alert(player1 + " wins!");
        reset_game();
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref("data_unoMessage").on("value", function (snapshot) {

    if (snapshot.exists()) {
        uno_message = snapshot.val();
        $("#message_box").append("<p style='color:blue;'>" + player1 + ": " + uno_message + "</p>");
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

database.ref("data_dosMessage").on("value", function (snapshot) {

    if (snapshot.exists()) {
        dos_message = snapshot.val();
        $("#message_box").append("<p style='color:red;'>" + player2 + ": " + dos_message + "</p>");
    }

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});