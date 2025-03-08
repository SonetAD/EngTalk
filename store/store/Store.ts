import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { StoreType } from './StoreType';
import createAuthSlice from '../features/auth/authSlice';

const useStore = create<StoreType>()(immer((...a)=>({
    ...createAuthSlice(...a)
})))

export default useStore