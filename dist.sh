#!/bin/sh

build () {
  sh build.sh
  # rm -rf ./build & webpack --config webpack.build.js --bail -p
}

deploy () {
  # TODO
}

build && deploy
