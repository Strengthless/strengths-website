function initializeRNG() {
  document.getElementsByTagName("input")[0].setAttribute("disabled", 0);
  document.getElementsByTagName("button")[0].setAttribute("disabled", 0);
  // Disables the input and button while the algorithm is running, to avoid possible bugs.
  if (document.getElementsByTagName("line")[0].classList) {
    document.getElementsByTagName("line")[0].classList.remove("start");
  }
  // Reset the SVG animation.
  nodes = document.getElementsByClassName("random")[0].childNodes.length;
  // Determine the total amount of numbers that are still on the page.
  for (i = 0; i < nodes; i++) {
    setTimeout(function(){document.getElementsByClassName("random")[0].removeChild(document.getElementsByClassName("random")[0].lastChild);}, i*100);
  }
  // Remove all the previous numbers.
  amount = document.getElementById("amount").value
  // Determine the amount of numbers that will be randomly generated.
  var generateElements = document.createElement("span");
  generateElements.innerHTML = "0";
  generateElements.className = "nbr ltr";
  generateElements.style.color = "lightgreen";
  //  Initialize the text, class and style of the numbers.
  for (i = 0; i < amount; i++) {
    setTimeout(function(){document.getElementsByClassName("random")[0].appendChild(generateElements.cloneNode(true));}, i*150 + (nodes-1)*100);
  }
  // Append the number elements.
  setTimeout(generateNum, 300+nodes*100+amount*150);
  // When all the numbers have been appended, start shuffling the numbers.
}

function shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
    // Shuffles an array.
}

function generateNum() {
  var $randomnbr = $('.nbr');
  var $timer = 10;
  var $it;
  var $data = 0;
  var index;
  var change;
  var letters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
  var excludedLetters = [11, 23, 7, 18];
  var colors = ["green", "lightgreen"];
  // Initialize all the variables required by the algorithm.

  for (i = 0; i < excludedLetters.length; i++) {
    letters.splice(letters.indexOf(excludedLetters[i]), 1);
  }
  // Exclude specific numbers from the RNG array.

  shuffle(letters);
  // Shuffle the array, and generate the final result of the RNG.

  $randomnbr.each(function() {
    change = Math.round(Math.random() * 300) + 200;
    $(this).attr('data-change', change);
  });
  // Determine the amount of shuffling that will occur for each number.

  function random() {
    return Math.round(Math.random() * 28);
  };
  // Generate a random number for the program to display while it's shuffling.

  function select() {
    return Math.round(Math.random() * $randomnbr.length + 1);
  };
  // Randomly pick an element to shuffle for each iteration.

  function value() {
    $('.nbr:nth-child(' + select() + ')').html('' + random() + '');
    $('.nbr:nth-child(' + select() + ')').attr('data-number', $data);
    $('.nbr:nth-child(' + select() + ')').css("color", colors[Math.floor(Math.random() * 2)]);
    $data++;
    // Keep shuffling the numbers, and randomly assign them a color.
    $randomnbr.each(function() {
      if (parseInt($(this).attr('data-number')) > parseInt($(this).attr('data-change'))) {
        index = $('.ltr').index(this);
        $(this).html(letters[index]);
        $(this).removeClass('nbr');
        $(this).css("color", "white");
        // Stop shuffling the numbers, and assign them the proper class, color and text.
      }
    });
  };

  $it = setInterval(value, $timer);
  // Loop the number shuffling animation.

  var finishCheck = setInterval(checkIfFinished, 100);
  // Check if the algorithm has finished.

  function checkIfFinished() {
    if (!$(".nbr")[0]) {
/*      setTimeout(function() {
        $("line").addClass('start');
      }, 500);
*/
      // Draw the SVG line animation.
      clearInterval($it);
      clearInterval(finishCheck);
      // Stop the iterations/ checks to avoid memory leak.
      document.getElementsByTagName("input")[0].removeAttribute("disabled");
      document.getElementsByTagName("button")[0].removeAttribute("disabled");
      // Enables the input and button, as the algorithm has already finished.
    }
  };
}
