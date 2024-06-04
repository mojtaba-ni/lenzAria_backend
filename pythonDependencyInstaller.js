import { spawn, spawnSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';

const scriptsFolderPath = resolve(process.cwd(), 'scripts');

// Check if Python is installed
function checkPythonInstallation() {
    const result = spawnSync('python', ['-V']);

    return result.status === 0; // Python is installed if the command exits successfully
}

// Install Python if not already installed
function installPython() {
    console.log("Installing Python...");

    // Install command based on operating system
    let installCommand;
    const os = process.platform;

    switch (os) {
        case 'win32': // Windows
            installCommand = 'choco install python';
            break;
        case 'darwin': // macOS
            installCommand = 'brew install python3';
            break;
        case 'linux': // Linux
            installCommand = 'sudo apt-get install python3';
            break;
        default:
            console.error("Unsupported operating system");
            return false;
    }

    const result = spawnSync(installCommand, { shell: true });

    if (result.status === 0) {
        console.log("Python installed successfully.");
        return true;
    } else {
        console.error("Failed to install Python.");
        return false;
    }
}

// Check if the Python dependencies are installed
export function checkPythonDependencies() {
    if (!checkPythonInstallation()) {
        // Attempt to install Python
        if (!installPython()) {
            console.error("Python installation failed. Cannot check dependencies.");
            return false;
        }
    }

    const requirementsFilePath = join(scriptsFolderPath, 'requirements.txt');

    if (!existsSync(requirementsFilePath)) {
        console.error("requirements.txt file not found");
        return false;
    }

    const installedPackages = new Set(
        spawnSync('pip', ['freeze'], { encoding: 'utf-8' }).stdout.split('\n')
    );

    const requiredPackages = readFileSync(requirementsFilePath, 'utf-8').split('\n');

    for (const pkg of requiredPackages) {
        console.log(`Checking package ${pkg}`);
        if (pkg && !installedPackages.has(pkg.trim())) {
            return false; // Required package not installed
        }
        console.log(`Package ${pkg} was installed`);
    }

    return true; // All required packages are installed
}

// Install Python dependencies if not already installed
export function installPythonDependencies() {
    // Check Python installation first
    if (!checkPythonInstallation()) {
        // Attempt to install Python
        if (!installPython()) {
            console.error("Python installation failed. Cannot install dependencies.");
            return;
        }
    }

    // Upgrade pip
    console.log("Upgrading pip...");
    const upgradePip = spawnSync('pip', ['install', '--upgrade', 'pip']);

    if (upgradePip.error) {
        console.error("Error upgrading pip:", upgradePip.error);
    } else if (upgradePip.status !== 0) {
        console.error("Failed to upgrade pip. Exit code:", upgradePip.status);
    } else {
        console.log("pip upgraded successfully.");
    }

    const requirementsFilePath = join(scriptsFolderPath, 'requirements.txt');

    if (!existsSync(requirementsFilePath)) {
        console.error("requirements.txt file not found");
        return;
    }

    console.log('Installing Python packages...');

    const pipInstall = spawn('pip', ['install', '-r', requirementsFilePath]);

    pipInstall.stdout.on('data', (data) => {
        console.log(data);
    });

    pipInstall.stderr.on('data', (data) => {
        console.error(`error: ${data}`);
    });

    pipInstall.on('close', (code) => {
        if (code === 0) {
            console.log("Python dependencies installed successfully.");
        } else {
            console.error(`pip install process exited with code ${code}`);
        }
    });
}
