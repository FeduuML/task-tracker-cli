# Task Tracker CLI

A CLI application built with Commander.js to track your tasks
It allows you to add, list, mark, update and delete tasks stored in a JSON file

https://roadmap.sh/projects/task-tracker

## Installation

Clone the repository and install dependencies:

```
git clone https://github.com/FeduuML/task-tracker-cli.git
cd task-tracker-cli
npm install
```

## Usage
`task-tracker <command> [options]`

## Commands

### Add a new task
```
task-tracker add "Buy groceries"
task-tracker add "Buy meds"
```

### Update an existing task
`task-tracker update 1 "Buy groceries and stuff"`

### Delete an existing task
`task-tracker delete 1`

### Mark a task as in-progress or done
```
task-tracker mark-in-progress 1
task-tracker mark-done 2
```

### List all tasks
`task-tracker list`

### List tasks by status
```
task-tracker list todo
task-tracker list in-progress
task-tracker list done
```

## Testing
`npm test`
