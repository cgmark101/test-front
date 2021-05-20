
//Boton disparador de evento
const btnSubmit = document.getElementById('form-btn')
const URL_POST = "https://ae40wf.deta.dev/gx/db/insert"
const message = document.getElementById('message')

//Elementos inputs, dom
let idAnime     = document.getElementById('id-anime')

//let genero      = document.getElementById('genero')

// textareas
let capitulos   = document.getElementById('episodios')
let especiales  = document.getElementById('especiales')
let ovas        = document.getElementById('ovas')
let promos      = document.getElementById('promos')

//evento 
btnSubmit.addEventListener('click', function(e){
    
    e.preventDefault();

    if(isImcomplteForm()){
        return
    }
    //Url de consulta + id ingresado por usuario
    let url = `https://ae40wf.deta.dev/gx/search/anime/${idAnime.value}`;

    //Esta variable, guardara los datos de los inputs, como un obj
    let objData = getDataFromDOM();

    // se pasan los datos ala funcion para añadirle los datos del de request para despues hacer el post
    getDataAndPost(url, objData);

})

function getDataFromDOM(){

    let objetcList={
        id: parseInt(idAnime.value),
        episodios:  {url: getDataFromTextarea(capitulos)},
        especiales: {url: getDataFromTextarea(especiales)},
        ovas:       {url: getDataFromTextarea(ovas)},
        promo:     {url: getDataFromTextarea(promos)}
    }



    return objetcList
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
        return []
    }
} 


const getDataAndPost = async (url, objData)=>{
    
    try {

        //Consulta a la api, aqui con el id ingresado en el input idAnime
        console.log("CONSULTANDO")
        showLoadingAlert()
        let dataFromApi = await axios.get(url);
        console.log(dataFromApi.data)


        /*verifica si viene un error en la consulta a la api, 
         *si es asi se sale de la funcion y muestra un error
         */
        if (dataFromApi.data.error){
            console.log(dataFromApi.data)
            console.log("ERROR: CANCELANDO POST")

            //Funcion que mostrara el error, si no existe un id
            showErrorAlert()
            return
        }



        
        //obtiene todos los datos que se necesitan enviars
        let dataPost = await getDataPost(objData, dataFromApi)
        /*************************************************
         * HEADER Y URL PARA EL POST
        **************************************************/

        const headers = {"Accept": "application/json","Content-Type": "application/json",}
        const urlPost =  URL_POST
        console.log("ENVIANDO: POST")
        //let resPost = await axios.post(urlPost, dataPost.data);
        console.log("POST: OK")

        showSuccessAlert()

    } catch (error) {
        console.log(error)
        showErrorPostAlert()
    }
        
}

/**
 * Esta funcion agrega los datos del formulario junto con los datos de la consulta a la api.
 * a un nuevo objeto, que sera enviado a la base de datos. retorna el nuevo objeto
 */

function getDataPost(objData, dataFromApi){
    let newObjtoPost = {data:dataFromApi.data}

    let titulo = dataFromApi.data.titulo;

    
    //Mejorar esto
    newObjtoPost.data.cantidad_ep = newObjtoPost.data.episodios
    newObjtoPost.data.titulo_en = titulo;


    newObjtoPost.data.id = objData.id;
    newObjtoPost.data.episodios = objData.episodios;
    newObjtoPost.data.especiales = objData.especiales;
    newObjtoPost.data.ovas = objData.ovas;
    newObjtoPost.data.promo = objData.promo;

    delete newObjtoPost.data.titulo

    return newObjtoPost
}


function showLoadingAlert(){
    message.classList.add("alert-primary")
    message.textContent = "Loading"
    
}

function showErrorAlert(){
    message.classList.remove("alert-primary")
    message.classList.add("alert-danger")
    message.textContent = "ID, Titulo ingles y Cantidad Episodios REQUERIDOS"

    setTimeout(function(){
        message.classList.remove("alert-danger")
        message.textContent = ""
    }, 3000)

}
function showErrorPostAlert(){
    message.classList.remove("alert-primary")
    message.classList.add("alert-danger")
    message.textContent = "ID, Titulo ingles y Cantidad Episodios REQUERIDOS"

    setTimeout(function(){
        message.classList.remove("alert-danger")
        message.textContent = ""
    }, 3000)

}

function showSuccessAlert(){
    message.classList.remove("alert-primary")
    message.classList.add("alert-success")
    message.textContent = "Enviado"


    setTimeout(function(){
        message.classList.remove("alert-success")
        message.textContent = ""
    }, 3000)
}


function isImcomplteForm(){
    if(idAnime.value == ""){
        showErrorAlert()
        return true
    }
}