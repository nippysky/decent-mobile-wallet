// tokenSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AltTokenReturnType } from "@/lib/constants/types";

interface TokenState {
  altTokens: AltTokenReturnType[];
}

const initialState: TokenState = {
  altTokens: [],
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokensData(state, action: PayloadAction<TokenState>) {
      return { ...state, ...action.payload };
    },

    reset() {
      return initialState;
    },
  },
});

export const { setTokensData, reset } = tokenSlice.actions;

export default tokenSlice.reducer;
