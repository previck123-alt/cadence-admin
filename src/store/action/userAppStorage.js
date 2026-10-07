export const SIGNUP_USER = "SIGNUP_USER";
export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const LOG_ADMIN_IN = 'LOG_ADMIN_IN'
export const LOGOUT = 'LOGOUT'
export const GET_THEME = 'GET_THEME'

export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USER = 'FETCH_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'


export const FETCH_HISTORY = 'FETCH_HISTORY'
export const UPDATE_HISTORY = 'UPDATE_HISTORY'


export const FETCH_LOAN = 'FETCH_LOAN'
export const UPDATE_LOAN = 'UPDATE_LOAN'



export const FETCH_CARD = 'FETCH_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'


export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'




export const UPDATE_ADMIN = 'UPDATE_ADMIN'



//pure functions to calculate the time remaining

let calculateRemainingTime = (expiryDate) => {
  //getting current time in milliseconds
  const currentTime = new Date().getMilliseconds()
  //getting expiration time in milliseconds
  const adjustExpirationTime = (expiryDate * 60 * 60 * 1000)
  const timeLeft = adjustExpirationTime - currentTime
  return timeLeft
}

/* admin section */
let retrievedAdminStoredToken = () => {
  let tokenFromStorage = localStorage.getItem('admin_token')
  let expiryDate = localStorage.getItem('admin_expiry')
  const timeLeft = calculateRemainingTime(expiryDate)

  if (timeLeft <= 3600) {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_expiry')
    localStorage.removeItem('admin')

    return {
      adminToken: "",
      adminExpiresIn: ""
    }
  }

  return {
    adminToken: tokenFromStorage,
    adminExpiresIn: timeLeft
  }
}

//https://bitverafinance-backend.onrenderxxx.com

export const checkIfAdminIsLoggedIn = () => {
  return async (dispatch, getState) => {
    try {
      let response
      //check if token is expired
      let { adminToken, adminExpiresIn } = retrievedAdminStoredToken()

      if (!adminToken) {
        return
      }
      //convert expiresIN backt to hours
      adminExpiresIn = adminExpiresIn / (60 * 60 * 1000)

      localStorage.setItem('admin_token', adminToken)
      localStorage.setItem('admin_expiry', adminExpiresIn)

      let admin = JSON.parse(localStorage.getItem('admin'))

      if (!admin) {
        return
      }
      response = await fetch(`http://localhost:8082/adminbytoken`, {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      
      if (response.status == 200) {
        let data = await response.json()
        data.response.token = adminToken
        dispatch({ type: LOG_ADMIN_IN, payload: data.response })
      }
    } catch (err) {

    }
  }
}



export const loginAdmin = (data) => {
  let dataObj = data
  return async (dispatch, getState) => {
    try {
      let response = await fetch('http://localhost:8082/adminlogin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/adminsignup'
        }
      }

      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/adminlogin'
        }
      }


      if (response.status === 200) {
        let data = await response.json()
        //saving credentials to local storage

        localStorage.setItem("admin", JSON.stringify(data.response.admin))

        localStorage.setItem("admin_token", JSON.stringify(data.response.token))

        localStorage.setItem("admin_expiry", JSON.stringify(data.response.expiresIn))
        //dispatch login events
        dispatch({ type: LOGIN_ADMIN, payload: data.response })
        return {
          bool: true,
          message: data.response,
          url: `/users`
        }
      }
    }
    catch (err) {
      return {
        bool: false,
        message: err.message,
        url: `/adminlogin`
      }
    }
  }

}
export const signupAdmin = (data) => {
  let dataObj = data
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`http://localhost:8082/adminsignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/adminsignup'
        }
      }

      if (response.status === 301) {
        let data = await response.json()

        return {
          bool: false,
          message: data.response,
          url: '/adminlogin'
        }
      }
   

      if (response.status === 200) {
        let data = await response.json()
        localStorage.setItem("admin", JSON.stringify(data.response.admin))

        localStorage.setItem("admin_token", JSON.stringify(data.response.token))

        localStorage.setItem("admin_expiry", JSON.stringify(data.response.expiresIn))
        //dispatch login events
        dispatch({ type: LOGIN_ADMIN, payload: data.response })


        return {
          bool: true,
          message: data.response,
          url: `/users`
        }
      }

    }
    catch (err) {
      return {
        bool: false,
        message: err.message,
        url: `/adminsignup`
      }
    }
  }
}


export const fetchUsers = ()=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth
    try {
      let response = await fetch('http://localhost:8082/users', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
     
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }
       //an error 

      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_USERS,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const deleteUser = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth
   

    try {
      let response = await fetch(`http://localhost:8082/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:DELETE_USER,payload:id})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const updateUser = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      const apiUrl = 'http://localhost:8082'
      let response = await fetch(`${apiUrl}/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_USER,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}


//HISTORY methods
export const fetchHistory = (user)=>{
 
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`http://localhost:8082/history/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_HISTORY,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}
export const updateHistory = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`http://localhost:8082/history/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_HISTORY,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

//Loans methods
export const fetchLoan = (user)=>{
 
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`http://localhost:8082/loan/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_LOAN,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }
    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const updateLoan = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`http://localhost:8082/loan/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if(response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_LOAN,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

//account methods
export const fetchAccounts = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth
    try {
      let response = await fetch(`http://localhost:8082/admin-accounts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
     
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }
  
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_ACCOUNTS,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}


//https://back-end-kiaq.onrenderlll.com

export const deleteAccount = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth
    try {
      let response = await fetch(`http://localhost:8082/admin-accounts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:DELETE_ACCOUNT,payload:id})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const updateAccount = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth
    try {
      let response = await fetch(`http://localhost:8082/admin-accounts`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_HISTORY,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}
export const createAccount = (data,user)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`http://localhost:8082/admin-accounts/${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_ACCOUNTS,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}


//Loans methods
export const fetchCard = (user)=>{
 
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`http://localhost:8082/card/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_CARD,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }
    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}


//http://localhost:8082
export const updateCard = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`http://localhost:8082/card/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if(response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_CARD,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }
}


//admin update method
export const updateAdmin = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`http://localhost:8082/admin/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_ADMIN,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}


//credit and debit method
export const credit = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`http://localhost:8082/credit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_ACCOUNTS,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

export const debit = (data,user)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`http://localhost:8082/debit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_ACCOUNTS,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}



//fake https:///back-end-zf7t.onrender.com

//http://localhost:8082
export const sendEmail = (data,id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth
    try {
      let response = await fetch(`http://localhost:8082/sendemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_ADMIN,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}


export const logout = (id)=>{
  return async (dispatch, getState) => {

  }

}


















