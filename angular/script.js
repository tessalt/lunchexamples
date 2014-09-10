var app = angular.module('notes', ['ngResource']);

app.factory('noteService', function ($resource) {
  return $resource('http://notes87.apiary-mock.com/notes/:note_id');
});

app.controller('notesController', function ($scope, noteService) {

  $scope.notes = noteService.query();

  $scope.addNote = function() {
    var newNote = {
      title: $scope.newNote.trim()
    }
    var save = noteService.save(newNote).$promise;
    save.then(function(){
      $scope.notes.push(newNote);
    });
  }

});