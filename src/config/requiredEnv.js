// function to check if env variable is set or not
export const requiredEnv = (key) => {
    if(!process.env[key]) {
        throw new Error(`missing env var: ${key}`)
    }
    return process.env[key];
}