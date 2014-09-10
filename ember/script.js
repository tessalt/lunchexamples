var App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://notesrest.apiary-mock.com'
});

App.Router.map(function(){
  this.resource('notes', {path: '/'})
});

App.NotesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('note');
  }
});

App.Note = DS.Model.extend({
  title: DS.attr('string')
});

App.NotesController = Ember.ArrayController.extend({
  actions: {
    newNote: function() {
      var self = this;
      var note = this.store.createRecord('note', {
        title: this.get('title')
      });
      note.save().then(function(){
        self.set('title', '');
      });
    }
  }
});