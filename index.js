import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const tweetsContainerEl = document.getElementById('tweets-container')

document.addEventListener("click",function(e){
    if (e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }else if(e.target.id === "tweet-btn"){
        handleTweetBtn()
    }else if(e.target.id === "arrow-left"){
        handleCloseBtn()
    }else if(e.target.dataset.replybtn){
        handleAddReply(e.target.dataset.replybtn)
    }
})

document.addEventListener("dblclick",function(e){
    if (e.target.dataset.reply){
        handleWriteReplyClick(e.target.dataset.reply)
    }
})


function saveToLocalStorage(){
    localStorage.setItem("tweetsData",JSON.stringify(tweetsData))
}

function handleCloseBtn(){
    document.getElementById("modal-container").style.display = "none"
}

function handleAddReply(tweetId){
    const tweetTextEl = document.getElementById("modal-textarea")
    let targetTweet = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId})[0]
    if (tweetTextEl){
        targetTweet.replies.push({
        handle: `@Maestro D'Alessandro`,
        profilePic: `images/profile.jpg`,
        tweetText: `${tweetTextEl.value}`
    })}
    document.getElementById("modal-container").style.display = "none"
    saveToLocalStorage()
    render()
    tweetTextEl.value=""
    }    

function handleLikeClick(tweetId){
const targetTweet = tweetsData.filter(function(tweetData){
    return tweetData.uuid === tweetId
}
)[0]
if (targetTweet.isLiked){
    targetTweet.likes--
}else{
    targetTweet.likes++
}
targetTweet.isLiked = !targetTweet.isLiked
saveToLocalStorage()
render()
}


function handleReplyClick(tweetId){
    document.getElementById(`reply-${tweetId}`).classList.toggle('hidden')
}

function handleRetweetClick(tweetId){
    const targetTweet = tweetsData.filter(function(tweetData){
        return tweetData.uuid === tweetId
    })[0]
    if (targetTweet.isRetweeted){
        targetTweet.retweets--
    }else{
        targetTweet.retweets++
    }
    targetTweet.isRetweeted = !targetTweet.isRetweeted
    saveToLocalStorage()
    render()
}

function handleTweetBtn(){
    const textAreaEl = document.getElementById('textarea')
    if (textAreaEl.value){
        const newTweet = {
            handle:"Maestro D'Alessandro",
            profilePic:"images/profile.jpg",
            likes:0,
            retweets:0,
            tweetText:textAreaEl.value,
            replies:[],
            isLiked:false,
            isRetweeted:false,
            uuid:`${uuidv4()}`,
        }
        tweetsData.unshift(newTweet)
        textAreaEl.value='' 
        saveToLocalStorage()
        render()
    }
}

function handleWriteReplyClick(tweetId){
    const targetTweet = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    openModalWindowToReply(targetTweet)
    
}

function openModalWindowToReply(tweet){
    document.getElementById("modal-container").style.display = "flex"
    populateModalWindow(tweet)
}

function populateModalWindow(tweet){
    let repliedTweetHtml = `
        <div class="modal-tweet-btn-container">
            <i class="fa-solid fa-arrow-left" id="arrow-left"></i>
            <button class="modal-tweet-btn" data-replybtn = "${tweet.uuid}">Reply</button>
        </div>
        <div id="${tweet.uuid}">
            <div class="tweet modal-border-bottom">
                <div class="tweet-profile-img">
                    <img src="${tweet.profilePic}" class="profile">
                    <div class="border"></div>
                </div>
                <div class="tweet-inner">
                    <p class="tweet-handle">${tweet.handle}</p>
                    <p class="tweet-area">${tweet.tweetText}</p>
                    <p class="tweet-destinatary">Replying to ${tweet.handle}<p>
                </div>
            </div>
        </div>
    `
    document.getElementById("replied-tweet").innerHTML = repliedTweetHtml
}


function render(){
    let tweetsDataFromLocalStorage = JSON.parse(localStorage.getItem("tweetsData"))
    let tweetToRender = ""
    if (tweetsDataFromLocalStorage){
        tweetToRender = tweetsDataFromLocalStorage
    }else{
        tweetToRender = tweetsData
    }    
    let tweetsHtml = ``

    tweetToRender.forEach(function(tweet){
        let likedTweet = ``
        let retweetTweet = ``
        if (tweet.isLiked){
            likedTweet = 'liked-tweet'
        }
        if (tweet.isRetweeted){
            retweetTweet = 'retweeted-tweet'
        }

        let repliesHtml = ``
        tweet.replies.forEach(function(reply){
            repliesHtml+=`
            <div class="reply">
                <div class="reply-profile-img">
                    <img class="profile" src="${reply.profilePic}">
                </div>
                <div class="reply-inner">
                    <p class="reply-handle">${reply.handle}</p>
                    <p class="reply-area">${reply.tweetText}</p>
                </div>
            </div>`
        }   
    )
        tweetsHtml+=`
            <div id="${tweet.uuid}">
                <div class="tweet">
                    <div class="tweet-profile-img">
                        <img src="${tweet.profilePic}" class="profile">
                    </div>
                    <div class="tweet-inner">
                        <p class="tweet-handle">${tweet.handle}</p>
                        <p class="tweet-area">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span>
                                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span>
                                <i class="fa-solid fa-heart ${likedTweet}" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span>    
                                <i class="fa-solid fa-retweet ${retweetTweet}" data-retweet="${tweet.uuid}"></i>
                                ${tweet.retweets}
                            </span>
                            </div>
                    </div>
                </div>
                
                <div class="hidden" id="reply-${tweet.uuid}">
                    ${repliesHtml}
                </div>
            </div>  
        `
        
    })
    tweetsContainerEl.innerHTML = tweetsHtml
}

render()