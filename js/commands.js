class Command{}

// ***************************
// Abstract methods
// ***************************

/**
 * @param commandObj the command object {main, args} from parser.
 * @returns true if this instance of command corresponds to this commandObj.
 */
Command.prototype.isCommand = function(commandObj){};

/**
 * @returns true if the command is correct.
 */
Command.prototype.isValid = function(){};

/**
 * @returns the error message.
 */
Command.prototype.getErrorMessage = function(){};


// ***************************
// Sub classes 
// ***************************

class Cd extends Command{
    // TODO: code
}