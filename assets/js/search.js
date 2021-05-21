let url_get     = ""
let url_post    = ""

let   container     = document.getElementById('container')
const input_search  = document.getElementById('search')
const btn_form      = document.getElementById('btn-form')
const mi_modal      = document.getElementById('mi_modal')

//Imagenes de modal, loading ok, error
const images= {
    loading: "assets/img/Infinity.svg",
    ok: "assets/img/ok.svg",
    error : "assets/img/error.png",
    warning: "assets/img/warning.svg"
}


//Evento buscar
btn_form.addEventListener('click', function (event) {
    event.preventDefault()
    if (input_search.value.length > 3) {

        container.innerHTML= ""
        url_get = `https://ae40wf.deta.dev/gx/search/myanimelist/title?type=anime&title=${input_search.value}`
        getData(url_get, input_search)

    }
})


//Evento al dar click sobre un Anime
container.addEventListener('click', function (e) {
    e.preventDefault()

    if(e.target.parentNode.parentNode.childNodes[1].childNodes[3] != undefined){

        let postMaliD = e.target.parentNode.parentNode.childNodes[1].childNodes[3].textContent;

        url_post = `https://ae40wf.deta.dev/gx/db/insert1?animeId=${postMaliD}`

        postAnimeById(postMaliD, url_post)
    }
})


//Funcion inserta el anime, que se le click
async function postAnimeById(id, url){
    try {
        waitingResponseAnimation(images.loading, false)
        let res_post = await axios.post(url)
        if(res_post.status == 200){
            console.log("OKEY")
            waitingResponseAnimation(images.ok, false )
            removeModalSleep()
        }
    } catch (error) {
        if(error.response.status == 409){
            console.log("YA EXISTE: ")
            waitingResponseAnimation(images.error, false)
            removeModalSleep()
        }
        
    }

}

//Activa, desactiva el modal
/* 
*   data: es la imagen del objeto images linea 10, 
*   close: boleano, indica si se debe cerrar o no el modal
*   
*/
function waitingResponseAnimation(data, close){
    if(close){mi_modal.classList.remove('activate_modal')}
    else{mi_modal.classList.add('activate_modal')
        mi_modal.innerHTML = `
        <div class="mi_modal__cont">
            <img class="mi_modal__img" src="${data}" alt="" srcset="">
        </div>
        `
    }    
}

function removeModalSleep(){
    setTimeout(function(){
        mi_modal.classList.remove('activate_modal')
    }, 1000)
}


//inserta imagen, mientras se realiza una busqueda
function showLoading(){
    container.innerHTML = `
    <div class="load__container">
        <img src="/assets/img/Mag.svg" alt="" srcset="">
    </div>
    `
}

//String conentra el html con los animes.
let string_html = ""

//Funcion consulta los datos
async function getData(url, text) {
    showLoading()
    let response = await axios.get(url)

    //Añade los datos a string_html: variable, formato html
    addDataDom(response)

    //Muestra los datos en el dom
    showData()
}

//Itera la respuesta de getData() funcion y lo añade la variable string_html
function addDataDom(response) {
    container.innerHTML = ""
    for (let i in response.data.results) {
        string_html += `
        <div class="item"> 
            <div class="item__title">
                <p>${response.data.results[i].title}</p>
                <p>${response.data.results[i].mal_id}</p>
            </div>
            <div class="item__img">
                <img src="${response.data.results[i].image_url}" alt="">
            </div>
        </div>`
    }

    container.innerHTML = string_html
    string_html = ""
}

//Itera los items y les añade la clase show de css, con transicion de .3s
//esta los hace visible en el Dom,[sin "show" estan ocultos]
function showData() {
    let listItems= [...document.getElementsByClassName('item')]

    listItems.forEach(function(item){
        item.classList.toggle('show')
    })


}