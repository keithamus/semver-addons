'use strict';
var chai = require('chai');
var semver = require('..');
chai.Assertion.addMethod('equalSemver', function (expected) {
  var actual = this.__flags.object = semver(this.__flags.object); // eslint-disable-line
  expected = semver(expected);
  this.assert( // eslint-disable-line no-invalid-this
    semver.eq(actual, expected),
    'expected ' + actual.version + ' to be semver ' + expected.version,
    'expected ' + actual.version + ' to not be semver ' + expected.version,
    true
  );
});
chai.should();

describe('getHighestVersionFromRange', function () {

  it('returns `1.0.0` when given `0.0.0||1.0.0`', function () {
    semver.getHighestVersionFromRange('0.0.0||1.0.0')
      .should.equalSemver(semver.SemVer('1.0.0'));
  });

  it('returns `1.9007199254740991.9007199254740991` when given `^1.0.0`', function () {
    semver.getHighestVersionFromRange('^1.0.0')
      .should.equalSemver(semver.SemVer('1.9007199254740991.9007199254740991'));
  });

  it('returns `2.9007199254740991.9007199254740991` when given `>=1.0.0 <3.0.0`', function () {
    semver.getHighestVersionFromRange('>=1.0.0 <3.0.0')
      .should.equalSemver(semver.SemVer('2.9007199254740991.9007199254740991'));
  });

  it('returns `2.2.9007199254740991` when given `>=1.0.0 <2.3.0`', function () {
    semver.getHighestVersionFromRange('>=1.0.0 <2.3.0')
      .should.equalSemver(semver.SemVer('2.2.9007199254740991'));
  });

  it('returns `2.2.9007199254740991` when given `~2.2.0`', function () {
    semver.getHighestVersionFromRange('~2.2.0')
      .should.equalSemver(semver.SemVer('2.2.9007199254740991'));
  });

  it('returns `9007199254740991.9007199254740991.9007199254740991` when given `*`', function () {
    semver.getHighestVersionFromRange('*')
      .should.equalSemver(semver.SemVer('9007199254740991.9007199254740991.9007199254740991'));
  });

});
