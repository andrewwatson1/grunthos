import path from "path"

function grunthosVersion(): string {
    let version = "unknown"

    const packageJsonPath = path.join(__dirname, "..", "package.json")

    try {
        const packageJson = require(packageJsonPath)
        version = packageJson.version
    } catch (e) {
        console.error(`Error loading package.json: ${packageJsonPath}`)
    }

    return version
}

export const GRUNTHOS_VERSION = grunthosVersion()
