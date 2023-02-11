//run 'npm install'

import { Router } from 'itty-router';
import error from "./error"

import { ExecutionContext } from "@cloudflare/workers-types"

export interface Env {

}

export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
};

const router = Router();

const register = async () => {
    //add new get routes with router.get("url path", await import("file path").then((m) => m.default)).all("url path", () => error(405))
    //add the files to routes/api
    router.get("/api", await import("./routes/api").then((m) => m.default)).all("/", () => error(405))
    router.get("/api/test", await import("./routes/api/test").then((m) => m.default)).all("/test", () => error(405))
    router.get('*', () => new Response('Not found', { status: 404 }));
}

register()

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        if (!new URL(request.url).pathname.startsWith("/api")) return error(418, "The requested resource is not available on this server."); //for non-api requests, requests should be sent to the pages domain
        return await router.handle(request, env, ctx).catch(err => {
            return error(500)
        });
    },
};
