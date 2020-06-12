let AppService = () => {
    return {        
        getBlogs: () => {
            let blogsData = require('../config/blogs.json');
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    resolve({data: blogsData});
                };
                xhr.onerror = reject;
                xhr.open('GET', '/');
                xhr.send();
            })
        }
    }
}

export default AppService();