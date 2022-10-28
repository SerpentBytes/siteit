# Siteit
[![GitHub contributors](https://badgen.net/github/contributors/SerpentBytes/siteit)](https://GitHub.com/SerpentBytes/siteit/graphs/contributors/)
[![GitHub issues](https://badgen.net/github/issues/SerpentBytes/siteit/)](https://GitHub.com/SerpentBytes/siteit/issues/)
[![GitHub open-pull-requests](https://badgen.net/github/open-prs/SerpentBytes/siteit)](https://github.com/SerpentBytes/siteit/pulls?q=is%3Aopen)
[![GitHub pull-requests merged](https://badgen.net/github/merged-prs/SerpentBytes/siteit)](https://github.com/SerpentBytes/siteit/pulls?q=is%3Amerged)
[![Github version](https://img.shields.io/github/package-json/v/SerpentBytes/siteit/master?color=green&label=version)](https://github.com/SerpentBytes/siteit)

## About
Siteit allows users to convert text files into `.html` pages. Presently, Siteit supports input files in `.txt` and `.md` formats. 

## Installation

- Use the command `git clone` to `clone` the repo to your local machine
- `cd` into the cloned directory, and run `npm install` to install all the dependencies
- Run `npm link` to make `siteit` command executable
- Run `npm start`to build and start `siteit`

## Features

Siteit comes with its built-in stylesheet and supports various screen resolutions. When a folder with `.txt` or `.md` files is supplied, 
an `Index` file is also generated in the `dist` folder, linking to all generated files.  
  
## Usage

| Command | Option/Flag | Additional Argument(s) | Description |
| :---: | :---: | :---: | :---: |
| siteit | **-v** or **--version** | n/a | Displays tool name and version information|
| siteit | **-h** or **--help** | n/a | Display usage manual|
| siteit | **-i** or **--input** | _./filename.(txt or md)_ | Converts the file's content supplied as an additional argument into a `.html` document. To locate the generated file, `cd` into the application's `dist` directory|
| siteit | **-i** or **--input** | _./directory_| Converts all the files within a directory supplied as additional argument into `.html` documents. To locate the generated files, `cd` into the application's `dist` directory and open `index.html`|
| siteit | **-c** or **--config** | _./filename.json_ | Uses the `json` format configuration file to generate `.html` documents

Usage format: siteit **[option/flag]** _[additional arguments]_

If the user is on **Windows** and are unable to run the tool using the aforementioned _usage format_, follow these steps:

#### Recommended Approach
- Use `node` command prefix to run the app as follows:
  - **node** ./build/index.js -v

#### Not Recommended Approach
- Using PowerShell in *Admin Mode*, run the following command to bypass PowerShell's Execution Policy
  - For temporary bypass run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
  - For permanent bypass _(not recommended)_ run: `Set-ExecutionPolicy -Scope LocalMachine -ExecutionPolicy Unrestricted.`

## Markdown files handling
Siteit also supports handling markdown files with following supported features: 

| name        | syntax     | example                |
|-------------|------------|------------------------|
| Bold text   | `**text**` | `**Some Bold Text**`   |
| Italic text | `*text* `  | `*Some Italic Text*` |
| Code	      | `` `text` `` | `` `Some code` ``   |
| Horizontal rule | `---` | `---` |
