/* This file contains helper functions print coloured output
to the terminal  */

import pJson from '../package.json' assert { type: 'json' };
import colorize from './cli-colorizer.js';

/* This function calls colorize function to provides styling for
the command name for display purposes. If the executable command
is updated in package.json files, the changes would automatically
be reflected */
export const cmd = () => colorize('cmd', Object.keys(pJson.bin));

/* This function calls colorize function styles
the options for display purposes */
export const flag = (value) => colorize('flg', value);

/* This function calls colorize function to style
the source (file/directory) for display purposes */
export const src = (value) => colorize('src', value);

/* This function calls colorize function to style
the headings for display purposes */
export const hdg = (value) => colorize('h', value);

/* This function calls colorize function to colour code
error messages for display purposes */
export const err = (value) => colorize('err', value);

/* This function calls colorize function to colour code
success messages for display purposes */
export const success = (value) => colorize('success', value);

/* This function calls colorize function to colour code
messages in yellow colour for display purposes */
export const secondary = (value) => colorize('secondary', value);

export default { cmd, flag, src, hdg, err, success, secondary };
