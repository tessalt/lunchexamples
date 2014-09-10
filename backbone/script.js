(function(){

  window.App = window.App || {};

  App.Note = Backbone.Model.extend({});

  var Notes = Backbone.Collection.extend({
    model: App.Note,
    url: 'http://notes87.apiary-mock.com/notes'
  });

  App.Notes = new Notes();

  App.NoteView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#notes-template').html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  App.AppView = Backbone.View.extend({
    el: "#notes",
    events: {
      'keypress #new-note': 'createOnEnter',
    },
    initialize: function() {
      this.newNote = $('#new-note');
      this.list = $('#notes-list');
      this.listenTo(App.Notes, 'reset', this.addAll);
      this.listenTo(App.Notes, 'add', this.addOne);
      App.Notes.fetch({reset: true});
    },
    addAll: function() {
      this.list.html('');
      App.Notes.each(this.addOne, this);
    },
    addOne: function(note) {
      var view = new App.NoteView({model: note});
      this.list.append(view.render().el);
    },
    createOnEnter: function(e) {
      if (e.which === 13 && this.newNote.val().trim()) {
        App.Notes.create({
          title: this.newNote.val().trim()
        });
        this.newNote.val('');
      }
    }
  });

  new App.AppView();

})();