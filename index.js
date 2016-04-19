'use strict';
var semver = require('semver');
module.exports = semver.bind(global);
Object.keys(semver).reduce(function assignToExports(exports, key) {
  exports[key] = semver[key];
  return exports;
}, module.exports);

var defaultMaxSafeInteger = 9007199254740991;
var maxSafeInteger = Number.MAX_SAFE_INTEGER || defaultMaxSafeInteger;
var maxVersion = [ maxSafeInteger, maxSafeInteger, maxSafeInteger ].join('.');
var minVersion = [ 0, 0, 0 ].join('.');
module.exports.getHighestVersionFromComparator = function getHighestVersionFromComparator(comparator) {
  comparator = semver.Comparator(comparator);
  if (comparator.operator === '<') {
    var version = comparator.semver;
    if (version.patch > 0) {
      return semver.SemVer([ version.major, version.minor, version.patch - 1 ].join('.'));
    } else if (version.patch === 0 && version.minor > 0) {
      return semver.SemVer([ version.major, version.minor - 1, maxSafeInteger ].join('.'));
    } else if (version.minor === 0 && version.major > 0) {
      return semver.SemVer([ version.major - 1, maxSafeInteger, maxSafeInteger ].join('.'));
    }
    return semver.SemVer(minVersion);
  } else if (String(comparator.operator)[0] === '>') {
    return semver.SemVer(maxVersion);
  }
  return semver.SemVer(comparator.semver.version || maxVersion);
};

module.exports.getLowestVersionFromComparator = function getLowestVersionFromComparator(comparator) {
  comparator = semver.Comparator(comparator);
  if (String(comparator.operator)[0] === '<') {
    return semver.SemVer(minVersion);
  } else if (comparator.operator === '>') {
    return semver.SemVer([ comparator.semver.major, comparator.semver.minor, comparator.semver.patch + 1 ].join('.'));
  }
  return semver.SemVer(comparator.semver.version || minVersion);
};

module.exports.getHighestVersionFromRange = function getHighestVersionFromRange(range) {
  return semver.Range(range).set.reduce(function flattenSet(total, current) {
    return total.concat(current);
  }).map(function getHighestVersion(comparator) {
    return module.exports.getHighestVersionFromComparator(comparator);
  }).filter(function filterBadVersions(version) {
    return semver.satisfies(version, range);
  }).sort(semver.rcompare)[0];
};

module.exports.getLowestVersionFromRange = function getLowestVersionFromRange(range) {
  return semver.Range(range).set.reduce(function flattenSet(total, current) {
    return total.concat(current);
  }).map(function getLowestVersion(comparator) {
    return module.exports.getLowestVersionFromComparator(comparator);
  }).filter(function filterBadVersions(version) {
    return semver.satisfies(version, range);
  }).sort(semver.compare)[0];
};

module.exports.sortRange = function sortRange() {
  var ranges = Array.prototype.slice.call(arguments);
  return ranges.sort(function sortSemverRange(rangeA, rangeB) {
    return semver.compare(
      module.exports.getHighestVersionFromRange(rangeA),
      module.exports.getHighestVersionFromRange(rangeB)
    ) + semver.compare(
      module.exports.getLowestVersionFromRange(rangeA),
      module.exports.getLowestVersionFromRange(rangeB)
    );
  });
};
