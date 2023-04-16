import {firebase} from '../../configs/firebaseConfig';
import {getUserExpense} from '../expense/action';

const db = firebase.firestore();

export const loginUser = ({email, password}) => {
  return async (dispatch) => {
    try {
      dispatch({type: 'LOADING'});
      const doc = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      dispatch(getUserDoc(doc.user.uid));
      // dispatch({ type: 'LOGIN', userDetails: doc.user })
    } catch (err) {
      console.log('Error : loginUser', err.message);
      dispatch({type: 'ERROR', errorMessage: err.message});
    }
  };
};

export const getUserDoc = (uid) => {
  return async (dispatch) => {
    try {
      const user = await db.collection('users').doc(uid).get();

      dispatch(getUserExpense(uid));
      dispatch({type: 'LOGIN', userDetails: {...user.data(), id: uid}});
    } catch (err) {
      console.log('Error : loginUser', err.message);
      dispatch({type: 'ERROR', errorMessage: err.message});
    }
  };
};

export const signupUser = ({name, email, password}) => {
  return async (dispatch) => {
    try {
      dispatch({type: 'LOADING'});

      const batch = db.batch();

      const doc = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (doc !== null) {
        const user = doc.user;

        await user.updateProfile({
          displayName: name,
        });

        const userDoc = db.collection('users').doc(user.uid);

        batch.set(userDoc, {
          email: user.email,
          name: name,
        });

        const categories = [
          {
            name: 'Education',
          },
          {
            name: 'Food & Nutrition',
          },
          {
            name: 'Beauty & Care',
          },
          {
            name: 'Sports & Fitness',
          },
          {
            name: 'Clothing & Accessories',
          },
          {
            name: 'Electronics',
          },
        ];

        for await (const category of categories) {
          const docRef = db
            .collection('users')
            .doc(user.uid)
            .collection('categories')
            .doc(category.name);

          batch.set(docRef, {
            ...category,
            id: Math.random(),
            expenses: [
              {
                title: '',
                description: '',
                location: '',
                total: null,
                status: 0,
                id: Math.random(),
              },
            ],
          });
        }
      }

      await batch.commit();

      dispatch({type: 'SIGNUP'});
    } catch (err) {
      console.log(err.message);
      dispatch({type: 'ERROR', errorMessage: err.message});
    }
  };
};


export const logout = () => {
  return async (dispatch) => dispatch({type: 'LOGOUT'});
};

export const reset = () => {
  return async (dispatch) => {
    dispatch({type: 'RESET'});
  };
};
