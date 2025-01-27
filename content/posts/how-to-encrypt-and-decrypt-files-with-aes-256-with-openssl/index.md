---
title: How to encrypt and decrypt files with AES-256 with OpenSSL
url: how-to-encrypt-and-decrypt-files-with-aes-256-with-openssl
description: Storing sensitive data in plain text is risky. Learn how to encrypt and decrypt files securely using AES-256 with OpenSSL.
tags:
  - programming
  - ubuntu
  - bash
date: 2024-11-28
---
The worst nightmare is sending and storing sensitive or private data in plain text.

Let's improve that by encrypting the files with AES-256.

## Install OpenSSL

```bash
# Let's check if we have OpenSSL installed
openssl version

# If not, let's install openssl
sudo apt update && apt install openssl -y
```

## Encrypt File

```bash
# create a file with some content
echo "hello" > test.txt

# Encrypt the file
openssl enc -aes-256-cbc -salt -pbkdf2 -iter 100000 -in test.txt -out example.enc

#### help ################################################################
# -salt     - Ensures that the same plaintext encrypted multiple 
#             times with the same key produces different ciphertexts
# -pbkdf2   - Password-Based Key Derivation Function 2 
#             algorithm used to derive the encryption key from a password
# -iter     - Specifies the number of iterations for the algorithm
##########################################################################

# check if we have encrypted file
ls
# test.txt example.enc

# let's see the contents of encrypted file
cat example.enc
# Salted__�!ei��/�+�΀O��l3%
```

Yay, no one can read that.

## Decrypt File

```bash
openssl enc -aes-256-cbc -d -salt -pbkdf2 -iter 100000 -in example.enc -out cyptedfile_test.txt

ls
# test.txt example.enc cyptedfile_test.txt

cat cyptedfile_test.txt
# hello
```

## Bash Script

Yeah, but who wants to type this entire command every time they need to encrypt or decrypt, right?

Let's create a file `aes`

```bash
#!/bin/bash

# Encrypt file
en() {
    if [ -z "$1" ]; then
        echo "Usage: en <filename>"
        return 1
    fi

    input_file="$1"
    output_file="${input_file}.aes256"

    openssl enc -aes-256-cbc -salt -pbkdf2 -iter 100000 -in "$input_file" -out "$output_file"

    if [ $? -eq 0 ]; then
        echo "Encrypted file created: $output_file"
    else
        echo "Encryption failed."
    fi
}

# Decrypt file
de() {
    if [ -z "$1" ]; then
        echo "Usage: de <filename>"
        return 1
    fi

    input_file="$1"
    # Remove the .aes256 extension for the output filename
    output_file="${input_file%.aes256}"

    openssl enc -aes-256-cbc -d -salt -pbkdf2 -iter 100000 -in "$input_file" -out "$output_file"

    if [ $? -eq 0 ]; then
        echo "Decrypted file created: $output_file"
    else
        echo "Decryption failed."
    fi
}
```

To simplify the process, the script automatically outputs the file with a filename that includes the `aes256` extension.

You can also view the file in my [dotfiles](https://github.com/matusstafura/dotfiles) in `scripts` folder.

## Everyday Usage

Now let's put that file in script directory in the dotfiles and include it in zsh, so we can use functions everywhere.

```bash
# move file
mv aes ~/dotfiles/scripts/

# add to .zshrc
[ -f ~/dotfiles/scripts/aes ] && source ~/dotfiles/scripts/aes

# and we need to reload it
source ~/.zshrc
```

Now, you should be able to run the script functions in any folder.

```bash
en ssh_keys_colleague
de ssh_keys_colleague.aes256
```
## Resources

https://en.wikipedia.org/wiki/Advanced_Encryption_Standard
