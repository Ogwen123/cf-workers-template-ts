import { ExecutionContext } from "@cloudflare/workers-types";
import { Env } from "../../router";

const test = (request) => {
    const body = JSON.stringify({ message: "hello" })
    const headers = {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    return new Response(body, { headers })
}

export default test;