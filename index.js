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
    }
})

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
    render()
}

function handleReplyClick(tweetId){

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
    render()
}

function handleTweetBtn(){
    const textAreaEl = document.getElementById('textarea')
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
    render()
}


function render(){
    let tweetsHtml = ``
    tweetsData.forEach(function(tweet){
        let likedTweet = ``
        let retweetTweet = ``
        if (tweet.isLiked){
            likedTweet = 'liked-tweet'
        }
        if (tweet.isRetweeted){
            retweetTweet = 'retweeted-tweet'
        } 
        tweetsHtml+=`
            <div class="tweet" id="${tweet.uuid}">
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
        `   
    })
    tweetsContainerEl.innerHTML = tweetsHtml
}

render()