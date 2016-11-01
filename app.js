requirejs.config({
    baseUrl : 'node_modules',  // モジュール読み込みのbaseUrlを指定する

    paths : {
        jquery : [
            'jquery/dist/jquery.min',      // 先に読み込される
        ],

        underscore : [
            'underscore/underscore-min'
        ],

        // '/'または'http'から始まると絶対パスで参照する
        // それ以外はbaseUrlからみた相対パスになる
        backbone : [
			'backbone/backbone-min.js'
		],
		marionette : [
			'/backbone.marionette/lib/backbone.marionette'
		],
		radio : [
			'/backbone.radio/build/backbone.radio'
		],		
		stickit : '/backbone.stickit/backbone.stickit'
    },

    shim : {
        underscore : {
            exports : '_'
        },
        // Backbone.js ver1.1.1 からAMDに対応したので下記の設定はいらなくなった
        // backbone : {
        //     deps : [underscore', 'jquery'],
        //     exports : 'Backbone'
        // }
    }
});

// モジュール定義
define(['backbone'], function (Backbone) {
    console.log(Backbone === window.Backbone);  // trueになる
});
/*
var Mn = require('backbone.marionette');

const MyView = Mn.View.extend({
  tagName: 'h1',
  template: _.template('Marionette says hi!')
});

const myView = new MyView();
myView.render();
$('body').append(myView.$el);

*/