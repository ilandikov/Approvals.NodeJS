"use strict";

import {testDirectory} from "../../testPaths";

var assert = require("assert");
var path = require("path");
var ReporterUnderTest = require("../../../lib/Reporting/Reporters/p4mergeReporter");

describe("Reporter", function () {
  describe("p4merge", function () {
    it.skip("reporter args are correct", function () {
      this.timeout(60000); // test runs slow on appveyor?
      var reporter = new ReporterUnderTest();

      var approvedFile = path.join(testDirectory, "Reporting", "Reporters", "a.txt");
      var receivedFile = path.join(testDirectory, "Reporting", "Reporters", "b.txt");

      if (reporter.canReportOn(receivedFile)) {
        reporter.report(approvedFile, receivedFile, {
          spawn: function (command, args) {
            assert.strictEqual(
              command.toLowerCase(),
              "c:/program files/perforce/p4merge.exe",
            );
            assert.deepStrictEqual(args, [receivedFile, approvedFile]);

            return {
              stdout: { on: function () {} },
              stderr: { on: function () {} },
            };
          },
        });
      }
    });

    describe("p4merge searchForExecutable", function () {
      describe("on windows", function () {
        it("should find it in Program Files");
        it("should find it in Program Files (x86)");
      });

      describe("on mac", function () {
        it(
          "should find it in /Applications/p4merge.app/Contents/Resources/launchp4merge",
        );
        it(
          "should find it in /opt/homebrew-cask/Caskroom/p4merge/2014.3-1007540/p4merge.app/Contents/Resources/launchp4merge",
        );
      });
    });
  });
});
