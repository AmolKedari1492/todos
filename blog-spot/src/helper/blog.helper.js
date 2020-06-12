import React from 'react';

const BlogItemPublishedDate = (props) => {
    return (<div className="blog-item__date">{`${props.days}/${props.month}/${props.year}`}</div>)
};

const BlogCategory = (props) => <div className="blog-item__category click" onClick={ (e) => props.onCategoryClick(e, props.category) }>{props.category}</div>;

const BlogPopularity = (props) => <div className="blog-item__popularity">
    {
        props.likes &&
            props.likes > 0
            ?
            <span>
                <i className="fa fa-heart click" onClick={ (e) => props.onLike(e, props.id) } aria-hidden="true"></i>
                <span>
                    <span className="blog-item__popularity--count">{ props.likes }</span>
                    {
                        props.likes > 1
                        ?
                            'likes'
                        :
                            'like'
                    }
                </span>
            </span>
            :
            <i className="fa fa-heart-o click" onClick={ () => props.onLike(props.id) } aria-hidden="true"></i>
    }
</div>;

const BlogItem = (props) => {
    let blog = props.blog;
    return (<div className="blog-item" onClick={ () => props.onBlogClick( blog.id) }>
        <div className="blog-item__info">
            <div className="blog-item__meta-data">
                <BlogItemPublishedDate days={blog.dayOfMonth} month={blog.month} year={blog.year} />
                <BlogCategory category={blog.category} onCategoryClick={ props.onCategoryClick }/>
                <BlogPopularity likes={blog.likes} id={ blog.id } onLike={ props.onLike } />
            </div>
            <div className="blog-item__title click">{ blog.title }</div>
            <div className="blog-item__description">{ blog.description }</div>
            <div className="blog-item__author inline-block click" onClick={ (e) => props.onAuthorClick( e, blog.author) }>{ blog.author }</div>
        </div>
        <div className="blog-item__image">
            <img alt="blogImg" src={ blog.imgs.thumb }/>
        </div>
    </div>)
};

export {
    BlogItem,
    BlogItemPublishedDate,
    BlogPopularity,
    BlogCategory
};