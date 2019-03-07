(function() {

})();

let blinkingCursor;
let consoleFocused = false;
let firstConnection = true;

/**
 * Focus detector for the console
 * The cursor begin to blink
 * and the textarea is now focused
 */
document.getElementById("console").addEventListener("click", function() {
  /**
   * Blink method for the cursor
   */
  clearInterval(blinkingCursor);
  let cursor = document.getElementById('cursor');
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
document.getElementById("side-panel").addEventListener("click", function() {
  document.getElementById('cursor').classList.remove('visible');
  clearInterval(blinkingCursor);
  consoleFocused = false;
});


let inputTextFirst  = document.getElementById("input-text-first");
let cursor  = document.getElementById("cursor");
let inputTextSecond = document.getElementById("input-text-second");

/**
 * Detect keyboard events
 */
document.getElementsByClassName("textInput")[0].addEventListener("keydown", function(event) {

  // Detect keyboard events only if console is focused
  if (consoleFocused) {

    let code  = event.keyCode;
    let input = event.key;

    console.log(code, input);

    let size1 = inputTextFirst.innerText.length;
    let size2 = inputTextSecond.innerText.length;

    if (code === 8) // BACKSPACE
    inputTextFirst.innerText = inputTextFirst.innerText.substring(0, size1-1);

    else if (code === 46) {
      if (size2 > 0) {
        cursor.innerText = inputTextSecond.innerText.substring(0, 1);
        inputTextSecond.innerText = inputTextSecond.innerText.substring(1, size2);
      }
    }

    else if (code === 13) { // ENTER

      // First connection : ask the user for his pseudo
      if (firstConnection) {
        let pseudo = "";

        if (size1 > 0)
          pseudo += inputTextFirst.innerText;

        pseudo += cursor.innerText;

        if (size2 > 0)
          pseudo += inputTextSecond.innerText;

        pseudo = pseudo.substring(0, pseudo.length - 1); // Remove the last char (&nbsp;)

        // Init the engine with the user pseudo
        Main.init(pseudo);

        // Say hello to the user
        printMessage("Bienvenue " + pseudo + " !");

        inputTextFirst.innerHTML = "";
        cursor.innerHTML = '&nbsp;';
        inputTextSecond.innerHTML = "";

        document.getElementById("chevron").innerHTML = pseudo + "@terminus: $&nbsp;";
        firstConnection = false;
      }
      // Else, normal use of the console engine
      else {
        let msg = document.getElementById('chevron').innerHTML;

        if (size1 > 0)
          msg += inputTextFirst.innerText;

        msg += cursor.innerText;

        if (size2 > 0)
          msg += inputTextSecond.innerText;

        msg = msg.substring(0, msg.length - 1); // Remove the last char (&nbsp;)

        printMessage(msg);

        inputTextFirst.innerHTML = "";
        cursor.innerHTML = '&nbsp;';
        inputTextSecond.innerHTML = "";

        Main.executeCommand(msg.replace(document.getElementById("chevron").innerHTML, ''));
      }
    }

    else if (code === 37) { // LEFT ARROW
      if (size1 > 0) {
        inputTextSecond.innerText = cursor.innerText + inputTextSecond.innerText;
        cursor.innerText = inputTextFirst.innerText.substring(size1-1, size1);
        inputTextFirst.innerText = inputTextFirst.innerText.substring(0, size1-1);
      }
    }

    else if (code === 39) { // RIGHT ARROW
      if (size2 > 0) {
        inputTextFirst.innerText += cursor.innerText;
        cursor.innerText = inputTextSecond.innerText.substring(0, 1);
        inputTextSecond.innerText = inputTextSecond.innerText.substring(1, size2);
      }
      else if (size2 === 0) {
        if (cursor.innerHTML !== '&nbsp;')
          inputTextFirst.innerHTML += cursor.innerHTML;
        cursor.innerHTML = '&nbsp;';
      }
    }

    else if (code === 32) { // SPACE
      // Transform the normal space in an unbreakable space
      inputTextFirst.innerHTML += '&nbsp;';
    }

    else if (input.length === 1) // letter, digit and others
      inputTextFirst.innerHTML += input;
  }
});

/**
 * Clear the console content
 */
function clear() {
  document.getElementById("console-output").innerHTML = ''
}

/**
 * Reload the page
 */
function reload() {
  location.reload();
}

/**
 * Print a message on the screen
 */
function printMessage(message) {
  message = message.replace('&nbsp;', ' ');
  let msgTab = message.split(/(\r\n|\n|\r)/gm);

  let childDiv = document.createElement("div");
  childDiv.classList.add("message");

  // Add br elements when message contains \n
  for (let i = 0; i < msgTab.length - 1; i++) {
    childDiv.appendChild(document.createTextNode(msgTab[i]));
    childDiv.appendChild(document.createElement("br"));
  }
  childDiv.appendChild(document.createTextNode(msgTab[msgTab.length - 1]));

  document.getElementById("console-output").appendChild(childDiv);
}
