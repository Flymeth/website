---
name: Flylang
description: Création de mon propre langage de programmation
bannerURL: /cdn/projects/flylang/compiler.jpeg
iconURL: /cdn/projects/flylang/flylang.ico
github: https://github.com/Flymeth/flylang-src
link: https://github.com/Flymeth/flylang-src/releases/tag/v0.0.9-alpha
tags:
- language
- system
- programation
- programming-language
---

# Flylang : my first programing language

Since I'm coding, I always wanted to create my own programing language. And it's what I did, using nodejs (yes that's not the best way to create a language but I don't care) I created the programing language of my dream. Here is all the informations about it :

![Logo](/cdn/projects/flylang/flylang.ico)
![Compiler](/cdn/projects/flylang/compiler.jpeg)
![Scoped Returns](/cdn/projects/flylang/scoped_returns.jpeg)

> Note: The following content comes from the documentation about the language (the syntax, native functions, etc...).

## Flylang commands

This document will show you the possibilities behind the `flylang` shell.

```bash
flylang # Starts the "in-console" mode -> See the "in-console mode" section for more informations

flylang --info # Diplays the language's informations
flylang --changelog # Diplays the current/previous changes of the flylang interpreter
flylang --help # Diplays this message
flylang --syntax # Diplays informations about the language's syntax
flylang --props # Diplays the current flylang interpreter behaviors' value

flylang <file in> # Runs the file located at the given path

# Commands bellow is for compile your code into another language. Please note that may not work as it is not the first priority of the language
flylang <file in> <file out>.py --langOutput=python  # Parses the file located at the first given path and try to compile it in python code and save the result in the second given path

flylang <file in> <file out>.txt --langOutput=debugger [--debugJsonFile=<fichier>.json] # Debugger mode
```

### In console mode

`In console mode` starts a new shell session where you can input your code directly inside the console.
To exit the session, simply type `//exit` or press `CTRL` (or `CMD`) + `C`.

#### Commands

In console mode, you can type some custom command to make custom things.
Here are the valable commands:

- `//help` Displays the console mode commands
- `//clear` Clears the console mode terminal
- `//exit` Exits the console mode

## Syntax

## Comments

To make a comment (= text that the interpreter will not care about), place your text between two `|` like so:

```1c
|This is a cool comment|
...
```

Or if you want to comment a hole line, place your comment just after the `||` caracters like bellow:

```1c1c
6 * 2 || Comment to inform you that 6 * 2 should returns 12
```

## Types

Because flylang is a high-level programming language, it has a lot of type. Here are them:

| name                       | syntax                                                  |
| -------------------------- | ------------------------------------------------------- |
| number                     | `25` - `.165` - `65_41`                                 |
| string                     | `"hello"` - `'bonjour'` - `"result of 2 + 3: &(2 + 3)"` |
| array (list of datas)      | `{}` - `{"hello", 15, "hello" + 5}`                     |
| object (list of key/datas) | `{:}` - `{"answer": 15 * 9}`                            |

## Variables

To declare a variable, just write `<variable_name>: <variable_value>`.
You can also make a variable as a constant by doubleing the `:` character (`<variable_name>:: <variable_value>`).
Finaly, you can easily make operation with your variable as the operand, and the result storer by placing the operation symbol just before the `:` character(s).
> NB: To access to a variable value, just type the variable's name.

```1c
my_var: 15
my_var2:: 3

if(my_var2,
    my_var-: my_var2
)
```

## Functions

Functions are a way to execute more than once a bit of code, and are the most basic element after variables of programation.
To declare a function in `flylang` just type `fn <name_of_your_function>(<arg1>, <arg2>, ..., <function's_code>)`.
Then, to call the function just write `<name_of_your_declared_function>(<arg1>, <arg2>, ...)`.
Note that you can stop the function's code execution (and return a value) by using the `return` keyword.

```1c
fn add2Numbers(nb1, nb2,
    return nb1 + nb2
)
myage: add2Numbers(17, 1)
```

### Vanilla Functions

