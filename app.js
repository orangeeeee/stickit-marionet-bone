//npm installしているものは、ファイル名のみで良い。
//let $ = require('jquery');
//let Backbone = require('backbone');
//require('backbone.marionette'); //エラーになる。
$ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone');

/**
Marionette2系だけ？かもしれないですが、
//Marionetteに内包されているmarionette.babysitterが存在しないため、
エラーになるので、「npm install backbone.babysitter」をしてあげないと
「Error: Cannot find module 'backbone.babysitter'」というエラーになってしまう。
これで正しいのかはわからない。
*/
Mn = require('backbone.marionette');
require('backbone.stickit');
moment = require('moment');

//ファイルが重くて読み込みが遅い・・・