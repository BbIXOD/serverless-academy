'use strict'
//file contains realization of commands
import { EXIT, SORT_TYPES } from './commands.js'

const FIND_DIGIT_PATTERN = /\\d/
const FIND_LETTER_PATTERN = /[a-z]/i

//excludes values which we don't want in the result
const excludeDecorator = (pattern, callback) => values => {
  const filtered = values.filter(value => !pattern.test(value))
  return callback(filtered)
}

const getUnique = values => Array.from(new Set(values))

export default {
  [SORT_TYPES.ALPHABETIC]: excludeDecorator(FIND_DIGIT_PATTERN,
    values => values.sort()),
  [SORT_TYPES.INCREASE]: excludeDecorator(FIND_LETTER_PATTERN,
    values => values.sort((a, b) => a - b)),
  [SORT_TYPES.DECREASE]: excludeDecorator(FIND_LETTER_PATTERN,
    values => values.sort((a, b) => b - a)),
  [SORT_TYPES.LETTER_COUNT]: excludeDecorator(FIND_DIGIT_PATTERN,
    values => values.sort((a, b) => a.length - b.length)),
  [SORT_TYPES.UNIQUE_WORDS]:
        excludeDecorator(FIND_DIGIT_PATTERN, getUnique),
  [SORT_TYPES.UNIQUE_VALUES]: getUnique,
  [EXIT]: process.exit.bind(null, 0)
}
