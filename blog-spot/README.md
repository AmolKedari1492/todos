# Steps to follow
1. Clone repo by using `git clone https://github.com/AmolKedari1492/BlogSpot.git` or download
2. Go to the project folder and install project dependency by running `npm install`
3. Run project using `npm start` which will start server 300

This project is created using create-react-app generator and follow its native folder structure.
To build run `npm run build` and `serve build` command

# Project 
This repo includes demo for blogs using javascript technology i.e. ReactJS. It is using few other libraries such as react-dom, react-router, HTML5, CSS3 and fontawesome for icon.

It has two pages, blog list page and blog detail page. Both of these having different routes/url. 
List pages includes list of blog, initially we have only 5 with `Show more` button. By click on `Show more` button it will load further blogs. 

Each blog item has name, category, author name, description, like and blog image. By clicking on blog, we can go into its details page.
We have like button for each blog which will show its popularity of respective blog.

Also, we have couple of actions on name, category; sorting on top where it sort ascending or descending by date. Actions on blog name, category name and author name will redirect you to blog detail and filter page with category and author's blog list page respectively. It will update url for with the action.

A blog detail page is having logo image and its basic details on below that. We have blog content with like action next to it. Like will add up its popularity count. 

A blog primary section has other actions like go for particular author's blog list or category list

Below blog section we have similar articles section where we have other blog list related to this blog category. By click on any of blog we will redirect to that particular blog. 

We have stored data in JSON file and importing that data using promise i.e. in async manner. We are storing this date in local storage and updating this data as per requirement on user's action.

An UI is responsive

`Here, sorting logic is implemented for date only and filter functionality is handled by giving action on blog post author and category. UI is responsive, unique routing for each action/step, browser back functionality is handled, list scroll position is maintained on browswer back and like/popularty count is maintained in list.`
