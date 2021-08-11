addEventListener("message",(e)=>{
    peticion_XHT(e.data)
    .then((res)=>{
        postMessage(res);
    });
})

const peticion_XHT = async({...arg})=>{
    let data = await new Promise((resolve,reject)=>{
        const peticion = new XMLHttpRequest();
        // peticion.timeout = 10;
        peticion.open(arg.options.method,arg.url);
        peticion.send();
        peticion.addEventListener("load", (e)=>{
            resolve(JSON.parse(e.target.response));
        })
        peticion.addEventListener("loadend", (e)=>{
            reject({status: e.target.status});
        })
        peticion.addEventListener("error", (e)=>{
            reject({status: e.target.status});
        })
    })
    return data;
}
