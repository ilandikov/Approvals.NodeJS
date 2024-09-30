import {testDirectory} from "../../testPaths";
import ReporterUnderTest from "../../../lib/Reporting/Reporters/icdiffReporter";
import path from "path";
import assert from "assert";

describe("Reporter", function () {
  describe("icdiff", function () {
    it("reporter args are correct", function () {
      this.timeout(20000); // failed on appVeyor for some reason?

        const reporter = new ReporterUnderTest();

        const approved = path.join(testDirectory, "Reporting", "Reporters", "a.txt");
        const received = path.join(testDirectory, "Reporting", "Reporters", "r.txt");

        const expectedCommand = [received, approved];

        const args = reporter.getCommandArguments(approved, received);
        assert.deepEqual(expectedCommand, args.args);
    });
  });
});
