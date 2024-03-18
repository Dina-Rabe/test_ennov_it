import {returnedreponse} from "../helpers/ResponseAPI"

export async function fetchCart() {
    const response = await fetch('https://fakestoreapi.com/carts')
    return returnedreponse(response)
}

