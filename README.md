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

  npm normally comes with node.js installation
  https://www.npmjs.com/get-npm


2. Install `art-cli-tool`

    Install `art-cli-tool` globally with yarn:
    ``` bash
    yarn global add art-cli-tool
    ```

    Or:
    
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

    Art framework is frontend library agnostic, it's able to support most of common frontend libraries, like React, Vue, Angular and etc, with some easy extensions to `art-webpack`.
    
    Currently, Art framework SPA developemnt toolkit supports **React + Typescript** out of the box.

    ```
    art create project -s="react"
    ```

    Art cli tool will display several questions after you typed above command:

    - `project name`. Default is your directory name.

      It will be set as `package.json` `name` property.

    - `project desc`. Default is empty string.
    
      It will be set as `package.json` `description` property.

    - `project virtual path`. Default is empty string.

      Virtual path will be added to compiled code path.

      For example: module path is `h5/home`, project virtual path is `app/react`, the final compiled code will be stored at path `app/react/h5/home`.

    - `module name`. Default is empty string.
    
      The first module name. Supporting both single and multiple level module path. For example: `home` and `campaign/201812/christmas`.

    - `What scaffold do you want to choice`

      Select perferred scaffold type. Currently only `react/h5` scaffold avaliable.

    After answering above questions, Art framework will automaticlly generate the initial ready to use project code.

5. Install SPA related art packages
    
    With yarn:
    ``` bash
    yarn add art-lib-common art-lib-react art-lib-utils art-server-mock art-webpack
    ```

    Or:
    
    With npm:
    ``` bash
    npm install art-lib-common art-lib-react art-lib-utils art-server-mock art-webpack
    ```

6. Server module

    After initial scaffold code generation, the first module is ready to write code.

    ``` bash
    art serve -m "home"
    ```

7. Configure `art.config.js`

    Replacing `webpack.output.intePublicPath`, `webpack.output.prodPublicPath` with actual integrate testing environment url and production environment url.

    Giving `dll.version` a meaningful version string, for example: '20190522_v1'.

8. Generate dll file

    ```bash
    art dll
    ```

    If dll file has been generated before and no new changes done to dll config, there is no need to generate dll file again.

9. Configure module template file

    For example, `art.config.js` `projectVirtualPath` is `app/react` and `dll.version` is `20190522_v1`, module template file dll file path should be:

    ``` html
    <script type="text/javascript" src="<%= htmlWebpackPlugin.options.publicPath %>app/react/vendors/20190522_v1/art_framework.20190522_v1.js"></script>
    ```

10. Build module

    When local module development fininshed, building source code.
    ```bash
    art build -m "campaign/201812/christmas"
    ```

    A notice `please chioce one environment to build` will display, choicing `Integrate Testing` or `Production`, built files will be placed under `debug` or `public` directory respectively.


11. Publish module

    ```bash
    art publish -m "campaign/201812/christmas"
    ```