import "dotenv/config"
import fs from "fs"
import express from 'express';
import logger from "./middleware/logger.middleware"

(async () => {

    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(logger)

    const functions = fs.readdirSync("./functions")

    for (const func of functions) {

        const path = `./functions/${func}/src/app.ts`
        const exist = fs.existsSync(path)
        if (!exist) {
            console.log(`${func} app file not found`)
            continue
        }
        const module = await import(path)
        app.use(`/${func}`, module.default)
        console.log(`${func} module loaded at /${func}`)
    }

    app.listen(process.env.DEV_PORT, () => {
        console.log(`server running at ${process.env.DEV_PORT}`)
    });
})()