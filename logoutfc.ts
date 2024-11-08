// components / BoardList / BoardList.tsx

... 생략 ...

const dispatch = useTypedDispatch();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const { isAuth } = useAuth();
  // console.log(isAuth);

  const handleLogin = () => {
    signInWithPopup(auth, provider) // 팝업 뜨게함 -> 로그인 하고나서
    .then(userCredential => { // 그 다음 과정은 여기서 처리
      // 구글로 로그인한 사람의 정보가 userCredential에 있음
      // console.log(userCredential);
      dispatch(
        setUser({
          email: userCredential.user.email,
          id: userCredential.user.uid,
        })
      );
    })
    .catch(error => {
      console.error(error);
    })
  }
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      dispatch(
        removeUser()
      );
    })
    .catch((error) => {
      console.error(error);
    })
  }
  
  ... 생략 ...
  
	    {
          isAuth ? <GoSignOut className={addButton} onClick={handleSignOut}/>
          :
          <FiLogIn className={addButton} onClick={handleLogin}/>
        }
      </div>
    </div>
  )
}

export default BoardList

---

// hooks / useAuth.ts

import { useTypedSelector } from './redux'

export function useAuth() {
  
  const {id, email} = useTypedSelector((state) => state.user);

  return {
    isAuth : !!email,
    email,
    id
  }
}

---
// stoer / slices / userSlice.ts 

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  id: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    removeUser : (state) => {
      state.email = '';
      state.id = '';
    }
  }
})

export  const { setUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
