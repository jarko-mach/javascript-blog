{

    "use strict"


    const titleClickHandler = function (event) {

        event.preventDefault();
        const clickedElement = this;

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');
        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */

        const hrefAttribute = clickedElement.getAttribute("href");

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */

        /* [DONE] add class 'active' to the correct article */

        document.querySelector(hrefAttribute).classList.add('active')
    }

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles'

    const generateTitleLinks = function () {

        // clear link list
        const linkList = document.querySelectorAll(optTitleListSelector);
        for (let link of linkList) {
            link.innerHTML = "";
        }
        // read article id, read title, use insertAdjacentHTML
        const allArticles = document.querySelectorAll(optArticleSelector);
        for (let article of allArticles) {
            const articleId = article.getAttribute('id');
            const articleTitle = article.querySelector(optTitleSelector).innerText;
            const articleHtmlStr = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            // document.querySelector(optTitleListSelector).innerHTML += articleHtmlStr;
            // replace with insertAdjacentHTML
            document.querySelector(optTitleListSelector).insertAdjacentHTML('beforeEnd', articleHtmlStr);
        }
    }

    generateTitleLinks()

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }


}