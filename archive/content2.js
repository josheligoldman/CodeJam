var article_node_list, current_article_node_list;

article_node_list = document.querySelectorAll("article");

console.log("Content2");

function mutation_callback(mutations, observer) {
    console.log("Mutation Observed!");
    current_article_node_list = document.querySelectorAll("article");
    
    if (article_node_list.length == current_article_node_list.length) {
        for (let i = 0; i < article_node_list.length; i++) {
            if (article_node_list[i] != current_article_node_list[i]) {
                break;
            }
            return;
        }
    }

    console.log("Article List Changed!");
}

var mutationObserver = new MutationObserver(mutation_callback);

mutationObserver.observe(
    document.body,
    {subtree: true, childList: true}
)


