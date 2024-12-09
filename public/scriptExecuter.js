import { spawn } from "node:child_process";
import { resolve } from "node:path";

export class ScriptExecuter {
  #processScript;
  #webcamScript;

  constructor() {
    this.#processScript = resolve(process.cwd(), "scripts", "file.py");
    this.#webcamScript = resolve(process.cwd(), "scripts", "webcam.py");
  }

  executeProcessScript(inputFile, overlayPath) {
    return new Promise((resolve, reject) => {
      const ls = spawn("python", [
        this.#processScript,
        `--OverlayPath=${overlayPath}`,
        `--InputFile=${inputFile}`,
      ]);

      let stdoutData = "";
      let stderrData = "";

      ls.stdout.on("data", (data) => {
        stdoutData += data.toString();
      });

      ls.stderr.on("data", (data) => {
        stderrData += data.toString();
      });

      ls.on("close", (code) => {
        if (code === 0) {
          console.log(`stdout: ${stdoutData}`);
          resolve(stdoutData);
        } else {
          console.error(`stderr: ${stderrData}`);
          reject(
            new Error(`child process exited with code ${code}: ${stderrData}`)
          );
        }
      });
    });
  }

  executeWebcamScript(cameraID, overlayPath) {
    return new Promise((resolve, reject) => {
      const ls = spawn("python", [
        this.#webcamScript,
        `OverlayPath=${overlayPath}`,
        `CameraId=${cameraID}`,
      ]);

      let stdoutData = "";
      let stderrData = "";

      ls.stdout.on("data", (data) => {
        stdoutData += data.toString();
      });

      ls.stderr.on("data", (data) => {
        stderrData += data.toString();
      });

      ls.on("close", (code) => {
        if (code === 0) {
          console.log(`stdout: ${stdoutData}`);
          resolve(stdoutData);
        } else {
          console.error(`stderr: ${stderrData}`);
          reject(
            new Error(`child process exited with code ${code}: ${stderrData}`)
          );
        }
      });
    });
  }
}
