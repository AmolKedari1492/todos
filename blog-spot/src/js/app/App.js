import React from 'react';

import '../../css/base.css';
import './App.css';

import Blogs from "../blogs/Blogs";

import LocalStorageService from "../../service/LocalStorage.service"
import AppService from "../../service/app.service"

import {
  BLOGS_DATA_LOCAL_STORAGE_KEY
} from "../../constant/app.constant";

const insertBlogsDataInLocalStorage = () => {
  // Blog.json is reading 
  // in async way
  AppService.getBlogs().then((resp) => {
    if (resp && resp.data && resp.data.length > 0) {
      let { data } = resp;

      // Format date for future reference 
      data.forEach((element, index) => {
        let date = new Date(element.published_date);
        element.id = index;
        element.date = date;
        element.dayOfMonth = date.getDate();
        element.month = date.getMonth();
        element.year = date.getFullYear();
      });
      
      data = JSON.stringify(resp.data)

      // Load blogs data in localstorage
      LocalStorageService.setData(BLOGS_DATA_LOCAL_STORAGE_KEY, data);
    }
  }, (error) => {
    console.error(error);
  })
}

class App extends React.Component {

  componentDidMount() {
    // check for localstorage data for blogs
    if (!LocalStorageService.alreadyInLocalStorage(BLOGS_DATA_LOCAL_STORAGE_KEY)) {
      insertBlogsDataInLocalStorage();
    }
  }

  render() {
    return (
      <div className="app">
        <Blogs />
      </div>
    );
  }
}

export default App;
