# (E)JES plug-in for Zowe CLI

The (E)JES Zowe Command Line Interface Plug-In (CLI) provides options to display and search the mainframe syslog or operlog from a Windows, MacOS or Linux command line.

## Prerequisites

Your workstation should have node.js installed before installing the CLI. Specific requirements are defined at:

https://docs.zowe.org/stable/user-guide/systemrequirements.html#zowe-cli-requirements-client

The Zowe CLI base component must be installed on your workstation before the (E)JES CLI can be installed. Instructions for downloading and installing the Zowe CLI base can be found at:

https://docs.zowe.org/stable/user-guide/cli-installcli.html.

## Installing the CLI using NPM

The CLI is available as an NPM module. To Install:

1. Enter the command `npm install -g @phoenixsoftware/ejes-cli` to add the CLI to your computer's global NPM repository.

2. Enter the command `zowe plugins install @phoenixsoftware/ejes-cli` to install the (E)JES plug-in into your local copy of the Zowe CLI base.

3. Optionally, enter the command `zowe plugins install @zowe/secure-credential-store-for-zowe-cli@zowe-v1-lts` to install Zowe's Secure Credential Store. This will allow logon credentials contained in CLI profiles to be stored in a secure, encrypted format.

## Installing the CLI from GitHub

### Acquiring the CLI

The CLI can be downloaded from GitHub. Select a convenient directory and issue the command:

`git clone https://github.com/phoenixsoftware/ejes-cli`

After the command completes, the child directory "ejes-cli" will contain the CLI project directory.

### Building the CLI

Detailed instructions on how to build and install Zowe command-line plug-ins can be found at:

docs.zowe.org/stable/extend/extend-cli/cli-setting-up.html

Summarizing specifically for the (E)JES plug-in:

1. cd to the "ejes-cli" folder created in the previous section.

4. Run the command `npm run install-plugin`. This command will perform a number of separate build steps "under the covers" by invoking the commands:

    * `npm install` to download any additional node.js modules required to complete the build process.

    * `npm run build` to perform the actual build process.

    * `zowe plugins install .` installs the (E)JES plug-in into your local copy of the Zowe CLI base.


## Running the CLI

Because the (E)JES CLI functions as a plug-in to the Zowe CLI base, it inherits usage and syntax from Zowe. In particular, (E)JES CLI fully supports the "—help" option. For example:

`zowe ejes –help`

currently supports one command group "log" and a single command "stream":

`zowe ejes log stream [--find text [--first|--last|--all]] | [--help]`

Without any options, the command displays the syslog or operlog.

Options:

`--find` searches the log for instances of text.

`--first` searches for the first (and subsequent) instances of text.

`--last` searches for the last instance of text.

`--all` searches for all instances of text.

`--help` displays information about all available options

## Support

Primary support for the CLI is provided through the the CLI's GitHub repository "Issues".

Additional support can be obtained by opening a Case at the Phoenix Software International web site:

https://phoenixsoftware.com/support_request.htm