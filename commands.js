const fs = require("fs");

function done(output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.errorHandler(command);
      break;
  }
}

const commandLibrary = {
  echo: function(userInput) {
    done(userInput);
  },
  cat: function(fullPath) {
    const filename = fullPath[0];
    fs.readFile(filename, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  head: function(fullPath) {
    const filename = fullPath[0];
    const numLines = 5;
    fs.readFile(filename, (err, data) => {
      if (err) {
        console.log("ERROR:", err);
      }

      let outputArray = [];
      let newlineCount = 0;

      // Loops through each char by their ASCII values
      for (let i = 0; i < data.length; i++) {
        const val = data[i];
        outputArray.push(String.fromCharCode(val));
        // if val is a newline (ASCII)
        if (val === 10) {
          ++newlineCount;
          if (newlineCount === numLines) {
            outputArray.pop();
            break;
          }
        }
      }
      done(outputArray.join(""));
    });
  },
  tail: function(fullPath) {
    const filename = fullPath[0];
    const numLines = 5;
    fs.readFile(filename, (err, data) => {
      if (err) {
        console.log("ERROR:", err);
      }

      let outputArray = [];
      let newlineCount = 0;

      for (let i = data.length - 1; i >= 0; i--) {
        const val = data[i];
        outputArray.push(String.fromCharCode(val));
        if (val === 10) {
          ++newlineCount;
          if (newlineCount === numLines) {
            outputArray.pop();
            break;
          }
        }
      }
      done(outputArray.reverse().join(""));
    });
  },
  errorHandler: function(command) {
    done(`ERROR: Command not found: '${command}'`);
  }
};

module.exports = {
  commandLibrary: commandLibrary,
  evaluateCmd: evaluateCmd
};
