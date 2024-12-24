import { BASE_URL } from "../../../constant/Path";


export async function ControlSettings(token: string)
{
    let endPoint = 'settings/controls'
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'GET',    
        headers: {    
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
        }, 
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      return await response.json()
}

export async function AuthControlUpdate(auth: string, token: string)
{
    let endPoint = `settings/auth-control`
    let ApiUrl = `${BASE_URL}${endPoint}`

    const response = await fetch(ApiUrl, 
    {
        method: 'PUT',    
        headers: {    
          'Content-Type': 'application/json',      
          'Authorization': `Bearer ${token}`     
        },
        body: JSON.stringify({ auth: auth,  }),    
      })     
      if(!response.ok)
      {
         throw new Error(`HTTP Error! status: ${response.status}`)
      }     
      const x: any = await response.json() 
      return x
}

