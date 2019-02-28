(function() {

Main.init();

})();

var blinkingCursor;
var consoleFocused = false;

/**
 * Focus detector for the console
 * The cursor begin to blink
 * and the textarea is now focused
 */
document.getElementById("console").addEventListener("click", function(event) {
  /**
   * Blink method for the cursor
   */
  clearInterval(blinkingCursor);
  var cursor = document.getElementById('cursor');
  blinkingCursor = window.setInterval(function() {
      if(cursor.classList.contains('visible'))
        cursor.classList.remove('visible');
      else
        cursor.classList.add('visible');
  }, 500);

  document.getElementsByClassName("textInput")[0].focus();
  consoleFocused = true;
});

/**
 * Unfocus the textarea
 * and the cursor disappear
 */
document.getElementById("side-panel").addEventListener("click", function(event) {
  document.getElementById('cursor').classList.remove('visible');
  clearInterval(blinkingCursor);
  consoleFocused = false;
});


var inputTextFirst  = document.getElementById("input-text-first");
var cursor  = document.getElementById("cursor");
var inputTextSecond = document.getElementById("input-text-second");

/**
 * Detect keyboard events
 */
document.getElementsByClassName("textInput")[0].addEventListener("keydown", function(event) {
  console.log(event.keyCode);
  if (consoleFocused) {
    var code  = event.keyCode;
    var input = event.key;

    var size1 = inputTextFirst.innerText.length;
    var size2 = inputTextSecond.innerText.length;

    if (code == 8) // BACKSPACE
    inputTextFirst.innerText = inputTextFirst.innerText.substring(0, size1-1);

    else if (code == 46) {
      if (size2 > 0) {
        cursor.innerText = inputTextSecond.innerText.substring(0, 1);
        inputTextSecond.innerText = inputTextSecond.innerText.substring(1, size2);
      }
    }

    else if (code == 13) { // ENTER
      var msg = document.getElementById("chevron").innerText;

      if (size1 > 0)
        msg += inputTextFirst.innerText;

      msg += cursor.innerText;

      if (size2 > 0)
        msg += inputTextSecond.innerText;

      msg = msg.substring(0, msg.length - 1);

      printMessage(msg);
      inputTextFirst.innerHTML = "";
      cursor.innerHTML = '&nbsp;';
      inputTextSecond.innerHTML = "";
    }

    else if (code == 37) { // LEFT ARROW
      if (size1 > 0) {
        inputTextSecond.innerText = cursor.innerText + inputTextSecond.innerText;
        cursor.innerText = inputTextFirst.innerText.substring(size1-1, size1);
        inputTextFirst.innerText = inputTextFirst.innerText.substring(0, size1-1);
      }
    }

    else if (code == 39) { // RIGHT ARROW
      if (size2 > 0) {
        inputTextFirst.innerText += cursor.innerText;
        cursor.innerText = inputTextSecond.innerText.substring(0, 1);
        inputTextSecond.innerText = inputTextSecond.innerText.substring(1, size2);
      }
      else if (size2 == 0) {
        if (cursor.innerHTML != '&nbsp;')
          inputTextFirst.innerHTML += cursor.innerHTML;
        cursor.innerHTML = '&nbsp;';
      }
    }

    else if (code == 32) { // SPACE
      // Transform the normal space in an unbreakable space
      inputTextFirst.innerHTML += '&nbsp;';
    }

    else if (input.length == 1) // letter, digit and others
      inputTextFirst.innerHTML += input;
  }
});

/**
 * Print a message on the screen
 */
function printMessage(message) {
  message = message.replace('&nbsp;', ' ');

  var childDiv = document.createElement("div");
  childDiv.classList.add("message");
  var textNode = document.createTextNode( message );
  childDiv.appendChild(textNode);
  document.getElementById("console-output").appendChild(childDiv);
}
