const NBSPACE = "&nbsp;";

let blinkingCursor;
let consoleFocused = false;
let firstConnection = true;

// Up / down handling
let commandSave = [];
let tmpCommand = '';
let saveIndex = -1;

// tab handling
let tabIndex = -1;
let tabCommandSaved = "";

focusConsole();

/**
 * Focus detector for the console
 * The cursor begin to blink
 * and the textarea is now focused
 */
document.addEventListener("click", function () {
    focusConsole();
});


/**
 * Blink method for the cursor
 */
function focusConsole() {



    clearInterval(blinkingCursor);
    let cursor = document.getElementById('cursor');
    blinkingCursor = window.setInterval(function () {
        if (cursor.classList.contains('visible'))
            cursor.classList.remove('visible');
        else
            cursor.classList.add('visible');
    }, 500);

    document.getElementsByClassName("textInput")[0].focus();
    document.getElementsByClassName("textInput")[0].select();
    consoleFocused = true;
}

let inputTextFirst = document.getElementById("input-text-first");
let cursor = document.getElementById("cursor");
let inputTextSecond = document.getElementById("input-text-second");

/**
 * Detect keyboard events
 */
document.getElementsByClassName("textInput")[0].addEventListener("keydown", function (event) {
    // Detect keyboard events only if console is focused
    if (consoleFocused) {

        let code = event.keyCode;
        let input = event.key;

        let size1 = inputTextFirst.innerText.length;
        let size2 = inputTextSecond.innerText.length;


        if (code === 8) { // BACKSPACE
            inputTextFirst.innerText = inputTextFirst.innerText.substring(0, size1 - 1);
        } else if (code === 46) { // DELETE
            if (size2 > 0) {
                cursor.innerText = inputTextSecond.innerText.substring(0, 1);
                inputTextSecond.innerText = inputTextSecond.innerText.substring(1, size2);
            }
        } else if (code === 9) { // TAB
            let parsedCommand = (new Parser(tabCommandSaved)).getParsedCommand();

            // This is to prevent overflow
            if (tabIndex > 10000) tabIndex = 0;

            // We need to count the number of TAB typed
            tabIndex++;

            // If there is no extra arguments, we will check if the command typed starts with ./
            if(parsedCommand.args[0].startsWith("./")) {
                let cmdChecker = new Checker(parsedCommand, Main.user);
                if (cmdChecker.getCommandType() === COMMAND_TYPE.LAUNCH) {
                    let objects = Main.user.currentLocation.getStartWith(parsedCommand.toString().slice(2));
                    let scripts = [];
                    for(let object of objects){
                        if(object instanceof Quest || object instanceof Script){
                            scripts.push(colorize(object));
                        }
                    }

                    if(scripts.length === 1) {
                        // We need to remove what the user has written with the write object name
                        inputTextFirst.innerText = "./" + scripts[0][0];
                        tabCommandSaved = inputTextFirst.innerText;
                    } else if(scripts.length > 1) {
                        // Get console input
                        let msg = getConsoleInputContent();
                        msg = msg.substring(0, msg.length - 1); // Remove the last char (&nbsp;)

                        // Print the message with the path before
                        printMessage(msg, true);

                        colorMessage(scripts);
                    }
                }
            // There is no extra argument
            } else if (parsedCommand.args.length === 1 && !tabCommandSaved.endsWith(" ")) {

                // The user has typed TAB, we need to retrieve the closest command, then we override the current input
                let closestCommands = Command.getClosestCommands(tabCommandSaved);

                // We can update the input
                if (closestCommands.length > 0) inputTextFirst.innerText = closestCommands[tabIndex % closestCommands.length];
            } else { // there are extra arguments
                // We get the last argument
                let lastArgument = "";
                if(!tabCommandSaved.endsWith(" "))
                    lastArgument = parsedCommand.args[parsedCommand.args.length - 1];

                // We get the objects that are the closest to the last argument
                let objects = Main.user.currentLocation.getStartWith(lastArgument);

                if (objects.length > 1) {
                    let objectNames = [];

                    for (let object of objects) {
                        objectNames.push(colorize(object));
                    }

                    // Get console input
                    let msg = getConsoleInputContent();
                    msg = msg.substring(0, msg.length - 1); // Remove the last char (&nbsp;)

                    // Print the message with the path before
                    printMessage(msg, true);

                    colorMessage(objectNames);
                } else if (objects.length === 1) {
                    // We need to remove what the user has written with the write object name
                    if(!tabCommandSaved.endsWith(" "))
                        inputTextFirst.innerText = inputTextFirst.innerText.substring(0, inputTextFirst.innerText.length - lastArgument.length) + objects[0].name;
                    else
                        inputTextFirst.innerText += objects[0].name;
                    tabCommandSaved = inputTextFirst.innerText;
                }
            }
        } else if (code === 13) { // ENTER

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
                if (pseudo.length === 0 || pseudo.indexOf(String.fromCharCode(160)) !== -1) {
                    printMessage("Veuillez entrer un pseudo valide (sans espace) :");
                } else {
                    // Init the engine with the user pseudo
                    Main.init(pseudo);

                    // Say hello to the user
                    printMessage("Bienvenue " + pseudo + " !");

                    printConsolePath();
                    firstConnection = false;
                }

                // Clear the console input
                clearConsoleInput();
            }
            // Else, normal use of the console engine
            else {
                let msg = getConsoleInputContent();

                // Add to command history (at the beginning of the table)
                // Only if not empty command (1 corresponds to the space char)
                if (msg.length > 1)
                    commandSave.unshift(msg);

                // Reset the save index
                saveIndex = -1;

                msg = msg.substring(0, msg.length - 1); // Remove the last char (&nbsp;)

                // Print the message with the path before
                printMessage(msg, true);

                // Clear the console input
                clearConsoleInput();

                Main.executeCommand(msg);

            }
        } else if (code === 37) { // ARROW LEFT
            if (size1 > 0) {
                inputTextSecond.innerText = cursor.innerText + inputTextSecond.innerText;
                cursor.innerText = inputTextFirst.innerText.substring(size1 - 1, size1);
                inputTextFirst.innerText = inputTextFirst.innerText.substring(0, size1 - 1);
            }
        } else if (code === 38) { // ARROW UP

            // Save the current line if index equals -1
            if (saveIndex === -1) {
                tmpCommand = "";

                if (size1 > 0)
                    tmpCommand += inputTextFirst.innerText;

                tmpCommand += cursor.innerText;

                if (size2 > 0)
                    tmpCommand += inputTextSecond.innerText;
            }

            if (commandSave.length > 0) {

                if (saveIndex < commandSave.length - 1)
                    saveIndex++;

                let size = commandSave[saveIndex].length;

                inputTextFirst.innerHTML = commandSave[saveIndex].substring(0, size - 1); // Stop before de last char (&nbsp;)
                cursor.innerHTML = NBSPACE;
                inputTextSecond.innerHTML = "";
            }
        } else if (code === 39) { // ARROW RIGHT
            if (size2 > 0) {
                inputTextFirst.innerText += cursor.innerText;
                cursor.innerText = inputTextSecond.innerText.substring(0, 1);
                inputTextSecond.innerText = inputTextSecond.innerText.substring(1, size2);
            } else if (size2 === 0) {
                if (cursor.innerHTML !== NBSPACE)
                    inputTextFirst.innerHTML += cursor.innerHTML;
                cursor.innerHTML = NBSPACE;
            }
        } else if (code === 40) { // ARROW DOWN
            if (commandSave.length > 0 && saveIndex >= 0) {
                if (saveIndex > 0) {
                    saveIndex--;

                    let size = commandSave[saveIndex].length;

                    inputTextFirst.innerHTML = commandSave[saveIndex].substring(0, size - 1); // Stop before de last char (&nbsp;)
                    cursor.innerHTML = NBSPACE;
                    inputTextSecond.innerHTML = "";
                } else if (saveIndex === 0) {
                    saveIndex--;

                    inputTextFirst.innerHTML = tmpCommand.substring(0, tmpCommand.length - 1); // Stop before de last char (&nbsp;)
                    cursor.innerHTML = NBSPACE;
                    inputTextSecond.innerHTML = "";
                }
            }
        } else if (input === 'c' && event.ctrlKey) {
            if (Main.stop())
                printMessage("^C");
            else {
                let msg = getConsoleInputContent();
                msg = msg.substring(0, msg.length - 1); // Remove the last char (&nbsp;)
                msg += "^C";
                printMessage(msg, true);

                clearConsoleInput();
            }
        } else if (code === 32) { // SPACE
            // Transform the normal space in an unbreakable space
            inputTextFirst.innerHTML += NBSPACE;
        } else if (input.length === 1) { // letter, digit and others
            inputTextFirst.innerHTML += input;
        }

        // When something else than TAB is pressed, we need to update the temp value
        if (code !== 9) {
            tabCommandSaved = inputTextFirst.innerText;
        }
    }
});

