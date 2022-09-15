# Siteit

## About
Siteit allows users to convert text files into `.html` page. Presently, Siteit only supports input files with `.txt` format. 

## Installation

- Use the command `git clone` to `clone` the repo to your local machine
- `cd` into the cloned directory, and run `npm install` to install all the dependencies
- Run `npm link` to run Siteit locally on your machine
  
## Usage

| Command | Option/Flag | Additional Argument(s) | Description |
| :---: | :---: | :---: | :---: |
| siteit | **-v** or **--version** | n/a | Displays tools name and version information|
| siteit | **-h** or **--help** | n/a | Display usage manual|
| siteit | **-i** or **--input** | _./filename.txt_ | Converts the content of the file supplied as additional argument into an `.html` document. To locate the generated file, `cd` into application's `dist` directory|
| siteit | **-i** or **--input** | _./directory_| **_Yet to be implemented_** |

Usage format: siteit **[option/flag]** _[additional arguments]_

If you are on **Windows** and are unable to run the tool using the aforementioned _usage format_, follow these steps:

#### Recommended Approach
- Use `node` command prefix to run the app as follows:
  - **node** ./siteit -h 

#### Not Recommended Approach
- Using PowerShell in *Admin Mode*, run the following command to bypass PowerShell's Execution Policy
  - For temporary bypass run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
  - For permanent bypass _(not recommended)_ run: `Set-ExecutionPolicy -Scope LocalMachine -ExecutionPolicy Unrestricted`
