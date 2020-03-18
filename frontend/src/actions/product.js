import  API  from '../config';

export const List = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}

export const Read = (productid) => {
    return fetch(`${API}/product/${productid}`, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log(err)
    });
}