/**
 * Return the path message (with style) to print to the console.
 * @returns {string} Path string.
 */
function printConsolePath() {
    document.getElementById("chevron").innerHTML = '<span style="color: #79e234;">' + Main.user.login + '@terminus:</span>' +
        '<span style="color: #709ede;">' + Main.user.getPath() + '</span>' + NBSPACE + '$' + NBSPACE;
}

/**
 * Clear the console input
 */
function clearConsoleInput() {
    inputTextFirst.innerHTML = "";
    cursor.innerHTML = NBSPACE;
    inputTextSecond.innerHTML = "";
}

/**
 * Get the console input content
 * @returns {string} Return the console input content
 */
function getConsoleInputContent() {
    let size1 = inputTextFirst.innerText.length;
    let size2 = inputTextSecond.innerText.length;

    let msg = "";
    if (size1 > 0)
        msg += inputTextFirst.innerText;
    msg += cursor.innerText;
    if (size2 > 0)
        msg += inputTextSecond.innerText;

    return msg;
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

    // Scroll to page bottom
    document.getElementsByClassName("textInput")[0].scrollIntoView(true);
}

/**
 * Print a colored message on the console output.
 * @param colorMsg [string, string]
 *          - 0: string to write
 *          - 1: string corresponding to the color
 */
