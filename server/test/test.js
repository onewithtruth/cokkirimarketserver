require("dotenv").config();

const app = require("../app");
const request = require('supertest');
const agent = request(app);
const { expect } = require("chai");
const nock = require("nock");
const sayHello = require('./testapp').sayHello;

let assert = require("assert");

const accessTokenRequestBody = {
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
  code: 'fake_auth_code'
}

const accessTokenResponseData = {
  access_token: 'fake_access_token',
  token_type: 'Bearer',
  scope: 'user'
};

// if (sayHello) {
//   console.log('sayHello should return "hello"');
//   if (sayHello() === 'hello') {
//     console.log('success');
//   } else {
//     console.log("fail");
//   }
// }


describe("Environment Variable test", function() {
  it(`should get GITHUB_CLIENT_ID through dotenv`, async () => {
    expect(process.env.GITHUB_CLIENT_ID).to.exist;
  });
  it(`should get GITHUB_CLIENT_SECRET through dotenv`, async () => {
    expect(process.env.GITHUB_CLIENT_SECRET).to.exist;
  });
});

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

describe("Test practice", function() {
  // it("sayHello should return hello", function (done) {
  //   if (sayHello() === 'hello') {
  //     done();
  //   }
  // })
  it("sayHello should return hello", function () {
    assert.equal(sayHello(), 'hello');
  })
});

describe('controller/Oauth.js', () => {
  it('authorization callback에 대한 handler에서는 GitHub access token 요청을 처리할 수 있어야 합니다.', async () => {
    const scope = nock('https://github.com')
      .post('/login/oauth/access_token', accessTokenRequestBody)
      .reply(200, accessTokenResponseData)

    await agent.post('/oauth/oauthgithub').send(callbackRequestBody)

    const ajaxCallCount = scope.interceptors[0].interceptionCounter;
    expect(ajaxCallCount, '요구사항에 맞는 ajax 요청을 보내지 않았습니다.').to.eql(1)
  })

  it('access token을 받아온 후에는, 클라이언트에 응답으로 전달해줘야 합니다.', async () => {
    nock('https://github.com')
      .post('/login/oauth/access_token', accessTokenRequestBody)
      .reply(200, accessTokenResponseData)

    const response = await agent.post('/oauth/oauthgithub').send(callbackRequestBody)

    expect(response.statusCode).to.eql(200)
    expect(response.body.accessToken).to.eql('fake_access_token')
  })
})