let url_get = ""
let url_post = ""
const input_search = document.getElementById('search')
const btn_form = document.getElementById('btn-form')
let container = document.getElementById('container')
const mi_modal = document.getElementById('mi_modal')

btn_form.addEventListener('click', function (event) {
    event.preventDefault()
    if (input_search.value.length > 3) {


        container.innerHTML= ""
        url_get = `https://ae40wf.deta.dev/gx/search/myanimelist/title?type=anime&title=${input_search.value}`
        getData(url_get, input_search)

    }
})

const responseAnimationLoad= {
    img: "assets/img/Infinity.svg"
}


container.addEventListener('click', function (e) {
    e.preventDefault()
    let postMaliD = e.target.parentNode.parentNode.childNodes[1].childNodes[3].textContent;
    url_post = `https://ae40wf.deta.dev/gx/db/insert1?animeId=${postMaliD}`

    postAnimeById(postMaliD, url_post)
})


async function postAnimeById(id, url){
    try {
        waitingResponseAnimation(responseAnimationLoad)
        let res_post = await axios.post(url)
        if(res_post.status == 200){
            waitingResponseAnimation()

        }
    } catch (error) {
        if(error.response.status == 409){
            waitingResponseAnimation()
            
        }
        
    }

}

function waitingResponseAnimation(data){
    mi_modal.classList.toggle('activate_modal')
    mi_modal.innerHTML = `
    <div class="mi_modal__cont">
        <img class="mi_modal__img" src="${data.img}" alt="" srcset="">
    </div>
    `
    
}

function showLoading(){


    container.innerHTML = `
    <div class="load__container">
        <img src="/assets/img/Mag.svg" alt="" srcset="">

    </div>

    `

}


function showAlertDuplicate(){

}


let string_html = ""
async function getData(url, text) {
    showLoading()
    let response = await axios.get(url)

    addDataDom(response)
    showData()
}


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

function showData() {
    let listItems= [...document.getElementsByClassName('item')]

    listItems.forEach(function(item){
        item.classList.toggle('show')
    })


}