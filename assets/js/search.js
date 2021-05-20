let url_get = ""
let url_post = ""
const input_search = document.getElementById('search')
const btn_form = document.getElementById('btn-form')
let container = document.getElementById('container')

btn_form.addEventListener('click', function (event) {
    event.preventDefault()
    if (input_search.value.length > 3) {
        console.log(input_search.value)
        container.innerHTML= ""
        url_get = `https://ae40wf.deta.dev/gx/search/myanimelist/title?type=anime&title=${input_search.value}`
        getData(url_get, input_search)
        console.log (url_get)
    }
})


container.addEventListener('click', function (e) {
    e.preventDefault()

    let postMaliD = e.target.parentNode.parentNode.childNodes[1].childNodes[3].textContent;
    console.log(postMaliD)
    url_post = `https://ae40wf.deta.dev/gx/db/insert1?animeId=${postMaliD}`
    postAnimeById(postMaliD, url_post)
})

async function postAnimeById(id, url){
    try {
        console.log(url)
        let res_post = await axios.post(url)
        console.log(res_post)
    } catch (error) {
        console.log(error)
    }

}



let string_html = ""
async function getData(url, text) {

    let response = await axios.get(url)
    console.log(response)
    addDataDom(response)
    showData()
}


function addDataDom(response) {
    container.innerHTML = ""
    console.log(container.innerHTML)

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
    setTimeout(() =>{
        //container.innerHTML = "";
        console.log(string_html)
    }, 3000 )

}

function showData() {
    let listItems= [...document.getElementsByClassName('item')]

    listItems.forEach(function(item){
        item.classList.toggle('show')
    })


}