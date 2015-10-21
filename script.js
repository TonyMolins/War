/* globals document, $*/

$(document).ready(function () {

    //what does this do?
    var convert_value_to_string = function (value) {
        if (value === 1) {
            return 'Ace';
        }
        if (value > 10) {
            switch (value) {
            case 11:
                return 'Jack';
            case 12:
                return 'Queen';
            case 13:
                return 'King';
            }
        }
        return value.toString();
    };

    //what does this do?
    var deck = [];
    var suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    for (var i = 0; i < suits.length; i++) {
        var suit = suits[i];
        for (var j = 0; j < 13; j++) {
            deck.push({
                number: j + 1,
                suit: suit
            });
        }
    }

    //what does this do?
    var shuffle = function (array) {
        var copy = [];
        var n = array.length;
        var i;
        while (n) {
            i = Math.floor(Math.random() * array.length);
            if (i in array) {
                copy.push(array[i]);
                delete array[i];
                n--;
            }
        }
        return copy;
    };

    //Now call the shuffle function and save the result of what shuffle returns into your deck variable
    var cards_player_1 = [];
    var cards_player_2 = [];
    // write a function called deal that will evently divide the deck up between the two players
    var dealCards = function () {
        var cardNumber;
        deck = shuffle(deck);
        cards_player_1 = [];
        cards_player_2 = [];
        for (cardNumber = 0; cardNumber < deck.length; cardNumber += 2) {
            cards_player_1.push(deck[cardNumber]);
            cards_player_2.push(deck[cardNumber + 1]);
        }
        $("#opp-card-count").text(cards_player_1.length);
        $("#my-card-count").text(cards_player_2.length);
    };
    //    while(deck > 0)


    //create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
    //  var war = function () {
    //      if (cards_player_1 > cards_player_2)
    //            console.log(Player 1 is the Winner);
    //        else if (cards_player_1 < cards_player_2);
    //        console.log(Player 2 is the Winner);
    //        else
    //            console.log(false)

    //};

    var advance = function () {
        //take the top two cards and display them
        if (cards_player_1.length) {
            var card_1 = cards_player_1[0];
            var card_2 = cards_player_2[0];
            $("#opp-card").html(convert_value_to_string(card_1.number) + " of " + card_1.suit);
            $("#opp-card-count").html(cards_player_1.length);
            $("#my-card").html(convert_value_to_string(card_2.number) + " of " + card_2.suit);
            $("#my-card-count").html(cards_player_2.length);

        }
    };

    var newGame = function () {
        dealCards();
        advance ();
    };
    //create a play function
    //compare the cards
    //give the winner both cards (at end of deck)
    var play = function () {

        //this function (defined below) will continue to the next turn
        advance();
    };


    advance();

    $(".btnPlay").click(function () {
        //        alert('Played a card.');
        play();
    });

    $(".btnNewGame").click(function () {
        //        alert('Started a New Game');
        newGame();
    });
});