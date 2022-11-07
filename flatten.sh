#!/bin/sh
if [ ! -d "./output" ]; then
  mkdir ./output
fi

function listFiles()
{
        #1st param, the dir name
        for file in `ls $1`;
        do
                if [ -d "$1/$file" ]; then
                    echo "dir: $file"
                    listFiles "$1/$file"
                else
                  if [ "${file##*.}"x = "sol"x ]; then
                        echo "sol: $1/$file"
                        npxFun "$1/$file"
                  fi
                fi
        done
}

function npxFun() {
    file=$1
    npx hardhat flatten $file > output/$(basename $file)
}

listFiles ./contracts

node gen_contract.js
