import { tweetsData } from './data.js'

const tweetsContainerEl = document.getElementById('tweets-container')

function getTweetsData(){
    let tweetsHtml = ``
    tweetsData.forEach(function(tweet){
        tweetsHtml+=`
            <div class="tweet" id="${tweet.uuid}">
                <div class="tweet-profile-img">
                    <img src="${tweet.profilePic}" class="profile">
                </div>
                <div class="tweet-inner">
                    <p class="tweet-handle">${tweet.handle}</p>
                    <p class="tweet-area">${tweet.tweetText}</p>
                    <div class="tweet-icon">
                        <i class="fa-regular fa-comment-dots"></i>
                        <i class="fa-solid fa-heart"></i>
                        <i class="fa-solid fa-retweet"></i>
                    </div>
                </div>
            </div>            
        `   
    })
    tweetsContainerEl.innerHTML = tweetsHtml
}

getTweetsData()