| name   | arguments                              | description                                                                                                                                                                                                                                                                      |
| ------ | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clone  | `<type>`                               | Clone the object and returns it                                                                                                                                                                                                                                                  |
| range  | `<number>`, (`<number>`, (`<number>`)) | Make a list of number that starts at the first argument and ends at the second with a step of the third argument. (note that if the second argument isn't set, the list will start at 0 and will go automatically to the first argument. By default, the step argument is at 1). |
| typeof | `<type>`                               | Returns a string containing the type of the given object                                                                                                                                                                                                                         |
| eval   | `<expression>`                         | Returns the processed value of the given expression                                                                                                                                                                                                                              |

## Operations

### Symbols

| symbol | description                |
|:------:|:--------------------------:|
| \+     | addition                   |
| \-     | substraction               |
| \*     | multiplication             |
| \*\*   | power                      |
| /      | division                   |
| %      | euclidian division's rest  |
| //     | euclidian division's value |

### Usage

| operation                  | valid operand type                                                                                                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| addition                   | `<string> + <string>` - `<list> + <list>` *(cancats the two `<list>` objects)* - `<string> + <number>` - `<number> + <number>`                      |
| substraction               | `<number> - <number>`                                                                                                                               |
| multiplication             | `<string> * <number>` *(repeat the `<string>` `<number>` times)* - `<list> * <number>` *(repeat `<list>` `<number>` times)* - `<number> * <number>` |
| power                      | `<number> ** <number>`                                                                                                                              |
| division                   | `<number> / <number>`                                                                                                                               |
| euclidian division's rest  | `<number> % <number>`                                                                                                                               |
| euclidian division's value | `<number> // <number>`                                                                                                                              |

## Boolean

### Tests

| symbol     | a is **...** to b |
| ---------- | ----------------- |
| a **=** b  | equal             |
| a **>=** b | greater or equal  |
| a **>** b  | greater           |
| a **<=** b | lower or equal    |
| a **<** b  | lower             |

*NB: you can inverse the operation by placing a `!` symbol before the operation's symbol*

### Tests regroupments

| symbol    | a **...** b is true |
| --------- | ------------------- |
| a **&** b | and                 |
| a **?** b | or                  |
| a **^** b | nand                |
| a **~** b | nor                 |
| a **!** b | xor                 |

## Priorities

Some times you could need a priority, like for exemple if you want to multiply by `3` the result of `2 + 6`. In this case you can't just type `3 * 2 + 6` because the flylang parser will takes in priority `3 * 2` and then add to this result `6` (it's just maths calculation priorities).
So, to create priorities you can type inside parentheses the most important operation. In the exemple's case, you'll write `3 * (2 + 6)`.
Priorities works pretty much everywhere: operations, boolean tests, ...

## If statements

```1c
if(<condition>,
    <code to execute if condition is true>
)else if(<condition 2>,
    <code to execute if condition2 is true (and <condition> is false)>
)else (
    <code to execute if none of the 2 conditions above is true>
)
```

> *You can repeat this schema as many times you want*
> *Please note that variable declared inside if_statement will not be accessible outside this if_statement*

## Loops

### For loop

```1c
for(<iterable>, value?, index?,
    <...>
)
```

### While loop

```1c
while(<condition>,
    <repeat while the given condition is true>
)
```

### Until loop

```1c
until(<condition>,
    <repeat while the given condition is false>
)
```

## Try

If you want to avoid error raising, you can put your code into a `try` statement and handle the error result (if there is any) with a `else` like bellow:

```1c
try(
    || We cannot additionate a number with a string
    std.out(9 + "hello")
)else (err, || The "err" argument is string (or unset if the err comes from the language code)
    std.out("An error has come!")
)
```

## Import statement

***!!** This feature is at this point a beta one. It may not work*
This feature import flylang's code from another file or import a module's features.

```1c
import <module / file path> [only (import1, import2, ...)] [in <variable name>]
\-------------------------/ \----------------------------/ \------------------/
    Import all module           Import only the given        Set the imported
        data                            data                data into a variable
```

### Builtin modules

#### Maths

`import maths ...`
This module countain variables/functions tool related to mathematics

##### Maths - Variables

| name | description  |
| ---- | ------------ |
| pi   | The PI value |

##### Maths - Functions

| name      | description                                    | argument(s)    |
| --------- | ---------------------------------------------- | -------------- |
| cos       | Calculate the cosine of a number               | `number`       |
| sin       | Calculate the sine of a number                 | `number`       |
| tan       | Calculate the tangent of a number              | `number`       |
| factorial | Calculate the factorial of a number (number!)  | `number`       |
| sqrt      | Calculate the square root of a positive number | `number` (> 0) |
| exp       | Calculate the exponential of a number          | `number`       |

#### Process

`import process ...`
This module countain variables/functions tool related to the os processes

##### Process - Functions

| name  | description                | argument(s) |
| ----- | -------------------------- | ----------- |
| fetch | Fetch a process by its PID | `number`    |

##### Process - Objects

| name    | description         | attribute(s)                    |
| ------- | ------------------- | ------------------------------- |
| current | The current process | `pid`; `ppid`; `name`; `kill()` |

#### Random

`import process ...`
This module countain variables/functions tool related to the os processes

##### Random - Variables

| name | description                   |
| ---- | ----------------------------- |
| now  | Random number between 0 and 1 |

##### Random - Functions

| name      | description                                         | argument(s) |
| --------- | --------------------------------------------------- | ----------- |
| ranged    | Returns a random number between a range of numbers  | `number` *2 |
| rangedInt | Returns a random integer between a range of numbers | `number` *2 |

## Classes

```1c
cs Myclass(
    fn(arg1, arg2,
        || This is the constructor
        me.arg1: arg1
        me.arg2: arg2
    ),

    fn printArg1(
        return std.out(me.arg1)
    )
    fn printArg2(
        return std.out(me.arg2)
    )

    myProperty: 20
)

cs Subclass(Myclass,
    fn(
        |
            This is again the constructor
            the code bellow instanciate the parent class of this one
        |
        Myclass(15, "hello")
    ),

    fn printArg(argNB,
        return (
            if(argNB = 1, me.printArg1)else (me.printArg2)
        )()
    )
)

my_class:: new Subclass()

my_class.printArg(2) || Should print "hello" to the console
```
