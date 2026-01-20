import assert from 'node:assert'
import * as fs from 'node:fs'
import path from 'node:path'
import test, { afterEach, beforeEach, describe } from 'node:test'
import { addTask, deleteTask, updateTask, markTask, listTasks } from '../commands.js'

const TEST_FILE = path.join(process.cwd(), 'tests', 'test-data.json')

console.log(path.join(process.cwd(), 'tests', 'test-data.json'))

function resetFile () {
  if (fs.existsSync(TEST_FILE)) fs.unlinkSync(TEST_FILE)
}

// addTask tests

describe('addTask', () => {
  beforeEach(resetFile)
  afterEach(resetFile)

  test('creates a task with incremental IDs', () => {
    const task1 = addTask('Learn node', TEST_FILE)
    const task2 = addTask('Learn testing', TEST_FILE)

    assert.strictEqual(task1.id, 1)
    assert.strictEqual(task2.id, 2)
  })

  test('stores tasks in the JSON file', () => {
    addTask('Learn node', TEST_FILE)
    addTask('Learn testing', TEST_FILE)

    const stored = JSON.parse(fs.readFileSync(TEST_FILE, 'utf-8'))
    assert.strictEqual(stored.length, 2)
  })
})

// deleteTask tests

describe('deleteTask', () => {
  beforeEach(() => {
    resetFile()
    addTask('Learn node', TEST_FILE)
    addTask('Learn testing', TEST_FILE)
  })

  afterEach(resetFile)

  test('deletes an existing task', () => {
    const result = deleteTask(1, TEST_FILE)
    assert.strictEqual(result, 1)

    const stored = JSON.parse(fs.readFileSync(TEST_FILE, 'utf-8'))
    assert.strictEqual(stored.length, 1)
  })

  test('returns 0 if task does not exist', () => {
    const result = deleteTask(999, TEST_FILE)
    assert.strictEqual(result, 0)
  })
})

// updateTask tests

describe('updateTask', () => {
  beforeEach(() => {
    resetFile()
    addTask('Learn node', TEST_FILE)
  })

  afterEach(resetFile)

  test('updates an existing task', () => {
    const result = updateTask(1, 'Learn node and testing', TEST_FILE)
    assert.strictEqual(result, 1)
  })

  test('returns 0 if task does not exist', () => {
    const result = updateTask(999, 'Learn node and testing', TEST_FILE)
    assert.strictEqual(result, 0)
  })
})

// markTask tests

describe('markTask', () => {
  describe('in-progress', () => {
    beforeEach(() => {
      resetFile()
      addTask('Learn node', TEST_FILE)
    })

    afterEach(resetFile)

    test('marks a task as in-progress', () => {
      const result = markTask(1, 'in-progress', TEST_FILE)
      assert.strictEqual(result, 1)
    })
  })

  describe('done', () => {
    beforeEach(() => {
      resetFile()
      addTask('Learn node', TEST_FILE)
    })

    afterEach(resetFile)

    test('marks a task as done', () => {
      const result = markTask(1, 'done', TEST_FILE)
      assert.strictEqual(result, 1)
    })
  })

  test('returns 0 if task does not exist', () => {
    const result = markTask(999, 'in-progress', TEST_FILE)
    assert.strictEqual(result, 0)
  })
})

// listTasks tests

describe('listTasks', () => {
  beforeEach(resetFile)
  afterEach(resetFile)

  test('returns empty array if file does not exist', () => {
    const result = listTasks(null, TEST_FILE)
    assert.deepStrictEqual(result, [])
  })

  test('returns all tasks if no status is provided', () => {
    addTask('Learn node', TEST_FILE)
    addTask('Learn testing', TEST_FILE)

    const result = listTasks(null, TEST_FILE)
    assert.strictEqual(result.length, 2)
  })

  test('filters tasks by status', () => {
    addTask('Learn node', TEST_FILE)
    addTask('Learn testing', TEST_FILE)
    markTask(1, 'in-progress', TEST_FILE)

    const result = listTasks('in-progress', TEST_FILE)
    assert.strictEqual(result.length, 1)
  })
})
