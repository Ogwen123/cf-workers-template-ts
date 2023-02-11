import { corsHeaders } from "./router"

const error = (code: number, message?: string): Response => {
    const body = JSON.stringify({
        code: code,
        message: message || "An error occured."
    })
    return new Response(body, {
        status: code,
        headers: {
            'content-type': 'application/json',
            ...corsHeaders
        }
    })
}

export default error