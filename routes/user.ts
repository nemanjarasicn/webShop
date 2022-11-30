import { execute } from './db/mysql'
import {giveAccess, killCookie, simpleVerifyJWT} from "./jwt/jwt";
import {IUser} from "./Interfaces/user.interface";

const _TB_NAME = `user`

const getUserData = async (user_id: number) =>{
    const sql: string = "SELECT ??, ??, ??, ??, ??, ??, ??  FROM ?? WHERE ?? = ?";
    const params = [`id`, `username`, `firstname`, `lastname`, `rule_id`, `phone`, `email`, _TB_NAME, `id`, user_id]

    return execute({sql, params, single: true})
}

const login = async (params: {username: string, password: string, save_me: boolean}) =>{
    const sql = `SELECT ??, ??, ??, ??, ??, ??, ??  FROM ?? WHERE ?? = ? AND ?? = ? AND ?? = SHA2(?, 256)`
    const queryParams = [`id`, `username`, `firstname`, `lastname`, `rule_id`, `phone`, `email`, _TB_NAME, `rule_id`, 1, `username`, params.username, `password`, params.password]

    return await execute({sql, params: queryParams, single: true}) as IUser
}

const stillLogged = async (req): Promise<IUser | false> => {
    const token = req.session.jwt
    const payload = token? simpleVerifyJWT(token) : false as {user_id: number} | false

    if(payload){
        return await getUserData(payload.user_id) as IUser
    }

    return false
}

export async function user_endpoint(req, res){
    const action: string = req.params.action
    let returnValue: any = undefined

    switch(action){
        case 'isAlreadyLogged':
            returnValue = await stillLogged(req)
            res.status(200)
            break;
        case 'login': 
            returnValue = await login(req.body);
            if(returnValue?.id) giveAccess(req, {user_id: returnValue.id})
            res.status(200);
            break;
        case 'logout':
            killCookie(req)
            returnValue = true
            res.status(200);
            break;
        default:  res.status(404); break;
    }

    res.send(returnValue)
}
