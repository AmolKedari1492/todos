import React from 'react';

import "./Blog.css";
import "../../../css/base.css";

import LocalStorageService from "../../../service/LocalStorage.service";
import {
    BLOGS_DATA_LOCAL_STORAGE_KEY,
    APP_ROUTES
} from "../../../constant/app.constant";

import {
    BlogItem
} from "../../../helper/blog.helper";

const BlogImage = (props) => <div className="blog-image">
    <img alt="blogImage" src={props.url} />
</div>;

const BlogLikeInfo = (props) => <div>
    <i className="fa fa-heart"></i>
    <span>{props.likes}</span>
    {
        props.likes > 1
            ?
            'like'
            :
            'likes'
    }
</div>;

const BlogLikeAction = (props) => <div className="blog__action--like click" onClick={props.onLike}>
    <i className="fa fa-heart-o"></i>
    <span>Like</span>
</div>

class Blog extends React.Component {
    state = {
        blog: {},
        similarBlogs: [],
        blogIndex: undefined
    }
    data = []

    componentDidMount() {
        this.getBlog();
    }

    componentDidUpdate() {
        this.getBlog();
    }

    getBlog = () => {
        // Get route from params
        //  and fetch blog
        try {
            let pathArr = this.props.location.pathname.split('/');
            let blogIndex = pathArr[pathArr.length - 1];
            blogIndex = blogIndex * 1;
            this.data = LocalStorageService.getData(BLOGS_DATA_LOCAL_STORAGE_KEY);
            this.data = this.data ? JSON.parse(this.data) : [];
            let blog = this.data.find(elem => elem.id === blogIndex);
            if(blogIndex !== this.state.blogIndex) {
                window.scrollTo(500, 0);
                this.setState({
                    blogIndex,
                    blog
                }, () => {
                    this.getSimilarBlogs();
                });    
            }
        } catch(e) {
            console.error(e);
        }
    }

    getSimilarBlogs = () => {
        let { category } = this.state.blog;

        // Filter by using category
        let similarBlogs = this.data.filter(item => item.category === category && item.id !== this.state.blogIndex);
        
        this.setState({
            similarBlogs
        });
    }

    onLike = (e) => {
        // Update like count of current as well as data in localstorage
        e.stopPropagation();
        e.preventDefault();

        let { blog } = this.state;
        blog.likes = blog.likes ? blog.likes + 1 : 1;

        this.data[this.state.blogIndex] = blog;
        this.setState({
            blog
        });

        let data = JSON.stringify(this.data);
        LocalStorageService.setData(BLOGS_DATA_LOCAL_STORAGE_KEY, data);
    }

    onBlogClick = (id) => {
        // Update routes
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

    renderSimilarBlogs = () => {
        let view = null;
        let { similarBlogs } = this.state;
        if (similarBlogs && similarBlogs.length === 0) {
            return view;
        }

        view = <div className="blogs">
            <h3>Similar articles</h3>
            <div className="blog__other-section">
                <div className="blog__recommendation">
                    {
                        this.state.similarBlogs.map(blog => <BlogItem key={`${blog.published_date}-${blog.id}`}
                            blog={blog}
                            onBlogClick={this.onBlogClick}
                            onLike={this.onLike}
                            onCategoryClick={ this.onCategoryClick } 
                            onAuthorClick={ this.onAuthorClick } />)
                    }
                </div>
                <div className="blog__right-section"></div>
            </div>
        </div>;

        return view;
    }

    render() {
        let { blog } = this.state;
        if (blog && !blog.title) {
            return null;
        }

        return (<div className="blog">
            <BlogImage url={blog.imgs.large} />
            <div className="blog-section">
                <div className="blog-data">
                    <div className="blog__title">{blog.title}</div>
                    <div className="blog__primary-data">
                        <div className="blog__author-initial">{blog.author[0]}</div>
                        <div>
                            <div className="blog__author click" onClick={ (e) => this.onAuthorClick(e, blog.author) } >{blog.author}</div>
                            <div className="blog__category click" onClick={ (e) => this.onCategoryClick(e, blog.category) } >{blog.category}</div>
                        </div>
                        <div className="blog__published-on">{`Published on ${blog.dayOfMonth}/${blog.month}/${blog.year}`}</div>
                    </div>
                    <div className="blog__content">
                        {blog.description}
                    </div>
                    <div className="blog__popularity">
                        {
                            blog.likes > 0
                                ?
                                <BlogLikeInfo likes={blog.likes} />
                                :
                                null
                        }
                        <div className="blog__actions">
                            <BlogLikeAction onLike={this.onLike} />
                        </div>
                    </div>
                </div>
                <div className="blog-sidebar">
                </div>
            </div>
            {
                this.renderSimilarBlogs()
            }
        </div>)
    };
};

export default Blog;

