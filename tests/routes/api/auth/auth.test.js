const expect = require("chai").expect;
const assert = require("chai").assert;
const should = require("chai").should();
const request = require("request");

/**
 *
 */
describe("Testing api/v1/auth/test", () => {
  /**
   *
   */
  describe("Testing server is up", () => {
    it("Server should respond with Hello from Express", done => {
      request("http://localhost:5000/", (error, response, body) => {
        expect(body).to.equal("Hello from Express");
        done();
      });
    });
  });
  /**
   *
   */
  describe("Testing GET Request", () => {
    it('API should respond with status code: 200 and msg:"This is a test"', done => {
      request(
        "http://localhost:5000/api/v1/auth/test",
        (error, response, body) => {
          expect(error).to.equal(null, "Error object should be null");
          let msg = JSON.parse(body).msg;
          let status = response.statusCode;
          msg.should.equal("This is a test", "msg SHOULD be This is a test");
          status.should.equal(200, "Status code should be 200");

          done();
        }
      );
    });
  });
});

/**
 *
 */
describe("Test fulfilling requirement for registering a user", () => {
  /**
   *
   */
  describe("There should be a POST route api/v1/auth/register", () => {
    it("Status code should be 201: OK", done => {
      request.post(
        "http://localhost:5000/api/v1/auth/register",
        (error, response, body) => {
          let status = response.statusCode;

          status.should.equal(201, "Status code should equal 201, OK");

          done();
        }
      );
    });
  });
  /**
   *
   */
  describe("TC-001 Request SHOULD have form-data-parameter 'name'", () => {
    it('TC-001-01 Status code should be 400 if parameter "name" is missing', done => {
      request.post(
        "http://localhost:5000/api/v1/auth/register",
        (error, response, body) => {
          let status = response.statusCode;
          status.should.equal(400, "Status code should equal 400, BAD REQUEST");

          done();
        }
      );
    });
    it('TC-001-02 Error message should be "Parameter "name" is required" if parameter "name" is missing', done => {
      request.post(
        "http://localhost:5000/api/v1/auth/register",
        (error, response, body) => {
          let errors = JSON.parse(body);
          errors.name.should.equal("Parameter name is required");

          done();
        }
      );
    });
    describe("TC-002 Name parameter should be between 2 and 30 characters long", () => {
      /** Validate name length */
      it('TC-002-01 Error message should be "Name parameter should be between 2 and 30 characters long" if name parameter is too short', done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          { form: { name: "H" } },
          (error, response, body) => {
            let errors = JSON.parse(body);
            errors.name.should.equal(
              "Parameter name should be between 2 and 30 characters long"
            );
            done();
          }
        );
      });
      it("TC-002-02 Status code should be 400 if name parameter is too short", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          { form: { name: "H" } },
          (error, response, body) => {
            let status = response.statusCode;
            status.should.equal(
              400,
              "Parameter name should be between 2 and 30 characters long"
            );
            done();
          }
        );
      });
      it('TC-002-03 Error message should be "Name parameter should be between 2 and 30 characters long" if name parameter is too long', done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          {
            form: {
              name:
                "Haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            }
          },
          (error, response, body) => {
            let errors = JSON.parse(body);
            errors.name.should.equal(
              "Parameter name should be between 2 and 30 characters long"
            );
            done();
          }
        );
      });
      it("TC-002-04 Status code should be 400 if name parameter is too long", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          {
            form: {
              name:
                "Haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            }
          },
          (error, response, body) => {
            let status = response.statusCode;
            status.should.equal(
              400,
              "Parameter nameparameter should be between 2 and 30 characters long"
            );
            done();
          }
        );
      });
      it("TC-002-05 No error message when parameter name is valid", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          {
            form: {
              name: "Harry Boy"
            }
          },
          (error, response, body) => {
            let errors = JSON.parse(body);
            assert.isUndefined(
              errors.name,
              "No error message when parameter name is valid"
            );

            done();
          }
        );
      });
    });
  });
  describe("TC-003 Request SHOULD have form-data-parameter 'email'", () => {
    it('TC-003-01 Status code should be 400 if parameter "email" is missing', done => {
      request.post(
        "http://localhost:5000/api/v1/auth/register",
        (error, response, body) => {
          let status = response.statusCode;
          status.should.equal(400, "Status code should equal 400, BAD REQUEST");

          done();
        }
      );
    });
    it('TC-003-02 Error message should be "Parameter "email" is required" if parameter "email" is missing', done => {
      request.post(
        "http://localhost:5000/api/v1/auth/register",
        (error, response, body) => {
          let errors = JSON.parse(body);
          errors.email.should.equal("Parameter email is required");

          done();
        }
      );
    });
    /** Validate email format */
    describe("TC-004 Email parameter should be of a valid format", () => {
      it('TC-004-01 Error message should be "Parameter email is invalid" when parameter email is invalid', done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          { form: { email: "hellomisssophie.com" } },
          (error, response, body) => {
            let errors = JSON.parse(body);
            errors.email.should.equal("Parameter email is invalid");

            done();
          }
        );
      });
      it('TC-004-02 Status code should be 400 if parameter "email" is invalid', done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          { form: { email: "hellomisssophie.com" } },
          (error, response, body) => {
            let status = response.statusCode;
            status.should.equal(
              400,
              "Status code should equal 400, BAD REQUEST"
            );

            done();
          }
        );
      });
      it("TC-004-03 No error message when email is of valid format", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          { form: { email: "john@anymail.com" } },
          (error, response, body) => {
            let errors = JSON.parse(body);
            assert.isUndefined(
              errors.email,
              "No error message when email is valid"
            );

            done();
          }
        );
      });
      /** */
    });
  });
  /** Password parameter */
  describe("TC-005 Request SHOULD have form-data parameter 'password'", () => {
    it("TC-005-01 Status code should be 400 if parameter 'password' is missing", done => {
      request.post(
        "http://localhost:5000/api/v1/auth/register",
        (error, response, body) => {
          let status = response.statusCode;
          status.should.equal(400, "Status code should equal 400, BAD REQUEST");

          done();
        }
      );
    });
    it("TC-005-02 Error message should be 'Parameter password is required' if parameter 'password' is missing", done => {
      request.post(
        "http://localhost:5000/api/v1/auth/register",
        (error, response, body) => {
          let errors = JSON.parse(body);
          errors.password.should.equal("Parameter password is required");

          done();
        }
      );
    });
    describe("TC-006 Parameter 'password' SHOULD be between 6 and 30 characters long", () => {
      it("TC-006-01 Status code should be 400 if parameter password is too short", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          { form: { password: "abc" } },
          (error, response, body) => {
            let status = response.statusCode;
            status.should.equal(
              400,
              "Status code should equal 400, BAD REQUEST"
            );
            done();
          }
        );
      });
      it("TC-006-02 Error message should be Parameter password SHOULD be between 6 and 30 characters long when password is too short", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          { form: { password: "abc" } },
          (error, response, body) => {
            let errors = JSON.parse(body);
            errors.password.should.equal(
              "Parameter password SHOULD be between 6 and 30 characters long"
            );
            done();
          }
        );
      });
      it("TC-006-03 Status code should be 400 if parameter password is too long", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          {
            form: {
              password:
                "adsfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsdfasdfasdfasdf"
            }
          },
          (error, response, body) => {
            let status = response.statusCode;
            status.should.equal(
              400,
              "Status code should equal 400, BAD REQUEST"
            );
            done();
          }
        );
      });
      it("TC-006-04 Error message should be Parameter password SHOULD be between 6 and 30 characters long when password is too long", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          {
            form: {
              password:
                "abcasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd"
            }
          },
          (error, response, body) => {
            let errors = JSON.parse(body);
            errors.password.should.equal(
              "Parameter password SHOULD be between 6 and 30 characters long"
            );
            done();
          }
        );
      });
      it("TC-006-05 No Error message when password is valid", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          {
            form: {
              password: "abc_123"
            }
          },
          (error, response, body) => {
            let errors = JSON.parse(body);
            assert.isUndefined(
              errors.password,
              "No error message when password is valid"
            );

            done();
          }
        );
      });
    });
  });
  /** Confirm Password parameter */
  describe("TC-007 Request SHOULD have form-data parameter 'password2'", () => {
    it("TC-007-01 Status code should be 400 if parameter 'password2' is missing", done => {
      request.post(
        "http://localhost:5000/api/v1/auth/register",
        (error, response, body) => {
          let status = response.statusCode;
          status.should.equal(400, "Status code should equal 400, BAD REQUEST");

          done();
        }
      );
    });
    it("TC-007-02 Error message should be 'Parameter password2 is required' if parameter 'password2' is missing", done => {
      request.post(
        "http://localhost:5000/api/v1/auth/register",
        (error, response, body) => {
          let errors = JSON.parse(body);
          errors.password2.should.equal("Parameter password2 is required");

          done();
        }
      );
    });
    describe("TC-008 Parameter 'password2' SHOULD match parameter 'password'", () => {
      it("TC-008-01 Status code should be 400 if parameter password2 dont match password", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          { form: { password: "abc_123", password2: "abc_321" } },
          (error, response, body) => {
            let status = response.statusCode;
            status.should.equal(
              400,
              "Status code should equal 400, BAD REQUEST"
            );
            done();
          }
        );
      });
      it("TC-006-02 Error message should be Parameter password2 SHOULD match parameter password when password2 doesnt match password", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          { form: { password: "abc_123", password2: "abc_321" } },
          (error, response, body) => {
            let errors = JSON.parse(body);
            errors.password2.should.equal(
              "Parameter password2 SHOULD match parameter password"
            );
            done();
          }
        );
      });
      it("TC-006-03 No error message when parameter password2 matches parameter password", done => {
        request.post(
          "http://localhost:5000/api/v1/auth/register",
          {
            form: {
              password: "abc_123",
              password2: "abc_123"
            }
          },
          (error, response, body) => {
            let errors = JSON.parse(body);
            assert.isUndefined(
              errors.password2,
              "No error message when password2 matches password"
            );

            done();
          }
        );
      });
    });
  });
});
