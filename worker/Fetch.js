addEventListener("message", (e)=>{
    peticion_Fech(e.data).then((res)=>{
        postMessage(res);
    })
})

const peticion_Fech = async({...arg})=>{
    let peticion = await fetch(arg.url,arg.options);
    return (peticion.ok)
        ? await Promise.resolve(peticion.json())
        :( 
            console.clear(),
            data = await Promise.reject({status : peticion.status})
        );
}