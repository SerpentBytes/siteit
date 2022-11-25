# Contributing to Siteit

Thank you for showing interest in contributing to Siteit.

 We encourage all sorts of contributions, whether your changes improve the source code or enhance the documentation. Please read [Table of Contents](#table-of-contents) to get started.

 ---

## Table of Contents
- [Code Contribution](#code-contribution)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Improving the Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
- [Commit Messages](#commit-messages)

---

### Code Contribution
This section is to help developers set up Siteit locally on their machines for development.

#### Getting Started

#### Pre-requisites

Make sure you have the following technologies installed on your machine:
- [Node](https://nodejs.org/en/download/)current LTS version.
- [npm](https://docs.npmjs.com/about-npm#use-npm-to---) current release.

An easy to way to test if you already have the above technologies installed is by running the following commands:
```node
node -v
npm -v
```
If you have `node` and `npm` installed, the above commands will print the installed `version` information.

_If you get an error message, please install the missing technology._

**Note**:
We recommend installing the [current LTS version of [`node`](https://nodejs.org/en/download/) for your operating system to test and develop Siteit without complications.

#### Getting Started
- [`fork`](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the Siteit on Github.
- Use `git clone` to `clone` the forked repo to your local machine
- `cd` into the cloned directory, and create a new `branch` for your changes.
- Run `npm link` to run Siteit locally on your machine
- Run `npm start` to start Siteit

##### About `npm start`
This script builds the source code using `babel`, and starts an instance of `siteit` on your machine.

#### Making Changes
*Note:*
- Make all your changes in a new `git` `branch`. Learn more about creating branches [here](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- Make changes only in the `src` folder

To run Siteit locally with changes you introduced to the source code, you need to run the following script:
```node
npm run build
```
Running the above script will compile the code using `babel` and output in the `build` folder.

_Modify the files in `src` folder, as files within the `build` folder are overwritten when the source code is compiled using `babel`._

##### Starting the Project
 Assuming you ran the `npm link` previously as instructed, run `npm run start` to start Siteit locally. Alternatively, you can start the project by running `node ./build/index.js` from the command line.

##### Statically Generated Content
If you ran the tool using options that accepts a `source` as an `argument`, the rendered HTML will can be found in the `dist` under `root`.

#### Formatting and Error Checking
Frequently check your code for formatting and other problems using the following commands:

`npm run prettier:check`
Running the above script will run tests to check for formatting errors in the `src` folder, using `prettier`.

`npm run lint`
Running the above script will run tests to check for problems in the code using `ESLint`.

---

To automatically apply the changes detected by using `prettier` and `ESLint`, use the following scripts:

```node
npm run prettier:format
npm run lint:fix
```

---

**Note:**
If you push changes without running checks for formatting and problems in code, the `husky` `pre-commit` `hook` will automatically apply the changes before pushing your changes remotely to GitHub.

#### Running Tests
Siteit currently supports initial testing for functionality using `jest`

To  run tests your `jest`, execute the following `script`:
 `npm test`

### Reporting Bugs
_WIP_
### Suggesting Enhancements
_WIP_
### Improving the Documentation
_WIP_
### Styleguides
_WIP_
### Commit Messages
_WIP_