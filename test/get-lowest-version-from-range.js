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

describe('getLowestVersionFromRange', function () {

  it('returns `0.0.0` when given `0.0.0||1.0.0`', function () {
    semver.getLowestVersionFromRange('0.0.0||1.0.0')
      .should.equalSemver(semver.SemVer('0.0.0'));
  });

  it('returns `1.0.0` when given `^1.0.0`', function () {
    semver.getLowestVersionFromRange('^1.0.0')
      .should.equalSemver(semver.SemVer('1.0.0'));
  });

  it('returns `1.0.0` when given `>=1.0.0 <3.0.0`', function () {
    semver.getLowestVersionFromRange('>=1.0.0 <3.0.0')
      .should.equalSemver(semver.SemVer('1.0.0'));
  });

  it('returns `1.0.0` when given `>=1.0.0 <2.3.0`', function () {
    semver.getLowestVersionFromRange('>=1.0.0 <2.3.0')
      .should.equalSemver(semver.SemVer('1.0.0'));
  });

  it('returns `1.0.1` when given `>1.0.0`', function () {
    semver.getLowestVersionFromRange('>1.0.0')
      .should.equalSemver(semver.SemVer('1.0.1'));
  });

  it('returns `2.2.0` when given `~2.2.0`', function () {
    semver.getLowestVersionFromRange('~2.2.0')
      .should.equalSemver(semver.SemVer('2.2.0'));
  });

  it('returns `0.0.0` when given `*`', function () {
    semver.getLowestVersionFromRange('*')
      .should.equalSemver(semver.SemVer('0.0.0'));
  });

});
