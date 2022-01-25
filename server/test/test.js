require("dotenv").config();
const app = require("../app");
const request = require('supertest');
const agent = request(app);
const { expect } = require("chai");
const { nock } = require("nock");

var assert = require("assert");

describe("Array", function () {
  describe("#indexOf() test upper", function () {
    describe("#indexOf()", function () {
      it("should return -1 when the value is not present", function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
      it("double done", function (done) {
        // Calling `done()` twice is an error
        setImmediate(done);
      });
    });
  });
});
