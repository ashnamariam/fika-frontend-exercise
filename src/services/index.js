export const call =  (url,method,body=null) => {
    const headers = new global.Headers();
    const options = { method, headers }
    if (body) {
        options["body"] = JSON.stringify(body);
    }
    const response = fetch(url,options)
    .then((response) =>response.json()
     )
    return response;
}


