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
    //    var war = function (card_1, card_2) {}
    //    if (cards_player_1 > cards_player_2)
    //        console.log('Player 1 is the Winner');
    //} else if (cards_player_1 < cards_player_2) {
    //    console.log('Player 2 is the winner');
    //} else {
    //    console.log('Its a tie!');
    //}
    //      var war = function ()
    //          if (cards_player_1 > cards_player_2) {
    //                console.log('Player 1 is the Winner'); 
    //      } else if (cards_player_1 < cards_player_2); {
    //            console.log('Player 2 is the Winner');
    //      }  else
    //            console.log(false);
    //
    //    });

    var advance = function () {
        //take the top two cards and display them
        var card_1 = cards_player_1[0];
        var card_2 = cards_player_2[0];
        $("#opp-card").html(convert_value_to_string(card_1.number) + " of " + card_1.suit);
        $("#opp-card-count").html(cards_player_1.length);
        $("#my-card").html(convert_value_to_string(card_2.number) + " of " + card_2.suit);
        $("#my-card-count").html(cards_player_2.length);
    };

    var newGame = function () {
        thePot = [];
        gameOver = false;
        dealCards();
        advance();
    };
    //create a play function
    //compare the cards
    //give the winner both cards (at end of deck)
    var compare = function (card_1, card_2) {
        console.log(card_1);
        if (card_1.number > card_2.number) {
            return card_1;
        } else if (card_1.number < card_2.number) {
            return card_2;
        }
        return false;
    };

    var giveCardsTo = function (cards_player, card_1, card_2) {
        cards_player.push(card_1);
        cards_player.push(card_2);
        for (var i = 0; i < thePot.length; i++) {
            cards_player.push(thePot[i]);
        }
        thePot = [];
        if (cards_player_1.length === 0) {
            console.log('Player 2 is the winner');
            gameOver = true;
        }

    };

    var gameOver = false;

    var thePot = [];

    var play = function () {
        var card_1 = cards_player_1.shift();
        var card_2 = cards_player_2.shift();
        var winnerCard = compare(card_1, card_2);
        if (winnerCard === false) {
            console.log('Its a tie');
            thePot.push(card_1);
            thePot.push(card_2);
            thePot.push(cards_player_1.shift());
            thePot.push(cards_player_1.shift());
            thePot.push(cards_player_1.shift());
            thePot.push(cards_player_2.shift());
            thePot.push(cards_player_2.shift());
            thePot.push(cards_player_2.shift());
            //take three cards from each deck
            //make sure cards don't disappear
            //give all to winner when found
        } else {
            // decide winner
            if (winnerCard === card_1) {
                giveCardsTo(cards_player_1, card_1, card_2);
                console.log('Gave cards to Player 1');
            } else {
                giveCardsTo(cards_player_2, card_1, card_2);
                console.log('Gave cards to Player 2');
            }
        }
        // give winner cards
        // inform who won
        // display next cards
        //this function (defined below) will continue to the next turn
        if (!gameOver) {
        advance();
        }
    };

    $(".btnPlay").click(function () {
        if (!gameOver) {
            play();
        }
    });

    $(".btnNewGame").click(function () {
        newGame();
    });
});