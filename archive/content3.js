console.log("Content3");

var article_list = document.querySelectorAll('article');

function check_node_list_equality(node_list1, node_list2) {
    if (node_list1.length != node_list2.length) {
        return false;
    }

    for (let i = 0; i < node_list1.length; i++) {
        if (!(node_list1[i].isEqualNode(node_list2[i]))) {
            return false;
        }
    }

    return true;

}

function interval_function() {
    console.log("Interval");

    var current_article_list = document.querySelectorAll("article");

    if (check_node_list_equality(article_list, current_article_list)) {
        return;
    }
    console.log("Article List Changed");
    
    article_list = current_article_list;

}

setInterval(interval_function, 1000);


