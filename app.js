addEventListener("DOMContentLoaded", (e)=>{
    //Peticiones Peticiones Worker"
    console.warn("Peticiones Worker");
    const workerXHT = new Worker('./worker/XHT.js');
    const workerFetch = new Worker('./worker/Fetch.js');


    const credenciales_Worker_XHT = {
        url: "https://jsonplaceholder.typicode.com/todos",
        options:{
            method: "GET"
        }
    }
    workerXHT.postMessage(credenciales_Worker_XHT);
    workerXHT.addEventListener("message", (e)=>{
        console.log(e.data);
        workerXHT.terminate();
    })

    
    const credenciales_Worker_Fech = {
        url: "https://pokeapi.co/api/v2/pokemon?limit=100&offset=200",
        options:{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
    }
    workerFetch.postMessage(credenciales_Worker_Fech);
    workerFetch.addEventListener("message", (e)=>{
        console.log(e.data);
        workerFetch.terminate();
    })



    //Peticiones Peticiones async await"
    console.warn("Peticiones async await");
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
    const peticion_Fech = async({...arg})=>{
        let peticion = await fetch(arg.url,arg.options);
        return (peticion.ok)
            ? await Promise.resolve(peticion.json())
            :( 
                console.clear(),
                data = await Promise.reject({status : peticion.status})
            );
    }
    const credenciales_XHT = {
        url: "https://jsonplaceholder.typicode.com/todos",
        options:{
            method: "GET"
        }
        
    }
    const credenciales_Fech = {
        url: "https://pokeapi.co/api/v2/pokemon?limit=100&offset=200",
        options:{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
    }
    Promise.all([peticion_XHT(credenciales_Fech), peticion_Fech(credenciales_XHT)]).then((res)=>{
        console.log(...res);
    });






    //Peticiones secuenciales
    console.warn("Peticiones secuenciales");


    
    const peticion_Secuencial_XHT = new XMLHttpRequest();
    peticion_Secuencial_XHT.open("GET", "https://jsonplaceholder.typicode.com/todos/5");
    peticion_Secuencial_XHT.addEventListener("loadend", (e)=>{
        console.log(JSON.parse(e.target.response));
    })
    peticion_Secuencial_XHT.send();



    const peticion_Secuencial_Fech = fetch("https://pokeapi.co/api/v2/pokemon/1");
    peticion_Secuencial_Fech
    .then(res => res.json())
    .then((res)=>{
        console.log(res);
    })

})