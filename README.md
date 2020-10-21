# Zowe (E)JES REST API Manager Sample Plug-in

This repository contains a CLI program that uses the (E)JES V6R0 REST API .  The plug-in and its components are *sample
programs* provided to aid and enhance your experience using our (E)JES product.
While you can install and/or examine the source code here, you will require a license from Phoenix Software International
to use the underlying REST API and the (E)JES product.

- [Zowe (E)JES REST API Manager Sample Plug-in](#zowe-(e)jes-rest-api-manager-sample-plug-in)
  - [Available CLIs](#available-clis)
  - [There is help for that...](#there-is-help-for-that)
  - [Documentation](#documentation)
  - [Project Goals](#project-goals)
  - [Prerequisites](#prerequisites)
  - [Installing the CLI using NPM (Recommended)](#installing-the-cli-using-npm)
  - [Profiles (Required)](#profiles)
  - [Create a Local Development Space](#create-a-local-development-space)
    - [Overview](#overview)
    - [Clone Zowe (E)JES CLI and Install](#clone-the-zowe-ejes-cli-and-install)
    - [Build the Zowe (E)JES CLI](#build-the-zowe-ejes-cli)
  - [Support](#support)

## Available CLIs

* Zowe EJES API - A thin layer CLI demonstrating the full (E)JES REST API by mapping the (E)JES REST API directly to options.  It returns JSON that can be used by Node.js or other scripting languages.
* Zowe EJES Batch Shell - A full featured workstation implementation of (E)JES Batch on the host.  Includes an enhanced meta command set to improve interactive use while still being suitable for workstation automation analogous to running EJES BATCH as a batch job on the host.
* Zowe EJES Issue - A simple CLI written to submit jobs or issue host system commands.
* Zowe EJES Log Stream - A one function CLI to display the operations or system log, with options to stream it continuously or to filter lines by using a find.  This CLI is written completely in Typescript and would provide a good starting point for your Typescript project using the (E)JES REST API since it leverages all the endpoints.
* Zowe EJES Query - A conventional CLI to automate data gathering from the host for users who do not need nor want to learn host (E)JES commands.

[(top)](#readme)

## There is help for that...

Use the `--help` option with Zowe to see the Zowe documentation for running each CLI.  There is different help at different levels, including examples.

* `zowe ejes --help`
* `zowe ejes batch --help`
* `zowe ejes batch status --help`

 Additionally, API, Batch, Issue, and Query provide *detailed* application specific help and usage information.  Use the `--helpApp` or `--ha` option for that.

* `zowe ejes batch status --helpApp`
* `zowe ejes batch status --ha meta` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(For meta-command specific help) 

You can also issue the **help** command in *Zowe EJES Batch* and use the argument *help* for any option in *Zowe EJES Query*.  Additionally,  you may use *list* for any argument in *Zowe EJES Query* to see the possible values for the argument. 


[(top)](#readme)

## Documentation

Use of Zowe and our CLIs is documented in chapter 11 of the *(E)JES Reference*.  If you plan to use the Zowe plug-in but do not plan to develop it, please use to the section titled [Installing the CLI using NPM](#installing-the-cli-using-npm) instead of [cloning the GitHub repository](#clone-the-zowe-(e)jes-cli-and-install) and either installing or building from there.
Summary information for using this repository for your own (E)JES project can at the end of this document.

[(top)](#readme)

## Project Goals

This project accomplishes the following goals to benefit Phoenix Software International customers:
* Provides scriptable functionality to access (E)JES on the host from the workstation.
* Uses Zowe CLI infrastructure (profiles and programmatic APIs) to provide secure access.
* Demonstrates the use of REST API programmming.
* Provides the greater Zowe community a Zowe Compliant example using Typescript modules and NPM modules.
  
[(top)](#readme)

## Prerequisites

* (E)JES V6R0 GA installed the host together with all current service.
* Workstation OS is up to date
* node
* npm
* zowe V1-LTS

Before you work with this plug-in, take a moment to ensure your operating system, node.js, and npm are up to date.

Next, if you haven't done so already, [install the Zowe CLI globally.](https://docs.zowe.org/stable/user-guide/cli-installcli.html)  If you have Zowe installed, be sure to upgrade to the latest V1-LTS release.

[(top)](#readme)

## Installing the CLI using NPM

Installing the CLI is the simpist and quickest way to be up and running with the Zowe (E)JES plugin.  Depending on whether or not npm is installed in a privileged location, you may require administrative priveleges.

1. `npm install -g @phoenixsoftware/ejes-cli`

2.  `zowe plugins install @phoenixsoftware/ejes-cli`

Optionally, to store all logon credentials contained in Zowe CLI profiles in an encrypted format:

3. `zowe plugins install @zowe/secure-credential-store-for-zowe-cli@zowe-v1-lts`

[(top)](#readme)

## Profiles

After installing the [using NPM](#installing-the-cli-using-npm) or from [GitHub](#clone-the-zowe-ejes-cli-and-install), you are *required* to create a profile into which to store your host credentials.  Here is a prototype you can copy/paste and modify.

`zowe profiles create ejes jes3 --protocol https --host yourhost.com --port 7554 --user myuid --password passw0rd --rejectUnauthorized true --basePath /api/v1/ejes3 --colorScheme dark --noColor off`

Once your profile is created, you can use the following command to test the installation and connection to the host.  Mind upper- and lowercasing as Zowe is sensitive to this, or just copy/paste.

`zowe ejes query st -V`

[(top)](#readme)

## Create a Local Development Space

The repository on GitHub contains all the materials for installing or building the project.

### Overview
To create your development space, clone and install the plug-in.  The repository contains a trans-compiled **/lib** folder from the current source in the repository.  This is so it can be immediately installed.

Create a local development folder named `zowe-psi`. You will clone and build the project in this folder.

Clone the repositories into your development folder to match the following structure:
```
zowe-psi
└── ejes-cli
```
### The Package Lock File

A *package-lock.json* file is installed with this project from GitHub.  This ensures that the same NPM packages installed when Phoenix Software built and *tested* this plug-in will be installed when you install the plug-in on your workstation.  

If removed, NPM will install up-to-date versions of NPM modules in the node_modules directory.  You might want to do this if you see any NPM module vulnerability warning when installing.  

No NPM modules were used to develop the (E)JES part of the plug-in.  However, the Zowe infrastructure upon which the plug-in is built uses NPM modules.  Additionally, the (E)JES API, Batch, and Query CLIs are provided *as* NPM modules (that do not themselves use NPM modules), thus the package-lock specifies the specific version built and tested, not the latest version.  For these reasons, you may decide to delete the provided package-lock.json file before running the *npm install* portion of the installation.  

### Clone the Zowe EJES CLI and Install

Please review the installation process in chapter 11 of the *(E)JES Reference*.  What follows is a summary of installing from the repository.  Depending on whether or not npm is installed in a privileged location, you may require administrative priveleges.  In steps 4 and 5, mind the trailing period.
1. `cd` to your `zowe-psi` folder
2. `git clone https://github.com/phoenixsoftware/ejes-cli`
3. `cd ejes-cli`
4. `npm install -g .`
5. `zowe plugins install .`

The plug-in is ready for use.  You will require a Zowe profile for (E)JES.  How to create on is detailed in [profiles](#profiles) above.

### Build the Zowe EJES CLI

Start Eclipse or VS Code.  Load the project.  Use the NPM script "build" to build after you have made changes.  Create your own git repository and configure it in your IDE.  

Zowe plug-in and CLI development is beyond the scope of this documentation.

[(top)](#readme)

## Support

The programs stored in this repository are "distributed sample programs" as defined in chapter 18 of the _(E)JES Reference_.  (E)JES customers may request support on a time-available basis by opening a new (E)JES Zowe case on the Phoenix Software International support portal.  This is preferable to opening issues or making pull-requests on the GitHub repository.

[(top)](#readme)