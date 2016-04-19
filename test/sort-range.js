'use strict';
require('chai').should();
var semver = require('..');
describe('sortRange', function () {

  it('sorts caret ranges by highest version', function () {
    semver.sortRange('^1.1.2', '^3.2.6', '^1.1.1')
      .should.deep.equal([ '^1.1.1', '^1.1.2', '^3.2.6' ]);
  });

  it('sorts caret with higher top end than tilde', function () {
    semver.sortRange('~1.9.0', '^1.1.1')
      .should.deep.equal([ '~1.9.0', '^1.1.1' ]);
  });

  it('sorts > over caret when given "^1.1.0", ">1.1.0 <2.0.0"', function () {
    semver.sortRange('^1.1.0', '>1.1.0 <2.0.0')
      .should.deep.equal([ '^1.1.0', '>1.1.0 <2.0.0' ]);
  });

});
