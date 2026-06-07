#!/bin/bash

mkdir -p /tmp/build

javac -d /tmp/build /app/Main.java 

if [ $? -ne 0 ]; then
    echo "Compilation Error"
    exit 1
fi

timeout 1s java -Xmx128m -cp /tmp/build Main < /app/input.txt 