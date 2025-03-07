const loadCategories = ()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.error(error))
}

// fetch video api & design button
const loadCategoryVideos = (id)=>{
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then((data) => {
            const activeBtn = document.getElementById(`btn-${id}`)
            const buttons = document.getElementsByClassName('btn')
            for(let btnRemove of buttons){
                btnRemove.classList.remove("btn-color")
            }
            activeBtn.classList.add("btn-color")
            // console.log(activeBtn)
            displayVideos(data.category)
        })
        .catch(error => console.error(error))
}

// fetch vidoe api
const loadVideos = (searchText="") =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then((data) => displayVideos(data.videos))
        .catch(error => console.error(error))
}

// load video details
const loadVideoDetails = (id)=> {
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
        .then(res => res.json())
        .then(data => displayVideoDetails(data.video))
}

// display video details
const displayVideoDetails = (item)=>{
    const detailsContainer = document.getElementById('modal-container')
    detailsContainer.innerHTML = `
       <p>${item.description}</p>
    `
    document.getElementById('showModalData').click()
}

// formet time
function getTime(time) {
    const hour = parseInt(time/3600)
    let remainingSeconds = time%3600
    const minutes = parseInt(remainingSeconds/60)
    let seconds = remainingSeconds%60
    return `${hour}hrs ${minutes}min ${seconds}sec ago`
}

// create categories button
const displayCategories = (categories)=>{
    const categoryContainer = document.getElementById('categories')
    categories.forEach((item) => {
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" class="btn" onclick="loadCategoryVideos(${item.category_id})">
                ${item.category}
            </button>
        `
        categoryContainer.appendChild(buttonContainer)
    })
}

const displayVideos = (videos)=>{
    const videoContainer = document.getElementById('videos')
    // when no video was found
    videoContainer.innerHTML = ''
    if(videos.length === 0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
            <div class="min-h-[400px] flex flex-col justify-center items-center gap-5">
                <img src="assets/Icon.png">
                <h2 class="text-center font-bolder">Oops!! Sorry, There is no content here</h2>
            </div>
        `
        return
    }
    else{
        videoContainer.classList.add('grid')
    }
    // card
    videos.forEach((video) => {
        const card = document.createElement('div')
        card.classList = 'card shadow-sm'
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img src=${video.thumbnail} class="h-full w-full object-cover" alt="Shoes" />
                ${
                    video.others.posted_date.length===0 ? '' : `<span class="absolute text-xs right-2 bottom-2 bg-black rounded px-1 text-white">${getTime(video.others.posted_date)}</span>`
                }
            </figure>
            <div class="px-0 py-3 flex gap-3">
                <div> 
                    <img src=${video.authors[0].profile_picture} class="w-10 h-10 rounded-full object-cover">
                </div>
                <div>
                    <h3 class="font-bold">${video.title}</h3>
                    <div class="flex item-center gap-2">
                        <p>${video.authors[0].profile_name}</p>
                        <p>
                            ${video.authors[0].verified === true ? `<img src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" class="w-5 h-[24px] object-cover">` : ""}
                        </p>
                    </div>
                    <p>
                        <button class="btn btn-sm btn-error mt-2" onclick="loadVideoDetails('${video.video_id}')">Details</button>
                    </p>
                </div>
            </div>
        `
        videoContainer.append(card)
    })
}

document.getElementById('search-input').addEventListener('keyup', (event)=>{
    loadVideos(event.target.value)
})

loadCategories()
loadVideos()


