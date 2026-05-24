#!/bin/bash

cd /app

javac code.java 

if [ $? -ne 0 ]; then
    echo "Compilation Error"
    exit 1
fi

timeout 1s java -Xmx128m code 