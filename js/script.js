// const { data } = require("autoprefixer");

{

  'use strict';


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
    const hrefAttribute = clickedElement.getAttribute('href');
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    /* [DONE] add class 'active' to the correct article */
    document.querySelector(hrefAttribute).classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleTagsLink = '.post-tags ul li a',
    optArticleAuthorsSelector = '.post-author',
    optArticleAuthorsSelectorLink = '.post-author a',
    optTagsListSelector = '.tags.list';

  const generateTitleLinks = function (customSelector = '') {

    // clear link list
    const linkList = document.querySelectorAll(optTitleListSelector);

    for (let link of linkList) {
      link.innerHTML = '';
    }
    // read article id, read title, use insertAdjacentHTML
    const allArticles = document.querySelectorAll(optArticleSelector + customSelector);

    for (let article of allArticles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerText;
      const articleHtmlStr = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      // document.querySelector(optTitleListSelector).innerHTML += articleHtmlStr;
      // replace with insertAdjacentHTML
      document.querySelector(optTitleListSelector).insertAdjacentHTML('beforeEnd', articleHtmlStr);
    }
  };

  generateTitleLinks();

  const addClickListenersToTitles = function () {
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);

    }
  };

  addClickListenersToTitles();

  const generateTags = function () {

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = [];

    /* find all articles */
    const allArticles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of allArticles) {

      /* find tags wrapper */
      let tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let htmlVariable = '';

      /* get tags from data-tags attribute */
      let tags = article.getAttribute('data-tags');

      /* split tags into array */
      let tagsArray = tags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of tagsArray) {

        /* generate HTML of the link */
        let linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

        /* add generated code to html variable */
        htmlVariable += linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (allTags.indexOf(linkHTML) == -1) {

          /* [NEW] add generated code to allTags array */
          allTags.push(linkHTML);
        }

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.insertAdjacentHTML('beforeEnd', htmlVariable);

    }
    
    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');
  };

  generateTags();


  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const tagsActive = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let tagActive of tagsActive) {

      /* remove class active */
      tagActive.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll(href);

    /* START LOOP: for each found tag link */
    for (let tagLink of allTagLinks) {

      /* add class active */
      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~="${tag}"]`);

  };

  const addClickListenersToTags = function () {
    /* find all links to tags */
    const allTags = document.querySelectorAll(optArticleTagsLink);

    /* START LOOP: for each link */
    for (let tag of allTags) {

      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const generateAuthors = function () {

    const allArticles = document.querySelectorAll(optArticleSelector);

    for (let article of allArticles) {

      let author = article.getAttribute('data-author');

      let htmlVariable = `<a href="#author-${author}">${author}</a>`;

      let autorWraper = article.querySelector(optArticleAuthorsSelector);

      autorWraper.insertAdjacentHTML('beforeEnd', htmlVariable);

    }
  };

  generateAuthors();


  const authorClickHandler = function (event) {

    event.preventDefault();

    const clickedElement = this;

    const href = clickedElement.getAttribute('href');

    const author = href.replace('#author-', '');

    generateTitleLinks(`[data-author="${author}"]`);

  };

  const addClickListenersToAuthors = function () {

    const allAuthors = document.querySelectorAll(optArticleAuthorsSelectorLink);

    for (let author of allAuthors) {
      author.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();


}