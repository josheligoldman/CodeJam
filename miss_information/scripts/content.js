console.log("Content4");

function create_popup(nyt_data) {
    let data = nyt_data['data']

    if (data.length == 0) {return false};

    let hover_box = document.createElement('DIV');
    hover_box.classList.add('hover-box');
    
    for (let i = 0; i < data.length; i++) {
        article_data = data[i];
        let web_url = article_data['web_url'];
        let image_link = article_data['image_link'];
        let abstract = article_data['abstract'];
        let headline = article_data['headline'];
        let article_div = document.createElement('DIV');
        article_div.classList.add('article');
        article_div.innerHTML = `
            <a href="${web_url}" target="_blank" rel="noopener noreferrer">
                <img src = "${image_link}" class="article-image">
                <p class="article-heading">
                    ${headline}
                </p>
                <p class="article-abstract">
                    ${abstract}
                </p>
            </a>
        `;
        hover_box.appendChild(article_div);
    }
    return hover_box;
}

function addMissInformationAction() {
    let tweets = document.querySelectorAll('article');

    for (let i = 0; i < tweets.length; i++) {
        let nyt_data;

        let result;

        let tweet = tweets[i];

        if (tweet.querySelector('div[data-id="miss_information_element"]')) {continue;}

        let tweet_text = tweet.querySelector('div[data-testid="tweetText"]').textContent;

        let like_button = tweet.querySelector('div[data-testid="like"]').parentNode;
        
        let share_tweet = tweet.querySelector('div[aria-label="Share Tweet"]').parentNode.parentNode;
        
        let miss_information_element = document.createElement('div');
        miss_information_element.setAttribute('data-id', 'miss_information_element');
        
        let miss_information_image = document.createElement('img');
        miss_information_image.setAttribute('data-id', 'miss_information_image');
        miss_information_image.src = 'https://raw.githubusercontent.com/josheligoldman/CodeJam/main/miss_information/mag1_10.svg';
        miss_information_image.classList.add('miss-information-image')

        miss_information_element.appendChild(miss_information_image);
        miss_information_element.className = like_button.className + ' miss-information-element' + ' tooltip';

        chrome.runtime.sendMessage(
            {
                'topic': tweet_text, 
            },
            function(response) {
                let tool_tip_text = create_popup(response);
                if (!tool_tip_text) {return;}
                miss_information_element.appendChild(tool_tip_text);
            }
        );

        //like_button.parentNode.appendChild(miss_information_element);
        like_button.parentNode.insertBefore(miss_information_element, like_button); 

    }
    
}

setInterval(addMissInformationAction, 1000);




