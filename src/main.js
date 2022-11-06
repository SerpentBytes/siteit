import { dispatch, handleImproperUsage } from './utility.js';

/* First function to be executed when user runs the tool from
the command-line. The "main" function is responsible for calling
the "dispatch" function if user provides a valid option */

const main = (args) => {
  const validValues = args.slice(2); // get rid of first 2 arguments
  if (
    validValues.length === 1 &&
    (validValues[0] === '-v' || validValues[0] === '--version')
  ) {
    dispatch('-v');
  } else if (
    validValues.length === 1 &&
    (validValues[0] === '-h' || validValues[0] === '--help')
  ) {
    dispatch('-h');
  } else if (validValues[0] === '-i' || validValues[0] === '--input') {
    dispatch('-i', validValues);
  } else if (validValues[0] === '-c' || validValues[0] === '--config') {
    dispatch('-c', validValues);
  } else {
    handleImproperUsage(); // print proper usage info
  }
};

export default main;
