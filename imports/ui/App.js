import React, { Component } from 'react';
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

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
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
        tasks: Tasks.find({}).fetch(),
    };
})(App);