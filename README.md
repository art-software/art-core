# Art Framework
Art framework is a client side toolkit. 

Art framework aims to provide you a ready to use client side project development enviorment, packages of art framework encapsulate complex details, do dirty works for you, keeping you focus on your own code development.

## Introduction
Art framework is a toolkit containing a set of packages supporting different kinds client side application development.
- Single Page Application (SPA)
- Server Side Rendering (SSR) Appliction (TODO)
- Tencent Wechat Miniprogram (Under development) 

Art framework provides art cli tool helping developer easily scaffolding application, jumping into detailed application code development quickly, without worrying about code compiling, packaging, deployment.

## Usage

### Single Page Application (SPA)
1. Prerequisite Local Enviorment
- make sure node.js installed

  node.js 8.x or higher perferred. 
  https://nodejs.org/en/download/

- make sure `yarn` or `npm` installed

  yarn:

  https://yarnpkg.com/en/docs/install

  
  npm:

  npm normal comes with node.js installation
  https://www.npmjs.com/get-npm


2. Install `art-cli-tool`

    Install `art-cli-tool` globally with yarn:
    ``` bash
    yarn global add art-cli-tool
    ```

    Install `art-cli-tool` globally with npm:
    ``` bash
    npm add art-cli-tool -g
    ```

    Check installed `art-cli-tool` version:
    ```
    art -v
    ```

3. Make a new directory as project root

    For example:
    ``` bash
    mkdir art-demo
    cd art-demo
    ```

4. Scaffolding new project

    ```
    art create project -s="react"
    ```