import React from 'react';
import "../../../css/base.css";
import "./List.css";

import LocalStorageService from "../../../service/LocalStorage.service";

import {
    BlogItem
} from "../../../helper/blog.helper";


import {
    BLOGS_DATA_LOCAL_STORAGE_KEY,
    APP_ROUTES
} from "../../../constant/app.constant";

const LOAD_MORE_ITEM_COUNT = 5;
const LOAD_MORE_ACTION_TITLE = "More Articles";
const SORT_OPTIONS = {
    ASCENDING: 1,
    DESCENDING: -1
}

const BlogHeader = (props) => {
    let arrowClass = props.sortBy ===  SORT_OPTIONS.ASCENDING ? 'fa-arrow-up' : 'fa-arrow-down';
    return (<header className="app__header">
        <h1 className="text-pull-left">Blog</h1>
        <h4 className="text-pull-left" onClick={ props.onSort }>
            <span>Sort</span>
            <i class={`fa  ${ arrowClass } click }`}></i>
        </h4>
    </header>)
};

class List extends React.Component {
    state = {
        dummyList: [],
        list: [],
        filter: {},
        sortBy: SORT_OPTIONS.ASCENDING
    }

    componentDidMount() {
        // Get data from localstorage 
        // Store it for backup
        let dummyList = this.getDataFromLocalStorage();

        // Load first few itesm
        let list = dummyList.slice(this.state.list.length, LOAD_MORE_ITEM_COUNT);

        this.setState({
            dummyList,
            list
        });

        this.processFilterParams(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.processFilterParams(newProps);
    }

    processFilterParams = (props) => {
        // Find out filter token
        // process them and
        // store filters in state
        try {
            let location = props.location;
            let search = location.search;
            search = search.replace('?', '');
            let searchArr = search.split('&');
            let filter = {};

            let searchArrLen = searchArr.length;
            
            if(searchArrLen > 0) {
                for(let i = 0; i < searchArrLen; i++) {
            
                    let searchItem = searchArr[i].split("=");
                    if(searchItem.length === 2) {
                        let key = searchItem[0];
                        let value = decodeURI(searchItem[1]);
                        filter[key] = value;    
                    }
                }
            }
            this.setState({
                filter
            })
        } catch (e) {
            console.error(e);
        }
    }

    getDataFromLocalStorage = () => {
        let data = LocalStorageService.getData(BLOGS_DATA_LOCAL_STORAGE_KEY);
        data = data ? JSON.parse(data) : [];
        return data;
    }

    setDataFromLocalStorage = (data) => {
        let formattedData = data ? JSON.stringify(data) : [];
        LocalStorageService.setData(BLOGS_DATA_LOCAL_STORAGE_KEY, formattedData);
    }

    loadMore = () => {
        let { dummyList, list, filter } = this.state;

        // Get fitlered data
        if(Object.keys(filter).length > 0) {
            for(let i in filter) {
                dummyList = dummyList.filter(item => item[i] === filter[i]);
                list = list.filter(item => item[i] === filter[i]);
            }    
        }

        if (dummyList && list && dummyList.length === list.length) {
            return;
        }

        // Load more
        let newItems = dummyList.slice(list.length, LOAD_MORE_ITEM_COUNT + list.length);

        list = list.concat(newItems)
        this.setState({
            list
        });
    }

    onLike = (e, id) => {
        e.stopPropagation();
        e.preventDefault();

        let { dummyList, list } = this.state;
        list.forEach(item => {
            if (item.id === id) {
                item.likes = item.likes ? item.likes + 1 : 1;
            }
        })

        this.setDataFromLocalStorage(dummyList);

        this.setState({
            list,
            dummyList
        });
    }

    onBlogClick = (id) => {
        // Update route
        let url = `${APP_ROUTES.BLOG_URL}${id}`
        this.props.history.push(url);
    }

    onCategoryClick = (e, category) => {
        e.stopPropagation();
        e.preventDefault();

        // Update route with params
        let location = APP_ROUTES.BLOG_URL;
        location += `?category=${category}`;
        this.props.history.push(location);
    }

    onAuthorClick = (e, author) => {
        e.stopPropagation();
        e.preventDefault();

        // Update route with params
        let location = APP_ROUTES.BLOG_URL;
        location += `?author=${author}`;
        this.props.history.push(location);
    }

    onSort = () => {
        let { sortBy } = this.state;
        
        sortBy = sortBy * -1;

        this.setState({
            sortBy
        })
    }

    renderList = () => {
        let view = null;
        let { list, filter } = this.state;

        // Get filter items in list
        if(Object.keys(filter).length > 0) {
            for(let i in filter) {
                list = list.filter(item => item[i] === filter[i]);
            }    
        }

        if (list && list.length === 0) {
            return view;
        }

        // Sort list by date
        list = list.sort((item1, item2) => {
            let a = new Date(item1.date);
            let b = new Date(item2.date);

            if(a > b) {
                return 1
            } else if(a < b) {
                return -1
            } else {
                return 0;
            }
        });

        // Sort by option
        if(this.state.sortBy === SORT_OPTIONS.DESCENDING) {
            list = list.reverse();
        }


        view = <div className="blogs__list">
            {
                list.map((blog) => {
                    return <BlogItem key={`${blog.published_date}-${blog.id}`}
                        blog={blog}
                        onBlogClick={this.onBlogClick}
                        onLike={this.onLike}
                        onCategoryClick={this.onCategoryClick} 
                        onAuthorClick={ this.onAuthorClick } />
                })
            }
        </div>;

        return view;

    }

    renderAction = () => {
        let view = null;
        let { list, dummyList, filter } = this.state;

        if(Object.keys(filter).length > 0) {
            for(let i in filter) {
                dummyList = dummyList.filter(item => item[i] === filter[i]);
                list = list.filter(item => item[i] === filter[i]);
            }    
        }

        if ((list && list.length === 0) ||
            (list && dummyList && list.length === dummyList.length)) {
            return view;
        }

        view = <div className="blogs__action pull-center">
            <span className="blogs__action-load-more inline-block click"
                onClick={this.loadMore}>{LOAD_MORE_ACTION_TITLE}</span>
        </div>;

        return view;
    }

    render() {
        return (<div className="blogs">
            <BlogHeader sortBy={ this.state.sortBy } onSort={ this.onSort }/>
            {
                this.renderList()
            }
            {
                this.renderAction()
            }
        </div>)
    };
};


export default List;