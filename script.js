const accessKey = "O8_yOqno_FIvvWun30LVGZOBNzmS6KreTviMJzmBygg"


const searchForm = document.querySelector('form')
const searchBox = document.querySelector('#search-box')
const searchResult = document.querySelector('#show-results')
const moreImages = document.querySelector('#more-images')

let keyword = ""
let page = 1

async function searchImages(){
    keyword = searchBox.value
    const url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`

    const response = await fetch(url)
    const data = await response.json()

    if(page === 1){
        searchResult.innerHTML=""
    }

    const resultArr = data.results 
    
    resultArr.map((result) => {
        const image = document.createElement('img')
        image.src = result.cover_photo.urls.small_s3

        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"

        imageLink.appendChild(image)
        searchResult.appendChild(imageLink)
    })

    moreImages.style.display = "block"
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    page = 1
    searchImages() 
})

moreImages.addEventListener('click',() => {
    page++
    searchImages()
})
