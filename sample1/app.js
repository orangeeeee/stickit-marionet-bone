const MyView = Marionette.View.extend({
  tagName: 'h1',
  template: _.template('Marionette says hi!')
});

const myView = new MyView();
myView.render();
$('body').append(myView.$el);


