import shelljs from "shelljs";
import path from "path";
import fs from "fs";
import * as os from "node:os";
import assert from "assert";

describe("Command Line", function () {
  it("Should run approvals CLI with basic text input", function (done) {
    const pwd = process.cwd();
    const script = path.join(pwd, "/", "bin", "index.js");
    const cliTestCommand =
      'echo "Hello\nWorld" | ' +
      script +
      " --reporter gitdiff --errorOnStaleApprovedFiles=false --outdir " +
      pwd +
      "/test commandlineTest";

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "example-"));
    process.chdir(tempDir);

    shelljs.exec(cliTestCommand, { async: true }, function (code, output) {
      if (code !== 0) {
        console.error("code:", code, "output:", output);
        throw new Error("cli script failed");
      }
      done();
    });

    process.chdir(pwd);
  });
});
