const register = (): Promise<boolean | {msg?: string, done: boolean}> => {
    return new Promise(async (res, rej) => {

    })
}

export async function customers_endpoint(req, res){
    const action: string = req.params.action
    const params = req.body
    let returnValue: any = undefined

    switch(action){
        case 'register':
            returnValue = await register()
            res.status(200)
            break;
        default:  res.status(404); break;
    }

    res.send(returnValue)
}