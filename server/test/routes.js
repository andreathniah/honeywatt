//During the test the env variable is set to test
https: process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
var should = chai.should();

chai.use(chaiHttp);

describe("GET /", () => {
  it("should get 200 alive status", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// describe("/POST book", () => {
//   it("it should not POST a book without identity field", (done) => {
//     let book = {
//       title: "The Lord of the Rings",
//       author: "J.R.R. Tolkien",
//       year: 1954,
//     };
//     chai
//       .request(server)
//       .post("/book")
//       .send(book)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have.property("errors");
//         res.body.errors.should.have.property("pages");
//         res.body.errors.pages.should.have.property("kind").eql("required");
//         done();
//       });
//   });
// });
