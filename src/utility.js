/* a set of custom utlity functions that help manage Siteit */

import pJson from '../package.json' assert { type: 'json' };
import { cmd, flag, hdg, src } from './cli-display.js';
import FileParser from './file-parser.js';

/* This function is executed when user incorrectly makes use of the
available options */
export const handleImproperUsage = (option) => {
  switch (option) {
    case '-i':
      console.log(
        `-- ERROR --\n${cmd()} -i myfile.txt\nusage: ${cmd()} --input myfile.txt`
      );
      break;
    case '-c':
      console.log(
        `-- ERROR --\n${cmd()} -c myfile.json\nusage: ${cmd()} --config myfile.json`
      );
      break;
    default:
      console.log(`Usage: ${cmd()} ${flag('[flag]')} ${src('[source]')}`);
  }
};
/* This function is ultimately executed to display tool name and version when the user
 runs the tool with -v or --version option */

const displayNameVersion = () => {
  console.log(`Name: ${pJson.name}\nVersion: ${pJson.version}`);
};

/* This function is ultimately executed to display the usage guide for when -h or --help option is
used */
const displayManual = () => {
  console.log(`
${hdg('SiteIt - USAGE MANUAL')}

    usage:
             ${cmd()} ${flag('[flag]')}
             ${cmd()} ${flag('[flag]')} ${src('[source_file]')}
             ${cmd()} ${flag('[flag]')} ${src('[source_directory]')}

    example:
             ${cmd()} ${flag('-v')}
             ${cmd()} ${flag('-i')} ${src('source_file.txt')}
             ${cmd()} ${flag('-i')} ${src('./source_directory')}

Common SiteIt Flag Options
----------------------------------------------------------------------

    ${flag('--version | -v')}     Outputs tool name and version information

    ${flag('--help    | -h')}     Outputs Siteit command usage manual

    ${flag('--input   | -i')}    Accepts a source file or a directory containing
                       files as input, and outputs an HTML file for
                       each file supplied

    ${flag(
      '--config  | -c'
    )}    Accepts the 'ssg-config.json' file to create a script for running multiple commands

----------------------------------------------------------------------
                        *** END OF MANUAL ***
    `);
};

/* dispatch function name is inspired by Redux dispatch function.
Here, dispatch is responsible for dispatching the job to the right
function based on option supplied by user
*/
export const dispatch = (...args) => {
  const option = args[0];
  let fileParser;
  switch (option) {
    case '-v':
      displayNameVersion(); // display name and version
      break;
    case '-h':
      displayManual(); // display guide
      break;
    case '-i':
      fileParser = new FileParser(args);
      fileParser.processInput(); // process input file
      break;
    case '-c':
      fileParser = new FileParser(args);
      fileParser.processConfig(); // process config file
      break;
    default:
      handleImproperUsage();
  }
};

export default { dispatch, handleImproperUsage };
