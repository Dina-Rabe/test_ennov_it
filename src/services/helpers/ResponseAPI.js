
export const returnedreponse = async (response) => {
    if (response.ok) {
        let result = await response.json()
        return {"success": true, "data": result}
    } else {
        if (response.status === 401) {
            let result = await response.text()
            return {"success": false, "data":result}
        } else {
            throw new Error('erreur backend');
        }
    }
};