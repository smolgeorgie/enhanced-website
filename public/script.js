var upScoreButton = document.getElementById('upScore');
var downScoreButton = document.getElementById('downScore');
var scoreSpan = document.querySelector('.score');

upScoreButton.addEventListener('click', function () {
    var score = parseInt(scoreSpan.textContent, 10);
    if (score < 5) { // Prevent the score from going above 5
        scoreSpan.textContent = score + 1;
    }
});

downScoreButton.addEventListener('click', function () {
    var score = parseInt(scoreSpan.textContent, 10);
    if (score > -5) { // Prevent the score from going below -5
        scoreSpan.textContent = score - 1;
    }
});


// var scoreBox = document.querySelector('.score-box');
// var popover = document.getElementById('popover');
// var closePopoverButton = document.getElementById('closePopoverButton');

// scoreBox.addEventListener(
//     "click",
//     function (event) {
//         event.stopPropagation(); // Stop the event from propagating to the window
//         popover.classList.add("show");
//     }
// );

// closePopoverButton.addEventListener(
//     "click",
//     function (event) {
//         event.stopPropagation(); // Stop the event from propagating to the window
//         popover.classList.remove("show");
//     }
// );

// window.addEventListener(
//     "click",
//     function (event) {
//         if (event.target != popover && !scoreBox.contains(event.target)) {
//             popover.classList.remove("show");
//         }
//     }
// );