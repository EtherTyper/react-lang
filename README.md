# react-lang
### A React renderer to real programs!

DO YOU CONSIDER YOURSELF A MASTER PROGRAMMER? BUT ARE YOU DISCOURAGED BY THE FACT THAT YOU ONLY KNOW BASIC HTML? WELL THAN I HAVE THE PROJECT FOR YOU! NOW YOU CAN, WITH THE SIMPLE, CONCISE, AND FAMILIAR SYNTAX OF JSX, YOU CAN CODE JS CONSTRUCTS LIKE:

<details>
<summary>FOR LOOPS</summary>

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

<details>
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

######

Stuff in the `src` folder is being actively worked on. You can see my progress [here](./spec.md).

### Mr. Rosier: Yes, this is Eli Bradley's project. Please click on the username.

This is a project for my Computer Science class, so it would be best if you could hold your contributions until I submit what code I have, just to make it more convenient to trace the origin of the code. I also am having some organization issues because of all the dead code and different approaches I attempted to creating the application. However, feel free to tell me suggestions and what you intend to contribute later through GitHub Issues!
