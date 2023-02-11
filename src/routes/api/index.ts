const execute = (request) => {
    const body = JSON.stringify({ message: "index" })
    const headers = {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    return new Response(body, { headers })
}

export default execute;