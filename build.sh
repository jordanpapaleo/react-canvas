#!/bin/sh

# webpack --config webpack.build.js --bail -p
rm -rf ./build & webpack --config webpack.build.js --bail -p
