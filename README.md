# react-lang
### A React renderer to real programs!

DO YOU CONSIDER YOURSELF A MASTER PROGRAMMER? BUT ARE YOU DISCOURAGED BY THE FACT THAT YOU ONLY KNOW BASIC HTML? WELL THAN I HAVE THE PROJECT FOR YOU! NOW, WITH THE SIMPLE, CONCISE, AND FAMILIAR SYNTAX OF JSX, YOU CAN EASILY PROGRAM JAVASCRIPT CONSTRUCTS LIKE:

-   <details>
    <summary>LOOPS</summary>

    ```jsx
    <for init={
        <variableDeclaration>
            <variableDeclarator>
                <identifier>i</identifier>
                {0}
            </variableDeclarator>
        </variableDeclaration>
    }

    test={
        <binary operator="<=">
            <identifier>i</identifier>
            {10}
        </binary>
    }

    update={
        <update operator="++" prefix={false}>
            <identifier>i</identifier>
        </update>
    }>
        <expressionStatement>
            <call>
                <identifier>sayHello</identifier>
            </call>
        </expressionStatement>
    </for>
    ```

    COMPILES DOWN TO

    ```js
    for (let i = 0; i <= 10; i++) sayHello();
    ```
    </details>
-   <details>
    <summary>CLASSES</summary>

    ```jsx
    <classDeclaration id={<identifier>Greeter</identifier>} superClass={<identifier>AbstractGreeter</identifier>}>
        <decorator>
            <identifier>
                greetable
            </identifier>
        </decorator>
        <classBody>
            <classMethod id={<identifier>constructor</identifier>} generator={true} kind="constructor" params={
                [
                    <arrayPattern>
                        <identifier>hello</identifier>
                        <identifier>world</identifier>
                        <identifier>object</identifier>
                    </arrayPattern>
                ]
            }>
                <decorator>
                    <identifier>
                        greetable
                    </identifier>
                </decorator>
                <identifier>constructor</identifier>
                <block>
                    <debugger />
                </block>
            </classMethod>
            <classMethod id={<identifier>helloWorld</identifier>} computed={true} static={true} async={true} kind="get" params={
                [
                    <arrayPattern>
                        <identifier>hello</identifier>
                        <identifier>world</identifier>
                        <identifier>object</identifier>
                    </arrayPattern>
                ]
            }>
                <decorator>
                    <identifier>
                        greetable
                    </identifier>
                </decorator>
                <identifier>helloWorld</identifier>
                <block>
                    <debugger />
                </block>
            </classMethod>
            <classProperty static={true} computed={true}>
                <identifier>hello</identifier>
                <identifier>world</identifier>
            </classProperty>
        </classBody>
    </classDeclaration>
    ```

    COMPILES DOWN TO

    ```js
    @greetable
    class Greeter extends AbstractGreeter {
      @greetable
      *constructor([hello, world, object]) {
        debugger;
      }

      @greetable
      static get async [helloWorld]([hello, world, object]) {
        debugger;
      }

      static [hello] = world;
    }
    ```
    </details>
-   <details>
    <summary>FUNCTIONS</summary>
    
    ```jsx
    <arrowFunction id={<identifier>helloWorld</identifier>} async={true} params={
        [
            <arrayPattern>
                <identifier>hello</identifier>
                <identifier>world</identifier>
                <identifier>object</identifier>
            </arrayPattern>
        ]
    }>
        <block>
            <debugger />
        </block>
    </arrowFunction>
    ```

    COMPILES DOWN TO

    ```js
    async ([hello, world, object]) => {
      debugger;
    }
    ```
    </details>
-   <details>
    <summary>OBJECTS</summary>
    
    ```jsx
    <objectExpression>
        <objectProperty shorthand={true}>
            <identifier>hello</identifier>
        </objectProperty>
        <objectProperty computed={true}>
            <decorator>
                <identifier>
                    greetable
                </identifier>
            </decorator>
            <identifier>hello</identifier>
            <identifier>world</identifier>
        </objectProperty>
        <objectMethod computed={true} id={<identifier>helloWorld</identifier>} generator={true} async={true} kind="set" params={
            [
                <arrayPattern>
                    <identifier>hello</identifier>
                    <identifier>world</identifier>
                    <identifier>object</identifier>
                </arrayPattern>
            ]
        }>
            <decorator>
                <identifier>
                    greetable
                </identifier>
            </decorator>
            <identifier>hello</identifier>
            <block>
                <debugger />
            </block>
        </objectMethod>
        <spread>
            <identifier>toExtend</identifier>
        </spread>
    </objectExpression>
    ```

    COMPILES DOWN TO

    ```js
    {
      hello,
      @greetable
      [hello]: world,

      @greetable
      set async [hello]([hello, world, object]) {
        debugger;
      },

      ...toExtend
    }
    ```
    </details>
-   [AND](https://ethertyper.github.io/react-lang/test.html) [MORE](./src/test.js)

Stuff in the `src` folder is being actively worked on. You can see my progress [here](./spec.md).

### Mr. Rosier: Yes, this is Eli Bradley's project. Please click on the username.

This is a project for my Computer Science class, so it would be best if you could hold your contributions until I submit what code I have, just to make it more convenient to trace the origin of the code. I also am having some organization issues because of all the dead code and different approaches I attempted to creating the application. However, feel free to tell me suggestions and what you intend to contribute later through GitHub Issues!
