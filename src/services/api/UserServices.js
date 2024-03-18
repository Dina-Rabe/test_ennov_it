import {returnedreponse} from "../helpers/ResponseAPI"

export async function login(user, password) {
    const response = await fetch('https://fakestoreapi.com/auth/login',{
        method:'POST',
        body:JSON.stringify({
            username: user,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return returnedreponse(response)
}

export async function register(data) {
    const response = await fetch('https://fakestoreapi.com/users',{
        method:"POST",
        body:JSON.stringify(
            data
        ),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return returnedreponse(response)
}