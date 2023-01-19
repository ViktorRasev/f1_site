


export default function WikiFetch()  { 

    let url = "https://en.wikipedia.org/w/api.php"

    const params = {
            action: "query",
            prop: "images",
            titles: "Lewis Hamilton",
            format: "json"
    }

    url = url + "?origin=*"
    Object.keys(params).forEach((key) => {
        url += "&" + key + "=" + params[key]
    })


    fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        var pages = response.query.pages;
        // for (var page in pages) {
        //     for (var img of pages[page].images) {
        //         console.log(img.title);
        //     }
        // }
        console.log(pages)
    })

    .catch(function(error){console.log(error);});
}