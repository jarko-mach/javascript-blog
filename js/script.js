// const { data } = require("autoprefixer");

{

  'use strict';

  const options = {
    article: {
      selector: '.post',
      title: '.post-title',
      author: '.post-author',
      content: '.post-content',
      tags: '.post-tags .list',
    },
    lists: {
      articles: '.list.titles',
      tags: {
        selector: '.list.tags',
        classCount: 5,
        cloudClassPrefix: 'tag-size-',
      },
      authors: '.list.authors',
    },
    linksTo: {
      articles: '.list.titles a',
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  };

  // TITLES

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

  const addClickListenersToTitles = function () {

    const links = document.querySelectorAll(options.linksTo.articles);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  };

  const generateTitleLinks = function (customSelector = '') {

    // clear link list
    const linkList = document.querySelectorAll(options.lists.articles);

    for (let link of linkList) {
      link.innerHTML = '';
    }
    // read article id, read title, use insertAdjacentHTML
    const allArticles = document.querySelectorAll(options.article.selector + customSelector);

    for (let article of allArticles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(options.article.title).innerText;
      const articleHtmlStr = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      // document.querySelector(optTitleListSelector).innerHTML += articleHtmlStr;
      // replace with insertAdjacentHTML
      document.querySelector(options.lists.articles).insertAdjacentHTML('beforeEnd', articleHtmlStr);
    }

    addClickListenersToTitles();
  };

  generateTitleLinks();


  // TAGS

  const calculateTagsParams = function (params) {

    minValue = 1000000, maxValue = 0;

    for (let key in params) {
      if (minValue >= params[key]) {
        minValue = params[key];
      };
      if (maxValue <= params[key]) {
        maxValue = params[key];
      };
    }

    const searchValue = {};
    searchValue.max = maxValue;
    searchValue.min = minValue;
    return searchValue;
  }

  const calculateTagClass = function (tagCount, allTags) {

    //  read number of css classes
    let allClass = options.lists.tags.classCount;

    // find maximum value of all tags
    const maxValue = calculateTagsParams(allTags).max;

    // calculate the rate for a given number
    let tagRate = tagCount / maxValue;

    // there must be 'allClass'-number answers
    tagRate *= allClass;

    // round up to integers
    const tagClass = Math.round(tagRate);

    return options.lists.tags.cloudClassPrefix + tagClass;
  };

  const generateTags = function () {

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const allArticles = document.querySelectorAll(options.article.selector);

    /* START LOOP: for every article: */
    for (let article of allArticles) {

      /* find tags wrapper */
      let tagsWrapper = article.querySelector(options.article.tags);

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
        if (!allTags[tag]) {

          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.insertAdjacentHTML('beforeEnd', htmlVariable);

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(options.lists.tags.selector);
    const tagsParams = calculateTagsParams(allTags);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      console.log(tag)

      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += `<li><a class="${calculateTagClass(allTags[tag], allTags)}" href="#tag-${tag}">${tag}</a></li>`;

    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

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
    const allTagLinks = document.querySelectorAll(`[href="${href}"]`);

    /* START LOOP: for each found tag link */
    for (let tagLink of allTagLinks) {

      /* add class active */
      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~="${tag}"]`);

  };

  const addClickListenersToArticlesTags = function () {

    /* find all links to tags */
    const allTags = document.querySelectorAll(options.linksTo.tags);

    /* START LOOP: for each link */
    for (let tag of allTags) {
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  };

  addClickListenersToArticlesTags();

  // AUTHORS

  const generateAuthors = function () {

    let cloudAuthorsHtml = '';

    // create table of authors from all posts
    const authorsList = [];

    // selecting all posts
    const allAuthors = document.querySelectorAll('.post');

    for (let author of allAuthors) {

      let name = author.getAttribute('data-author');

      // create link for each post
      let authorHtml = `<li><a class="author-size-1" href="#author-${name}">${name} </a></li>`;

      let articleAuthorWrapper = author.querySelector('.post-author');
      articleAuthorWrapper.innerHTML = authorHtml;

      // add author only if it is not in the table
      if (authorsList.indexOf(name) == -1) {
        authorsList.push(name);

        // create html for authors claud
        cloudAuthorsHtml += authorHtml;
      }

    }

    let cloudAuthorWrapper = document.querySelector('.list.authors');
    cloudAuthorWrapper.innerHTML = cloudAuthorsHtml;

  };

  generateAuthors();


  const authorClickHandler = function (event) {

    event.preventDefault;
    const clickedElement = this;

    // find all href with authors and remove class active
    const allAuthors = document.querySelectorAll('[href^="#author"]');
    for (let author of allAuthors) {
      author.classList.remove('active');
    }

    // find author name 
    const clickedName = clickedElement.innerText;

    // find all html elements with author and selected name
    const allClickedNames = document.querySelectorAll(`[href^="#author-${clickedName}"]`);
    for (let clickedName of allClickedNames) {
      clickedName.classList.add('active');
    }

    // create list of articles
    generateTitleLinks(`[data-author="${clickedName}"]`);

  };

  const addClickListenersToAuthors = function () {

    const allAuthors = document.querySelectorAll('[href^="#author"]');

    for (let author of allAuthors) {
      author.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();

}