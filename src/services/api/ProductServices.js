import {returnedreponse} from "../helpers/ResponseAPI"

export async function fetchProduct() {
    const response = await fetch('https://fakestoreapi.com/products')
    return returnedreponse(response)
}

export async function fetchCategorie() {
    const response = await fetch('https://fakestoreapi.com/products/categories')
    return returnedreponse(response)
}

export async function postProduct(data) {
    const response = await fetch('https://fakestoreapi.com/products',{
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return returnedreponse(response)
}

export async function updateProduct(data) {
    var id = data.id
    delete data.id;
    const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
        method:'PUT',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return returnedreponse(response)
}

export async function deleteProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/users/${id}`,{
        method:'DELETE'
    })
    return returnedreponse(response)
}