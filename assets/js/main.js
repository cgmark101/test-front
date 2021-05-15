/*axios.get('')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });


axios.post('', {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
*/



//Boton disparador de evento
const btnSubmit = document.getElementById('form-btn')

//Elementos inputs, dom
let idAnime   = document.getElementById('id-anime')
let nCapitulos = document.getElementById('n-capitulos')
let fecha = document.getElementById('fecha')

let ovas = document.getElementById('ovas')

//evento 
btnSubmit.addEventListener('click', function(e){
    e.preventDefault();

    //Url de consulta + id ingresado por usuario
    //let url = `https://consulta/anime/${idAnime.value}`;

    //Esta variable, guardara los datos de los inputs, como un obj
    let dataObj = getDataFromDOM();


    //getDataAndPost(url);

})

function getDataFromDOM(){
    //Inputs normales
    idAnime = idAnime.value; 



    //textAreas

    ovas = getDataFromTextarea(ovas)
    //Array de los links del textArea Ovas
    console.log(ovas)

   //objeto a retornar 

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


// get and post
const getDataAndPost = async (url)=>{
    let dataFromApi = await axios.get(url)

}