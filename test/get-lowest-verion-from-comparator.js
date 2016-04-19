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

describe('getLowestVersionFromComparator', function () {

  it('returns exact version if Range is exact version', function () {
    semver.getLowestVersionFromComparator('=1.1.1')
      .should.equalSemver(semver.SemVer('1.1.1'));
  });

  it('returns 0.0.0 version if comparator is <=', function () {
    semver.getLowestVersionFromComparator('<=1.0.0')
      .should.equalSemver(semver.SemVer('0.0.0'));
  });

  it('returns 0.0.0 version if comparator is <', function () {
    semver.getLowestVersionFromComparator('<1.0.0')
      .should.equalSemver(semver.SemVer('0.0.0'));
    semver.getLowestVersionFromComparator('<2.0.0')
      .should.equalSemver(semver.SemVer('0.0.0'));
    semver.getLowestVersionFromComparator('<2.2.0')
      .should.equalSemver(semver.SemVer('0.0.0'));
    semver.getLowestVersionFromComparator('<2.2.2')
      .should.equalSemver(semver.SemVer('0.0.0'));
    semver.getLowestVersionFromComparator('<0.0.1')
      .should.equalSemver(semver.SemVer('0.0.0'));
    semver.getLowestVersionFromComparator('<0.2.0')
    .should.equalSemver(semver.SemVer('0.0.0'));
  });

  it('returns 0.0.0 if comparator is <0.0.0', function () {
    semver.getLowestVersionFromComparator('<0.0.0')
      .should.equalSemver(semver.SemVer('0.0.0'));
  });

  it('returns exact version when given >= only', function () {
    semver.getLowestVersionFromComparator('>=1.0.0')
      .should.equalSemver(semver.SemVer('1.0.0'));
    semver.getLowestVersionFromComparator('>=1.3.2')
      .should.equalSemver(semver.SemVer('1.3.2'));
  });

  it('returns one patch version above if given >', function () {
    semver.getLowestVersionFromComparator('>1.0.0')
      .should.equalSemver(semver.SemVer('1.0.1'));
    semver.getLowestVersionFromComparator('>1.3.2')
      .should.equalSemver(semver.SemVer('1.3.3'));
  });

  it('returns lowest possible version when Comparator("")', function () {
    semver.getLowestVersionFromComparator('')
      .should.equalSemver(semver.SemVer('0.0.0'));
  });

});
