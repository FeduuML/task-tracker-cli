#!/usr/bin/env node

import { Command } from 'commander'
import { addTask, deleteTask, updateTask, markTask, listTasks, printTasks } from './commands.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FILE_PATH = path.join(__dirname, 'data.json')

const program = new Command()

program
  .name('task-tracker')
  .description('A CLI application built with Commander.js to track your tasks')
  .version('1.0.0')

program
  .command('add <task>')
  .description('Adds a new task')
  .action((task) => {
    const created = addTask(task, FILE_PATH)
    console.log(`Task added successfully (ID: ${created.id})`)
  })

program
  .command('delete <taskId>')
  .description('Deletes an existing task')
  .action((taskId) => {
    const deleted = deleteTask(taskId, FILE_PATH)
    if (deleted) {
      console.log('Task deleted successfully')
    } else {
      console.log('Task does not exist')
    }
  })

program
  .command('update <taskId> <task>')
  .description('Updates an existing task')
  .action((taskId, task) => {
    const updated = updateTask(taskId, task, FILE_PATH)
    if (updated) {
      console.log('Task updated successfully')
    } else {
      console.log('Task does not exist')
    }
  })

program
  .command('mark-in-progress <taskId>')
  .description('Marks a task as in-progress')
  .action((taskId) => {
    const markedTask = markTask(taskId, 'in-progress', FILE_PATH)
    if (markedTask) {
      console.log('Task marked as in-progress successfully')
    } else {
      console.log('Task does not exist')
    }
  })

program
  .command('mark-done <taskId>')
  .description('Marks a task as done')
  .action((taskId) => {
    const markedTask = markTask(taskId, 'done', FILE_PATH)
    if (markedTask) {
      console.log('Task marked as done successfully')
    } else {
      console.log('Task does not exist')
    }
  })

program
  .command('list [taskStatus]')
  .description('Lists all tasks (status is optional)')
  .action((status) => {
    const tasks = listTasks(status, FILE_PATH)
    if (tasks.length !== 0) {
      printTasks(tasks)
    } else {
      console.log('There are no existing tasks')
    }
  })

program.parse()
