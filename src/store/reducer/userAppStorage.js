import {
    LOG_ADMIN_IN, LOGIN_ADMIN, FETCH_USERS, FETCH_USER, UPDATE_USER, DELETE_USER,
    UPDATE_ADMIN, UPDATE_HISTORY, FETCH_HISTORY, FETCH_ACCOUNTS, DELETE_ACCOUNT, UPDATE_ACCOUNT, FETCH_LOAN, UPDATE_LOAN, FETCH_CARD, UPDATE_CARD
} from "../action/userAppStorage";

const initialState = {
    adminToken: "",
    //expiresIn: "",
    admin: null,
    color: {
        background: '',
        importantText: '',
        normalText: '',
        fadeColor: '',
        blue: '',
        fadeButtonColor: '',
    },
    usersList: [],
    historyList: [],
    accountList: [],
    loanList: [],
    cardList: [],
}



export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_ADMIN_IN:
            return {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.token
            }
        case LOGIN_ADMIN:

            return {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.token,
                accountList: action.payload.accounts
            }

        case FETCH_USERS:
            return {
                ...state,
                usersList: action.payload
            }
        case FETCH_USER:
            return {
                ...state,
                usersList: action.payload
            }
        case UPDATE_USER:
            if (true) {
                let updatedUser = action.payload

                let newUserList = []
                for (let data of state.usersList) {
                    if (data._id.toString() === updatedUser._id.toString()) {
                        newUserList.push(updatedUser)
                    } else {
                        newUserList.push(data)
                    }
                }

                return {
                    ...state,
                    usersList: newUserList
                }
            }
        case DELETE_USER:
            if (true) {
                let userId = action.payload
                let newUser = state.usersList.filter(data => data._id !== userId)
                return {
                    ...state,
                    usersList: newUser
                }
            }

        case FETCH_HISTORY:
            return {
                ...state,
                historyList: action.payload
            }

        case UPDATE_HISTORY:
            if (true) {
                let updatedHistory = action.payload
                let newHistoryList = []
                for (let data of state.historyList) {
                    if (data._id.toString() === updatedHistory._id.toString()) {
                        newHistoryList.push(updatedHistory)
                    } else {
                        newHistoryList.push(data)
                    }
                }
                return {
                    ...state,
                    historyList: newHistoryList
                }
            }

        case FETCH_ACCOUNTS:
            return {
                ...state,
                accountList: action.payload
            }
        case UPDATE_ADMIN:
            if (true) {
                let updatedAdmin = action.payload
                return {
                    ...state,
                    admin: updatedAdmin
                }
            }
        case DELETE_ACCOUNT:
            if (true) {
                let accountId = action.payload
                let newAccount = state.accountList.filter(data => data._id !== accountId)
                return {
                    ...state,
                    accountList: newAccount
                }
            }
        case UPDATE_ACCOUNT:
            if (true) {
                let updatedAccount = action.payload

                let newAccountList = []
                for (let data of state.accountList) {
                    if (data._id.toString() === updatedAccount._id.toString()) {
                        newAccountList.push(updatedAccount)
                    } else {
                        newAccountList.push(data)
                    }
                }
                return {
                    ...state,
                    accountList: newAccountList
                }
            }
        case FETCH_LOAN:
            return {
                ...state,
                loanList: action.payload
            }
        case UPDATE_LOAN:
            if (true) {
                let updatedLoan = action.payload
                let newLoanList = []
                for (let data of state.loanList) {
                    if (data._id.toString() === updatedLoan._id.toString()) {
                        newLoanList.push(updatedLoan)
                    } else {
                        newLoanList.push(data)
                    }
                }
                return {
                    ...state,
                    loanList: newLoanList
                }
            }



        case FETCH_CARD:
            return {
                ...state,
                cardList: action.payload
            }
            
        case UPDATE_CARD:
            if (true) {
                let updatedCard = action.payload
                let newCardList = []
                for (let data of state.cardList) {
                    if (data._id.toString() === updatedCard._id.toString()) {
                        newCardList.push(updatedCard)
                    } else {
                        newCardList.push(data)
                    }
                }
                return {
                    ...state,
                    cardList: newCardList
                }
            }

        default:
            return state
    }
}





