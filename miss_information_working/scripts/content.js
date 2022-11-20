console.log("Content4");

function create_popup(nyt_data) {
    console.log("Creating Popup");
    
    let data = nyt_data['data']

    if (data.length == 0) {return false};

    let tooltip_text = document.createElement('SPAN');
    tooltip_text.classList.add('tooltiptext');
    console.log("Length of Data: " + data.length)
    for (let i = 0; i < data.length; i++) {
        article_data = data[i];
        let web_url = article_data['web_url'];
        let image_link = article_data['image_link'];
        let abstract = article_data['abstract'];
        let headline = article_data['headline'];
        let article_div = document.createElement('DIV');
        article_div.classList.add('hit1');
        article_div.innerHTML = `
            <a href="${web_url}" target="_blank" rel="noopener noreferrer">
            <div class="image">
                <img src = "${image_link}" width="196" alt="article image" class="wdn-stretch rounded-corners">
            </div>
            <div class="heading">
                ${headline}
            </div>
            <div class="content">
                ${abstract}
            </div>
        `;
        tooltip_text.appendChild(article_div);
    }
    return tooltip_text;
}

function addMissInformationAction() {
    console.log("addMissInformationAction");

    let tweets = document.querySelectorAll('article');

    for (let i = 0; i < tweets.length; i++) {
        console.log(i.toString());

        let nyt_data;

        let result;

        let tweet = tweets[i];

        //tweet.style.overflow = 'visible !important';

        if (tweet.querySelector('div[data-id="miss_information_element"]')) {continue;}

        let tweet_text = tweet.querySelector('div[data-testid="tweetText"]').textContent;

        let like_button = tweet.querySelector('div[data-testid="like"]').parentNode;
        //console.log(like_button);

        let share_tweet = tweet.querySelector('div[aria-label="Share Tweet"]').parentNode.parentNode;
        //console.log(share_tweet);

        let miss_information_element = document.createElement('div');
        miss_information_element.setAttribute('data-id', 'miss_information_element');
        
        let miss_information_image = document.createElement('img');
        miss_information_image.setAttribute('data-id', 'miss_information_image');
        miss_information_image.src = 'https://raw.githubusercontent.com/josheligoldman/CodeJam/main/miss_information/mag1_10.svg';
        miss_information_image.classList.add('miss-information-image')

        miss_information_element.appendChild(miss_information_image);
        miss_information_element.className = like_button.className + ' miss-information-element' + ' tooltip';

        console.log("Icon in Main Code:");
        console.log(miss_information_element);

        chrome.runtime.sendMessage(
            {
                'topic': tweet_text, 
            },
            function(response) {
                let tool_tip_text = create_popup(response);
                if (!tool_tip_text) {return;}
                console.log("Icon in Function:");
                console.log(miss_information_element);
                miss_information_element.appendChild(tool_tip_text);
            }
        );

        like_button.parentNode.appendChild(miss_information_element);
    }
    
}

setInterval(addMissInformationAction, 1000);




