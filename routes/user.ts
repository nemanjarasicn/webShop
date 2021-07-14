
//@ts-ignore
const pool = require('./db/mysql')

const _TB_NAME = "`user`"

const makeSession = (req, user_id: number) =>{
    const hour = 3600000
    req.session.cookie.expires = new Date(Date.now() + hour)
    req.session.cookie.maxAge = hour
    req.session.logged = true
    req.session.userid = user_id
}

const saveMe = (req, user_id: number) =>{
    const year = Number(3600000 * 24 * 365)
    req.session.cookie.expires = new Date(Date.now() + year)
    req.session.cookie.maxAge = year
    req.session.logged = true
    req.session.userid = user_id
}

const getUserData = async (user_id: number) =>{
    return new Promise((res, rej)=>{
        const sql: string = "SELECT `id`, `username`, `firstname`, `lastname`, `rule_id`, `phone`, `email`  FROM " + _TB_NAME + " WHERE `id` = ?";
        const queryParams: Array<any> = [user_id]
         pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify([true, results[0]] || [false, null])))
        });
    })
}

const login = async(params: {username: string, password: string, save_me: boolean}, req) =>{
    const sql: string = "SELECT `id`, `username`, `firstname`, `lastname`, `rule_id`, `phone`, `email`  FROM " + _TB_NAME + " WHERE `rule_id` = ? AND `username` = ? AND `password` = SHA2(?, 256)";
    const queryParams: Array<any> = [1, params.username, params.password]
    let user: any = await new Promise((res, rej)=>{
         pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(results[0] || false)))
        });
     })

    if(user !== false) {
        makeSession(req, user.id)
        if(params.save_me) saveMe(req, user.id)
    }
    
    return user
}

export async function user_endpoint(req, res){
    const action: string = req.params.action
    let returnValue: any = undefined

    switch(action){
        case 'isAlreadyLogged':
            if(req.session.userid !== undefined && req.session.logged === true){
                returnValue = await getUserData(req.session.cookie.userid || req.session.userid)
            }else returnValue = [false, null]
            res.status(200)
            break;
        case 'login': 
            returnValue = await login(req.body, req);
            res.status(200);
            break;

        default:  res.status(404); break;
    }

    res.send(returnValue)
}
