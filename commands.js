import * as fs from 'node:fs'

export const addTask = (task, filePath) => {
  let data = []

  if (fs.existsSync(filePath)) {
    const rawData = fs.readFileSync(filePath, 'utf-8')

    try {
      data = JSON.parse(rawData)
    } catch {
      return 0
    }
  }

  const getNextId = (data) => {
    if (data.length === 0) return 1
    return Math.max(...data.map(task => task.id)) + 1
  }

  const userInput = {
    id: getNextId(data),
    task,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  data.push(userInput)

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  )

  return userInput
}

export const deleteTask = (taskId, filePath) => {
  let data = []

  if (!fs.existsSync(filePath)) return 0

  const rawData = fs.readFileSync(filePath, 'utf-8')

  try {
    data = JSON.parse(rawData)
  } catch {
    return 0
  }

  const index = data.findIndex(task => task.id === Number(taskId))

  if (index < 0) {
    return 0
  }

  data.splice(index, 1)

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  )

  return 1
}

export const updateTask = (taskId, task, filePath) => {
  let data = []

  if (!fs.existsSync(filePath)) return 0

  const rawData = fs.readFileSync(filePath, 'utf-8')

  try {
    data = JSON.parse(rawData)
  } catch {
    return 0
  }

  const index = data.findIndex(task => task.id === Number(taskId))

  if (index < 0) {
    return 0
  }

  data[index].task = task
  data[index].updatedAt = new Date().toISOString()

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  )

  return 1
}

export const markTask = (taskId, newStatus, filePath) => {
  let data = []

  if (!fs.existsSync(filePath)) return 0

  const rawData = fs.readFileSync(filePath, 'utf-8')

  try {
    data = JSON.parse(rawData)
  } catch {
    return 0
  }

  const index = data.findIndex(task => task.id === Number(taskId))

  if (index < 0) {
    return 0
  }

  data[index].status = newStatus

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  )

  return 1
}

export const listTasks = (status, filePath) => {
  let data = []

  if (!fs.existsSync(filePath)) return []

  const rawData = fs.readFileSync(filePath, 'utf-8')

  try {
    data = JSON.parse(rawData)
  } catch {
    return 0
  }

  const finalData = status ? data.filter(task => task.status === status) : data

  return finalData
}

export const printTasks = (tasks) => {
  tasks.forEach(task => {
    console.log(
      '\nID: ' + task.id +
      '\nTask: ' + task.task +
      '\nStatus: ' + task.status +
      '\nCreated at: ' + new Date(task.createdAt).toLocaleString('es-AR') +
      '\nUpdated at: ' + new Date(task.updatedAt).toLocaleString('es-AR'))
  })
}
