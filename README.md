# Siteit

[![GitHub contributors](https://badgen.net/github/contributors/SerpentBytes/siteit)](https://GitHub.com/SerpentBytes/siteit/graphs/contributors/)
[![GitHub issues](https://badgen.net/github/issues/SerpentBytes/siteit/)](https://GitHub.com/SerpentBytes/siteit/issues/)
[![GitHub open-pull-requests](https://badgen.net/github/open-prs/SerpentBytes/siteit)](https://github.com/SerpentBytes/siteit/pulls?q=is%3Aopen)
[![GitHub pull-requests merged](https://badgen.net/github/merged-prs/SerpentBytes/siteit)](https://github.com/SerpentBytes/siteit/pulls?q=is%3Amerged)
[![Github version](https://img.shields.io/github/package-json/v/SerpentBytes/siteit/master?color=green&label=version)](https://github.com/SerpentBytes/siteit)

## About

Siteit allows users to convert text files into `.html` pages. Presently, Siteit supports input files in `.txt` and `.md` formats.

## Installation

-   Use the command `git clone` to `clone` the repo to your local machine
-   `cd` into the cloned directory, and run `npm install` to install all the dependencies
-   Run `npm link` to run Siteit locally on your machine
-   Run `npm start` to start Siteit

## Features

Siteit comes with its built-in stylesheet and supports various screen resolutions. When a folder with `.txt` or `.md` files is supplied,
an `Index` file is also generated in the `dist` folder, linking to all generated files.

## Usage
| Command |       Option/Flag       |  Additional Argument(s)  |                                                                                             Description                                                                                             |
| :-----: | :---------------------: | :----------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| siteit  | **-v** or **--version** |           n/a            |                                                                             Displays tool name and version information                                                                              |
| siteit  |  **-h** or **--help**   |           n/a            |                                                                                        Display usage manual                                                                                         |
| siteit  |  **-i** or **--input**  | \_./filename.(txt or md) |                 Converts the file's content supplied as an additional argument into a `.html` document. To locate the generated file, `cd` into the application's `dist` directory                  |
| siteit  |  **-i** or **--input**  |      _./directory_       | Converts all the files within a directory supplied as additional argument into `.html` documents. To locate the generated files, `cd` into the application's `dist` directory and open `index.html` |

Usage format: siteit **[option/flag]** _[additional arguments]_

If the user is on **Windows** and are unable to run the tool using the aforementioned _usage format_, follow these steps:

#### Recommended Approach
- Use `node` command prefix to run the app as follows:
  - **node** ./build/index.js -v

#### Not Recommended Approach

-   Using PowerShell in _Admin Mode_, run the following command to bypass PowerShell's Execution Policy
    -   For temporary bypass run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`
    -   For permanent bypass _(not recommended)_ run: `Set-ExecutionPolicy -Scope LocalMachine -ExecutionPolicy Unrestricted.`

## Markdown files handling

Siteit **fully** supports the following markdown features:

| name            | syntax       | output             |
| --------------- | ------------ | -------------------- |
| Bold text       | `**Some bold Text**`   | `<strong>Some bold text<strong/>` |
| "      | `__Some bold text__`   | `<strong>Some bold text<strong/>` |
| Italic text     | `*Some italic text*`    | `<em>Some italic text</em>` |
| "    | `_Some italic text_`    | `<em>Some italic text</em>` |
| Deleted text     | `~~Some deleted text~~`    | `<del>Some italic text</del>` |
| Marked text     | `==Some marked text==`    | `<mark>Some italic text</mark>` |
| Inline Code            | `` `Some inline code` `` | `<code>Some inline code</code>`   |
| Horizontal rule | `___`        | `<hr />`                |
| "                | `***`        | `<hr />`               |
| Heading 1         | `# Heading` | `<h1>Heading</h1>`     |

**As of recent commit additional markdown features are supported with inconsistent CSS styling. Full support will be _officially_ introduced in subsequent commits**

---
## Contributing
If you are interested in contributing code to Siteit, see our contribution guidelines [here](./CONTRIBUTING.md).