const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const composeQuerystring = (query) => {
    let str = '?'
    for(let i in query){
        str += `${i}=${ query[i] }`;
        str +="&"
    }
    return str;
};

export default {
    validateEmail,
    composeQuerystring
};
