Object.defineProperty(exports,"__esModule",{value:true});var initialState=0;var currentWord=exports.currentWord=function currentWord(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];switch(action.type){case'DISPLAY_WORD':return action.index;case'DELETE_WORD':return Math.max(state-1,0);default:return state;}};