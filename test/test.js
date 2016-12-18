import elrUI from '../src/main.js'
import elrUtilities from 'elr-utility-lib'

const elr = elrUtilities()
const ui = elrUI();
const expect = require('chai').expect
const chai = require('chai')
const assertArrays = require('chai-arrays')
const chaiSubset = require('chai-subset')
const chaiObject = require('chai-shallow-deep-equal')
const chaiJquery = require('chai-jquery')

global.$ = global.jQuery = require('jquery')

chai.use(assertArrays)
chai.use(chaiSubset)
chai.use(chaiObject)
// chai.use(chaiJquery)

describe('elr ui', function() {
})