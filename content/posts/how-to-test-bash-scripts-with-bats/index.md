---
title: "Bash Script Testing with Bats: Complete Beginner's Guide"
url: /bash-script-testing-with-bats
description: "Learn how to test Bash scripts using Bats framework. Step-by-step tutorial with examples, assertions, and best practices for automated Bash testing."
tags: 
    - bash
    - testing
    - bats
categories: [bash, testing]
toc: true
date: 2025-10-25T12:55:12+02:00
---

One of the pillars of programming is testing the code. Most of the time, I wrote simple bash scripts without tests(bruh, but why waste time writing tests for couple of lines, right?). 

But recently I started developing a Go app with bash support, so it's time to explore testing suites for bash.

![Bats Logo](/images/blog/aa4xi5.jpg)

I found BATS (Bash Automated Testing System) and I think I don't need to look further. It is simple to understand, with support for assertions, custom helpers, and more.

So, in this article, I will show you how to test a simple bash script function.

## Installation

Ok, let's start by installing Bats. 

You can install it using Git. 

Run the following commands in your terminal:

```Bash
git clone https://github.com/bats-core/bats-core.git
cd bats-core
./install.sh /usr/local
```

For other ways to install Bats(Windows, MacOS, etc.), refer to the [official Bats documentation](https://bats-core.readthedocs.io/en/stable/installation.html).

## Sample Code

Let's create a simple Bash function that we will test using Bats. 

Save the following code in a file named `script.sh`:

The following Bash script defines a function that wraps a given string in HTML tags. For example, calling `wrap_in_tag "p" "Hello"` should return `<p>Hello</p>`.

```bash
#!/bin/bash

wrap_in_tag() {
    if [ -z "$1" ] || [ -z "$2" ]; then
        echo "Usage: $0 <tag> <content>"
        return 1
    else
        echo "<$1>$2</$1>"
    fi
}

wrap_in_tag "$1" "$2"
```

Explanation:

- `[ -z "$1" ] || [ -z "$2" ]`: this checks if either the first or second argument is empty.
- `echo "Usage: $0 <tag> <content>"`: prints a usage message if arguments are missing.
- `return 1`: script returns a non-zero exit status to indicate an error.
- `wrap_in_tag "$1" "$2"`: calls the function with the provided arguments.

## Testing with Bats

Now, let's test the code.

### 1. Create Test File

Writing test is fairly simple with Bats. 

Create a new file named `wrap_in_tag_test.bats` and add the following code:

```bash
#!/usr/bin/env bats

@test "script exists" {
    [ -f ./script.sh ]
}

@test "wrapping word in tag" {
    result="$(./script.sh p "$text")"
    [ "$result" = "<p>hello</p>" ]
}
```

As you can see, you start a test with `@test` followed by the name of the test.
Within the test, you can use standard bash commands to perform your tests.

```bash
$ bats wrap_in_tag_test.bats

wrap_in_tag_test.bats
 ✓ script exists
 ✓ wrapping word in tag

2 tests, 0 failures
```

### 2. Assertions

If you need assertions, you can use the `bats-assert` library. 

First, just clone the repository into a `test_helper` directory:

```bash
git clone https://github.com/ztombol/bats-assert test_helper/bats-assert
```

Then, you can use it in your test file like this:

```bash
#!/usr/bin/env bats

setup() {
    # load assertions library
    load 'test_helper/bats-assert/load'
}

@test "wrapping phrase in tag" {
    run ./script.sh div $text
    assert_output "<div>hello</div>"
}
```

You load the library in the `setup` function, which runs before each test.

Let's run the tests again:

```bash
$ bats wrap_in_tag_test.bats

wrap_in_tag_test.bats
 ✓ wrapping phrase in tag

1 test, 0 failures
```

### 3. Filtering Tests by Tags

You can also filter tests by tags. To do this, you need to add tags to your tests like this:

```bash
#!/usr/bin/env bats

setup() {
    # load assertions library
    load 'test_helper/bats-assert/load'
}

# bats test_tags=tag:1
@test "missing arguments" {
    run ./script.sh
    assert_failure
    assert_output "Usage: ./script.sh <tag> <content>"
}
```

```bash
$ bats wrap_in_tag_test.bats --filter-tags tag:1

wrap_in_tag_test.bats
 ✓ missing arguments

1 test, 0 failures
```

### 4. Skipping tests

You can skip tests using the `skip` command. This is useful when you have tests that are not ready to be run yet. Here's how you can do it:

```bash
#!/usr/bin/env bats
@test "this test is skipped" {
    skip "Skipping this test for now"
    # Test code goes here
}
```

When you run the tests, the skipped test will be reported as such:

```bash
$ bats wrap_in_tag_test.bats

wrap_in_tag_test.bats
 - this test is skipped (skipped: Skipping this test for now)

1 test, 0 failures, 1 skipped
```

## Full Documentation

For more detailed information on Bats and its features, you can refer to the [official Bats documentation](https://bats-core.readthedocs.io/en/stable/). It covers advanced topics such as setup and teardown functions, custom helpers, and more.

## Final Thoughts

Bats is an amazing help for testing Bash scripts. I feel more confident writing bash scripts now that I can test them easily.

It allows you to write tests in a simple and readable format, making it easier to ensure your scripts work as expected.
