
const NBSPACE = "&nbsp;";

let blinkingCursor;
let consoleFocused = false;
let firstConnection = true;
let commandSave = [];
let tmpCommand = '';
let saveIndex = -1;

focusConsole();

/**
 * Focus detector for the console
 * The cursor begin to blink
 * and the textarea is now focused
 */
document.addEventListener("click", function() {
    focusConsole();
});

/**
 * Blink method for the cursor
 */
function focusConsole() {
    clearInterval(blinkingCursor);
    let cursor = document.getElementById('cursor');
    blinkingCursor = window.setInterval(function() {
        if(cursor.classList.contains('visible'))
            cursor.classList.remove('visible');
        else
            cursor.classList.add('visible');
    }, 500);

    document.getElementsByClassName("textInput")[0].focus();
    document.getElementsByClassName("textInput")[0].select();
    consoleFocused = true;
}

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

        let size1 = inputTextFirst.innerText.length;
        let size2 = inputTextSecond.innerText.length;

        if (code === 8) // BACKSPACE
            inputTextFirst.innerText = inputTextFirst.innerText.substring(0, size1-1);

        else if (code === 46) { // DELETE
            if (size2 > 0) {
                cursor.innerText = inputTextSecond.innerText.substring(0, 1);
                inputTextSecond.innerText = inputTextSecond.innerText.substring(1, size2);
            }
        }

        else if (code === 9) { // TAB
            // TODO
            // use Main.user.currentLocation.getStartWith(<pattern>) in a loop
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

                // If the pseudo is empty or contains space(s), ask for it again
                if (pseudo.length === 0) {
                    printMessage("Veuillez entrer un pseudo :");
                }
                else {
                    // Init the engine with the user pseudo
                    Main.init(pseudo);

                    // Say hello to the user
                    printMessage("Bienvenue " + pseudo + " !");

                    inputTextFirst.innerHTML = "";
                    cursor.innerHTML = NBSPACE;
                    inputTextSecond.innerHTML = "";

                    document.getElementById("chevron").innerHTML = getConsolePath();
                    firstConnection = false;
                }
            }
            // Else, normal use of the console engine
            else {
                let msg = "";
              
                if (size1 > 0)
                    msg += inputTextFirst.innerText;

                msg += cursor.innerText;

                if (size2 > 0)
                    msg += inputTextSecond.innerText;

                // Add to command history (at the beginning of the table)
                // Only if not empty command (1 corresponds to the space char)
                if (msg.length > 1)
                    commandSave.unshift(msg);

                // Reset the save index
                saveIndex = -1;

                msg = msg.substring(0, msg.length - 1); // Remove the last char (&nbsp;)

                // Print the message with the path before
                printMessage(msg, true);

                inputTextFirst.innerHTML = "";
                cursor.innerHTML = NBSPACE;
                inputTextSecond.innerHTML = "";

                Main.executeCommand(msg);

                // Change the path that is print before the command input
                document.getElementById("chevron").innerHTML = getConsolePath();
            }
        }

        else if (code === 37) { // ARROW LEFT
            if (size1 > 0) {
                inputTextSecond.innerText = cursor.innerText + inputTextSecond.innerText;
                cursor.innerText = inputTextFirst.innerText.substring(size1-1, size1);
                inputTextFirst.innerText = inputTextFirst.innerText.substring(0, size1-1);
            }
        }

        else if (code === 38) { // ARROW UP

            // Save the current line if index equals -1
            if (saveIndex === -1) {
                tmpCommand = "";

                if (size1 > 0)
                    tmpCommand += inputTextFirst.innerText;

                tmpCommand += cursor.innerText;

                if (size2 > 0)
                    tmpCommand += inputTextSecond.innerText;

                console.log(tmpCommand);
            }

            if(commandSave.length > 0) {

                if(saveIndex < commandSave.length - 1)
                    saveIndex++;

                let size = commandSave[saveIndex].length;

                inputTextFirst.innerHTML = commandSave[saveIndex].substring(0, size - 1); // Stop before de last char (&nbsp;)
                cursor.innerHTML = NBSPACE;
                inputTextSecond.innerHTML = "";
            }
        }

        else if (code === 39) { // ARROW RIGHT
            if (size2 > 0) {
                inputTextFirst.innerText += cursor.innerText;
                cursor.innerText = inputTextSecond.innerText.substring(0, 1);
                inputTextSecond.innerText = inputTextSecond.innerText.substring(1, size2);
            }
            else if (size2 === 0) {
                if (cursor.innerHTML !== NBSPACE)
                    inputTextFirst.innerHTML += cursor.innerHTML;
                cursor.innerHTML = NBSPACE;
            }
        }

        else if (code === 40) { // ARROW DOWN
            if(commandSave.length > 0 && saveIndex >= 0) {
                if(saveIndex > 0) {
                    saveIndex--;

                    let size = commandSave[saveIndex].length;

                    inputTextFirst.innerHTML = commandSave[saveIndex].substring(0, size - 1); // Stop before de last char (&nbsp;)
                    cursor.innerHTML = NBSPACE;
                    inputTextSecond.innerHTML = "";
                }
                else if (saveIndex === 0) {
                    saveIndex--;

                    inputTextFirst.innerHTML = tmpCommand.substring(0, tmpCommand.length - 1); // Stop before de last char (&nbsp;)
                    cursor.innerHTML = NBSPACE;
                    inputTextSecond.innerHTML = "";
                }
            }
        }

        else if (code === 32) { // SPACE
            // Transform the normal space in an unbreakable space
            inputTextFirst.innerHTML += NBSPACE;
        }

        else if (input.length === 1) // letter, digit and others
            inputTextFirst.innerHTML += input;
    }
});

/**
 * Return the path message (with style) to print to the console.
 * @returns {string} Path string.
 */
function getConsolePath() {
    return '<span style="color: #79e234;">' + Main.user.login + '@terminus:</span>' +
        '<span style="color: #709ede;">' + Main.user.getPath() + '</span>' + NBSPACE + '$' + NBSPACE;
}

/**
 * Clear the console content.
 */
function clear() {
    document.getElementById("console-output").innerHTML = ''
}

/**
 * Reload the page.
 */
function reload() {
    location.reload();
}

/**
 * Print a message on the screen.
 * @param message Message to print.
 * @param path Optional. If true, the function will print the path before the message.
 */
function printMessage(message, path = false) {
    //message = message.replace('&nbsp;', ' ');
    let msgTab = message.split(/\n/gm);

    let childDiv = document.createElement("div");
    childDiv.classList.add("message");

    if (path)
        childDiv.innerHTML = document.getElementById('chevron').innerHTML;

    // Add br elements when message contains \n
    for (let i = 0; i < msgTab.length - 1; i++) {
        //childDiv.appendChild(document.createTextNode(msgTab[i]));
        childDiv.innerHTML += msgTab[i];
        childDiv.appendChild(document.createElement("br"));
    }
    childDiv.innerHTML += msgTab[msgTab.length - 1]; // Last line, without <br> after

    document.getElementById("console-output").appendChild(childDiv);

    // For browsers that does not auto scroll to the bottom of the page
    // To test
    //document.getElementById("console").scrollTo(0, document.body.scrollHeight);
}

function print(message, color) {
    let childSpan = document.createElement("span");
    childSpan.style.color = color;
    childSpan.innerText = message;

    document.getElementById("console-output").lastElementChild.appendChild(childSpan);
}
