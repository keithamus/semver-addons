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

describe('getHighestVersionFromComparator', function () {

  it('returns exact version if Range is exact version', function () {
    semver.getHighestVersionFromComparator('=1.1.1')
      .should.equalSemver(semver.SemVer('1.1.1'));
  });

  it('returns exact version if comparator is <=', function () {
    semver.getHighestVersionFromComparator('<=1.0.0')
      .should.equalSemver(semver.SemVer('1.0.0'));
  });

  it('returns one version lower if comparator is <x.0.0', function () {
    semver.getHighestVersionFromComparator('<1.0.0')
      .should.equalSemver(semver.SemVer('0.9007199254740991.9007199254740991'));
    semver.getHighestVersionFromComparator('<2.0.0')
      .should.equalSemver(semver.SemVer('1.9007199254740991.9007199254740991'));
  });

  it('returns one version lower if comparator is <x.x.0', function () {
    semver.getHighestVersionFromComparator('<2.2.0')
      .should.equalSemver(semver.SemVer('2.1.9007199254740991'));
  });

  it('returns one version lower if comparator is <x.x.x', function () {
    semver.getHighestVersionFromComparator('<2.2.2')
      .should.equalSemver(semver.SemVer('2.2.1'));
  });

  it('returns one version lower if comparator is <0.0.x', function () {
    semver.getHighestVersionFromComparator('<0.0.1')
      .should.equalSemver(semver.SemVer('0.0.0'));
  });

  it('returns one version lower if comparator is <0.x.0', function () {
    semver.getHighestVersionFromComparator('<0.2.0')
      .should.equalSemver(semver.SemVer('0.1.9007199254740991'));
  });

  it('returns 0.0.0 if comparator is <0.0.0', function () {
    semver.getHighestVersionFromComparator('<0.0.0')
      .should.equalSemver(semver.SemVer('0.0.0'));
  });

  it('returns max possible version when given >= only', function () {
    semver.getHighestVersionFromComparator('>=1.0.0')
      .should.equalSemver(semver.SemVer('9007199254740991.9007199254740991.9007199254740991'));
  });

  it('returns max possible version when Comparator("")', function () {
    semver.getHighestVersionFromComparator('')
      .should.equalSemver(semver.SemVer('9007199254740991.9007199254740991.9007199254740991'));
  });

});
