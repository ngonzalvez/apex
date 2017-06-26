declare namespace Express {
    interface Boom {
        // Add boom's properties in here
    }

    export interface Response {
        boom: any
    }
}
