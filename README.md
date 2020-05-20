# Werewolf Front-end

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg?label=Anti%20996)](https://996.icu)
[![Repo size](https://img.shields.io/github/repo-size/LucienZhang/werewolf-front?label=Repo%20Size)](https://github.com/LucienZhang/werewolf-front)

## Status

[![Test Status](https://github.com/LucienZhang/werewolf-front/workflows/Test/badge.svg)](https://github.com/LucienZhang/werewolf-front/actions?query=workflow%3ATest)
[![Build status](https://github.com/LucienZhang/werewolf-front/workflows/Build/badge.svg)](https://github.com/LucienZhang/werewolf-front/actions?query=workflow%3ABuild)

## Introduction

This is an open source project for an online judge of game [_The Werewolves of Millers Hollow_](https://en.wikipedia.org/wiki/The_Werewolves_of_Millers_Hollow), this repo is the front-end part, please find the backend part [here](https://github.com/LucienZhang/werewolf-back).

To play this game, please visit [my game site](http://ziliang.red/werewolf/)

This project is implemented in [Vue.js](https://vuejs.org/), including Vuex and Vue Router, using WebSocket to receive the status of game from the server in real time. Bearer Authentication is used to maintain the user authorization.

To deploy this project, you can find the artifacts in [Build Pipelines](https://github.com/LucienZhang/werewolf-front/actions?query=workflow%3ABuild) or clone this repository and run `yarn install && yarn build` to get the built files in dist folder.

You may modify the configues in the `.env` file to connect your backend.
