var tweets, child, text_content, badge, icon, mutationObserver, our_icons;

const text_child_node_indices = [0, 0, 0, 1, 1, 1, 0];
const badge_child_node_indices = [0, 0, 0, 1, 1, 1];

console.log("Content");

const body_element = document.querySelector('body');

function mutation_callback(mutations) {
    mutationObserver.disconnect();
    console.log("Mutation Observed");
    tweets = document.querySelectorAll('article');
    console.log("Tweets");
    console.log(tweets);

    our_icons = document.querySelectorAll('#our_icons');

    for (let i = 0; i < our_icons.length; i++) {
        our_icons[i].remove();
    }

    for (let i = 0; i < tweets.length; i++) {
        text_child = tweets[i];
        badge_child = tweets[i];

        for (let j = 0; j < text_child_node_indices.length; j++) {
            text_child = text_child.childNodes[text_child_node_indices[j]];
        }

        for (let j = 0; j < badge_child_node_indices.length; j++) {
            badge_child = badge_child.childNodes[badge_child_node_indices[j]];
        }
        badge_child = badge_child.lastChild.firstChild;

        console.log(i.toString());
        text_content = text_child.textContent;
        console.log("Text Content");
        console.log(text_content);
        console.log("Badge Child");
        console.log(badge_child);

        badge = document.createElement('div');
        badge.id = "our_icons";
        badge.classList.add('css-1dbjc4n', 'r-18u37iz', 'r-1h0z5md', 'round-hover');
        
        icon = document.createElement('img');
        icon.src = 'https://raw.githubusercontent.com/josheligoldman/CodeJam/main/miss_information/mag3_20.svg';
        badge.appendChild(icon);
        badge_child.appendChild(badge);

        console.log()

    }
    mutationObserver = new MutationObserver(mutation_callback);

    mutationObserver.observe(
        body_element,
        {subtree: true, childList: true}
    );

}

var mutationObserver = new MutationObserver(mutation_callback);

mutationObserver.observe(
    body_element,
    {subtree: true, childList: true}
)


