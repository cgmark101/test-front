
//Boton disparador de evento
const btnSubmit = document.getElementById('form-btn')

//Elementos inputs, dom
let idAnime     = document.getElementById('id-anime')
let nCapitulos  = document.getElementById('n-capitulos')
let fecha       = document.getElementById('fecha')
let video       = document.getElementById('video')
let audio       = document.getElementById('audio')
let subtitulos  = document.getElementById('subtitulos')
let calificacion = document.getElementById('calificacion')
let categEdad   = document.getElementById('categoria-edad')
//let genero      = document.getElementById('genero')

// textareas
let fansub      = document.getElementById('fansub')
let capitulos   = document.getElementById('capitulos')
let especiales  = document.getElementById('especiales')
let ovas        = document.getElementById('ovas')
let extras      = document.getElementById('extras')
let promos      = document.getElementById('promos')

//evento 
btnSubmit.addEventListener('click', function(e){
    
    e.preventDefault();

    //Url de consulta + id ingresado por usuario
    let url = `https://5v8hpm.deta.dev/anime/${idAnime.value}`;

    //Esta variable, guardara los datos de los inputs, como un obj
    let objData = getDataFromDOM();

    // se pasan los datos ala funcion para añadirle los datos del de request para despues hacer el post
    getDataAndPost(url, objData);

})

function getDataFromDOM(){

    let objetcList={
        fansub:     getDataFromTextarea(fansub),
        capitulos:  getDataFromTextarea(capitulos),
        especiales: getDataFromTextarea(especiales),
        ovas:       getDataFromTextarea(ovas),
        extras:     getDataFromTextarea(extras),
        promos:     getDataFromTextarea(promos)
    }

    let dataForm= {
        form: {
            id: idAnime.value,
            numeroCapitulos: nCapitulos.value,
            fecha: fecha.value,
            video: video.value,
            audio: audio.value,
            subtitulo: subtitulos.value,
            calificacion: calificacion.value,
            categoriaEdad: categEdad.value,
            //genero: genero.value, 
            enlaces: objetcList,
        },    
        data : ""
    }


    return dataForm
}

/**
 * Procesa los texarea para extrarer los links
 * e insertarlos en un array.
 */

function getDataFromTextarea(textArea){
    if(textArea.value != undefined && textArea.value != ""){
        // verifica si hay algo escrito y si si tiene lo retorna en forma de array
        return textArea.value.split("\n");
    }else{
        // si no, retorna null
        return null
    }
} 


const getDataAndPost = async (url, objData)=>{
    
    try {

        //get consulta a api
        let dataFromApi = await axios.get(url= "http://127.0.0.1:5500/testData.json");
        // se añade el resultado de la consulta al objeto original, de los inputs del dom
        //Datos a enviar
        objData.data = dataFromApi
        console.log(objData)
        

        //post

        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            }
        const urlpost =  ''
        
        let resPost = await axios.post(urlPost, objData, headers);

    } catch (error) {
        console.log(error)
    }
        
}

