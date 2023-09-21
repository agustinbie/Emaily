//write a function to retrieve a blob of json
//make an ajax request! Use the "fetch" function.
//https://rallycoding.herokuapp.com/api/music_albums

/* function fetchAlbums(){
    fetch("https://rallycoding.herokuapp.com/api/music_albums")
    .then(res => res.json())
    .then(json => console.log(json));
} */



//       comparar con lo siguiente (es lo mismo)


 async function fetchAlbums(){
    const res = await fetch("https://rallycoding.herokuapp.com/api/music_albums");  //await no significa que el codigo se pausa o saltea lineas, es solo sintaxis
    const json = await res.json();  
    console.log(json); //de esta forma se entiende mejor que la promesa primero tiene que ser resuelta para poder manipular la data
    //una vez resuelta, se asigna la respuesta a la variable y se puede manipular 
}

//o sino con arrow function
fetchAlbums = async () => {
    const res = await fetch("https://rallycoding.herokuapp.com/api/music_albums");  
     const json = await res.json();  
    console.log(json); }


fetchAlbums();