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
    <arrowFunction async={true} params={
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
    
[AND MORE!](https://ethertyper.github.io/react-lang/test.html)

Stuff in the `src` folder is being actively worked on. You can see my progress [here](./spec.md).

### Mr. Rosier: Yes, this is Eli Bradley's project. Please click on the username.

All contributions are welcome, as long as you want to license your contributions under the same Apache 2.0 license!
