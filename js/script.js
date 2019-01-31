(function() {



})()

/**
 * List of available characters
 */
const BACKSPACE = 8;
const TAB = 9;
const ENTER = 13;
// Shift = 16 | CapsLock = 20

var inputTextFirst  = document.getElementById("input-text-first");
var cursor  = document.getElementById("cursor");
var inputTextSecond = document.getElementById("input-text-second");

/**
 * Detect keyboard events
 */
window.addEventListener("keydown", function(event) {
  var code  = event.keyCode;
  var input = event.key;

  var size1 = inputTextFirst.innerHTML.length;
  var size2 = inputTextSecond.innerHTML.length;

  if (code == 8) // BACKSPACE
  inputTextFirst.innerHTML = inputTextFirst.innerHTML.substring(0, size1-1);

  else if (code == 13) { // ENTER
    var msg = document.getElementById("chevron").innerText;
    if (size1 > 0)
      msg += inputTextFirst.innerHTML;
    if (cursor.innerHTML != '&nbsp;')
      msg += cursor.innerHTML;
    if (size2 > 0)
      msg += inputTextSecond.innerHTML;

    printMessage(msg);
    inputTextFirst.innerHTML = "";
    cursor.innerHTML = '&nbsp;';
    inputTextSecond.innerHTML = "";
  }

  else if (code == 37) { // LEFT ARROW
    if (size1 > 0) {
      if (cursor.innerHTML != '&nbsp;')
        inputTextSecond.innerHTML = cursor.innerHTML + inputTextSecond.innerHTML;
      cursor.innerHTML = inputTextFirst.innerHTML.substring(size1-1, size1);
      inputTextFirst.innerHTML = inputTextFirst.innerHTML.substring(0, size1-1);
    }
  }

  else if (code == 39) { // RIGHT ARROW
    if (size2 > 0) {
      if (cursor.innerHTML != '&nbsp;')
        inputTextFirst.innerHTML += cursor.innerHTML;
      cursor.innerHTML = inputTextSecond.innerHTML.substring(0, 1);
      inputTextSecond.innerHTML = inputTextSecond.innerHTML.substring(1, size2);
    }
    else if (size2 == 0) {
      if (cursor.innerHTML != '&nbsp;')
        inputTextFirst.innerHTML += cursor.innerHTML;
      cursor.innerHTML = '&nbsp;';
    }
  }

  else if (input.length == 1) // letter, digit and others
    inputTextFirst.innerHTML += input;

});

/**
 * Blink method for the cursor
 */
var cursor = document.getElementById('cursor');
var interval = window.setInterval(function(){
    if(cursor.classList.contains('visible'))
      cursor.classList.remove('visible');
    else
      cursor.classList.add('visible');
}, 500);


/**
   * Print a message on the screen
   */
  function printMessage(message) {
    var childDiv = document.createElement("div");
    childDiv.classList.add("message");
    var textNode = document.createTextNode(message);
    childDiv.appendChild(textNode);
    document.getElementById("console-output").appendChild(childDiv);
  }
