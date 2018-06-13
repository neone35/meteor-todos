import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// allows us to create a "data container" to feed Meteor's reactive data into React's component hierarchy.
import { withTracker } from 'meteor/react-meteor-data';
// creates a cache connected to the server collection
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';

// App component - represents the whole app
class App extends Component {
    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    handleSubmit(event) {
        event.preventDefault();
        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Tasks.insert({
            text,
            createdAt: new Date(),
        });
        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>

                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new tasks"
                        />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

// fetches tasks from the Tasks collection
// in a reactive way, so that when the contents of the database change, the App re-renders
export default withTracker(() => {
    return {
        tasks: Tasks.find({}, 
            { sort: { createdAt: 'descending' } })
            .fetch(),
    };
})(App);