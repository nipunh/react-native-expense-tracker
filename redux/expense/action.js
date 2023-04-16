import { firebase}  from '../../configs/firebaseConfig'

const db = firebase.firestore();

export const getUserExpense = uid => {
    return async (dispatch) => {
        try {
            
            dispatch({type : 'LOADING'})

            const data = await db
            .collection('users')
            .doc(uid)
            .collection('categories')
            .onSnapshot((doc) => {
              const expenseData = [];

              doc.docs.forEach((doc) => expenseData.push({...doc.data(), id : Math.random()}))

              dispatch({ type: 'GET_EXPENSES', expenseData: expenseData})
          });

            
        } catch (err) {
            console.log('Error : getUserExpense', err.message);
            dispatch({type : 'ERROR', errorMessage : err.message})
        }
    }
}

export const addExpense = (expense, uid) => {
    return async (dispatch) => {
      try {
        dispatch({type: 'LOADING'});
  
        const {category, id, ...data} = expense;
  
        await db.collection('users').doc(uid).collection('categories').doc(expense.category).update({
           expenses :  firebase.firestore.FieldValue.arrayUnion(data)
        })
  
        dispatch({type : 'RESET'})
  
      } catch (err) {
        console.log(err);
        dispatch({type: 'ERROR', errorMessage: err.message});
      }
    };
  };

  export const deleteExpense = (uid, category, expense) => {
    return async (dispatch) => {
      try {
        dispatch({type: 'LOADING'});
  
        await db.collection('users').doc(uid).collection('categories').doc(category).update({
           expenses :  firebase.firestore.FieldValue.arrayRemove(expense)
        })
  
        dispatch({type : 'RESET'})
  
      } catch (err) {
        console.log(err);
        dispatch({type: 'ERROR', errorMessage: err.message});
      }
    };
  };


export const reset = () => {return async (dispatch) => {dispatch({type : 'RESET'})}}