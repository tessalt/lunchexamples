/** @jsx React.DOM */
(function(){

  var Notes = React.createClass({
    loadNotes: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          this.setState({data: data})
        }.bind(this)
      })
    },
    handleNoteSubmit: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        success: function(data) {          
          var newState = this.state.data.concat(data);
          this.setState({data: newState});
        }.bind(this)
      });
    },
    getInitialState: function() {
      return {data: []};
    },
    componentDidMount: function() {
      this.loadNotes();      
    },
    render: function() {
      return (
        <div className="note">        
          <h1>Notes</h1>
          <NoteForm onNoteSubmit={this.handleNoteSubmit} />
          <NoteList data={this.state.data} />
        </div>
      )
    }
  });

  var NoteList = React.createClass({
    render: function() {
      var noteNodes = this.props.data.map(function(note){
        return (
          <li key={note.id}>{note.title}</li>
        )
      });
      return (
        <ul>
          {noteNodes}
        </ul>
      )
    }
  });

  var NoteForm = React.createClass({
    handleSubmit: function(e) {
      e.preventDefault();
      var title = this.refs.title.getDOMNode().value.trim();
      if (!title) {
        return;
      }
      this.props.onNoteSubmit({title: title});  
      this.refs.title.getDOMNode().value = '';
      return;
    },
    render: function() {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="title" />
        </form>
      )
    }
  });

  React.renderComponent(
    <Notes url='http://notes87.apiary-mock.com/notes'/>,
    document.getElementById('notes')
  );

})();