function colorMessage(colorMsg) {
    let childDiv = document.createElement("div");
    childDiv.classList.add("message");

    for (let i = 0; i < colorMsg.length; i++) { // Foreach message
        colorMsg[i][0] += NBSPACE; // Add a space char to separate messages
        let msgTab = colorMsg[i][0].split(/\n/gm);

        let childSpan = document.createElement("span");
        childSpan.style.color = colorMsg[i][1];

        // Add br elements when message contains \n
        for (let i = 0; i < msgTab.length - 1; i++) {
            //childDiv.appendChild(document.createTextNode(msgTab[i]));
            childSpan.innerHTML += msgTab[i];
            childSpan.appendChild(document.createElement("br"));
        }
        childSpan.innerHTML += msgTab[msgTab.length - 1]; // Last line, without <br> after

        childDiv.appendChild(childSpan);
    }

    document.getElementById("console-output").appendChild(childDiv);

    // Scroll to page bottom
    document.getElementsByClassName("textInput")[0].scrollIntoView(true);
}

function colorize(object) {
    if (object instanceof Place) {
        return [object.name, COLOR.PLACE];
    } else if (object instanceof Item) {
        return [object.name, COLOR.ITEM];
    } else if (object instanceof PNJ) {
        return [object.name, COLOR.PNJ];
    } else if (object instanceof Quest) {
        let questAvailable = true;
        for (let dependency of object.questsRequired) // to check if the quest is available (all dependencies done)
            if (dependency.status !== STATUS.DONE)
                questAvailable = false;
        if (questAvailable) {
            if (object.status === STATUS.TODO)
                return [object.name, COLOR.QUEST_TODO];
            if (object.status === STATUS.STARTED)
                return [object.name, COLOR.QUEST_IN_PROGRESS];
            if (object.status === STATUS.DONE)
                return [object.name, COLOR.QUEST_DONE];
        }
    } else if (object instanceof Script) {
        return [object.name, COLOR.SCRIPT];
    } else {
        return [object.name, COLOR.OTHER];
    }
    return null;
}
function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}