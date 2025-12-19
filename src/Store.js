import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cupon } from "./cupon";
import Login from "./Login";
import api from "../axios";

// ---------------------------------------------------
//                 VEG PRODUCTS SLICE
// ---------------------------------------------------
export const fetchVegProducts = createAsyncThunk(
  "veg/fetchVeg",
  async () => {
    const res = await api.get("/getAllVeg");
    return res.data;
  }
);

const vegSlice = createSlice({
  name: "veg",
  initialState: {
    vegItems: [],
    loading: false,
    error: null,
  },
  reducers:{},
  extraReducers: (builder)=>{
      builder
       .addCase(fetchVegProducts.pending,(s)=>{
           s.loading = true;
       })
       .addCase(fetchVegProducts.fulfilled,(s,a)=>{
           s.loading = false;

           s.vegItems = Array.isArray(a.payload)
             ? a.payload
             : a.payload.data || [];
       })
       .addCase(fetchVegProducts.rejected,(s,a)=>{
           s.loading = false;
           s.error = a.error.message;
       });
  }
});


// ---------------------------------------------------
//                  NON-VEG PRODUCTS SLICE
// ---------------------------------------------------
export const fetchNonVegProducts = createAsyncThunk(
  "nonveg/fetchNonVegProducts",
  async () => {
    const res = await api.get("/getAllNonVeg");
    return res.data;
  }
);

const nonvegSlice = createSlice({
  name: "nonveg",
  initialState: {
    nonVegItems: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchNonVegProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNonVegProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.nonVegItems = Array.isArray(action.payload)
          ? action.payload
          : action.payload.products || [];
      })
      .addCase(fetchNonVegProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ---------------------------------------------------
//                  DRINKS SLICE
// ---------------------------------------------------
export const fetchDrinks = createAsyncThunk("drinks/fetchDrinks", async () => {
  const res = await api.get("/getAllDrinks");
  return res.data;
});

const drinksSlice = createSlice({
  name: "drinks",
  initialState: {
    drinkItems: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDrinks.fulfilled, (state, action) => {
        state.loading = false;
        state.drinkItems = action.payload.data || action.payload;
      })
      .addCase(fetchDrinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ---------------------------------------------------
//                     COUPON SLICE
// ---------------------------------------------------
const Couponslice = createSlice({
  name: "coupon",
  initialState: {
    code: "",
    discount: 0,
    applied: false,
    message: "",
  },

  reducers: {
    applyCoupon: (state, action) => {
      const code = action.payload.toUpperCase();

      if (cupon[code]) {
        state.code = code;
        state.discount = cupon[code];
        state.applied = true;
        state.message = `Coupon ${code} applied! You got ${cupon[code]}% off.`;
      } else {
        state.message = "Invalid coupon code.";
      }
    },
  },
});

export const { applyCoupon } = Couponslice.actions;

// ---------------------------------------------------
//                        CART SLICE
// ---------------------------------------------------
const cartslice = createSlice({
  name: "cart",
  initialState: [],

  reducers: {
    addToCart: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removefromcart: (state, action) => {
      const index = state.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },

    increaseQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const item = state.find((i) => i.id === action.payload.id);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const {
  addToCart,
  removefromcart,
  increaseQuantity,
  decreaseQuantity,
} = cartslice.actions;

// ---------------------------------------------------
//                       ORDER THUNKS
// ---------------------------------------------------
// ===================placeOrderThunk.js===============

export const placeOrder = createAsyncThunk(
  "order/post",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/orders",
        orderData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error placing order");
    }
  }
);


const postOrderSlice = createSlice({
  name: "postOrder",

  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =
          action.payload.message || "Order placed successfully!";
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// =================getOrdersThunk.js===================
export const getOrders = createAsyncThunk(
  "order/get",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/orders/getAll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.data;

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching orders"
      );
    }
  }
);

const getOrderSlice = createSlice({
  name: "getOrders",

  initialState: {
    loading: false,
    error: null,
    orders: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;

        // if API returns { orders: [...] }
        state.orders = action.payload.data;

        // if API returns just array, use:
        // state.orders = action.payload;
      })

      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // now this is only string
      });
  }
});



// ===================== Registration Thunk =====================
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (formData) => {
    const response = await api.post("/register",formData);
    return response.data;
  }
);

// ===================== Registration Slice 
const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    user: null,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export const LoginUser = createAsyncThunk(
  "Login/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", formData);

      // Save token in localStorage
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      return res.data; // return user + token
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// --------------------------------------------------------
// 🔥 LOGIN SLICE
// --------------------------------------------------------
const LoginSlice = createSlice({
  name: "Login",

  initialState: {
    loading: false,
    error: null,

    // ✅ load user + token from storage
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");   // ✅ remove user
    },
  },

  extraReducers: (builder) => {
    builder

      // ----- Pending -----
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ----- Success -----
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;

        // ✅ Save token
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }

        // ✅ SAVE user
        if (action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })

      // ----- Failed -----
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        localStorage.removeItem("token");
        localStorage.removeItem("user");   // ✅ remove user
      });
  },
});


// ---------------------------------------------------
//                  HOME PRODUCTS SLICE
// ---------------------------------------------------
export const fetchHomeProducts = createAsyncThunk(
  "home/fetchHomeProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/home/getAll");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch home products"
      );
    }
  }
);

const homeSlice = createSlice({
  name: "home",

  initialState: {
    homeItems: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // ---------- PENDING ----------
      .addCase(fetchHomeProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ---------- SUCCESS ----------
      .addCase(fetchHomeProducts.fulfilled, (state, action) => {
        state.loading = false;

        // if API returns array directly
        state.homeItems = Array.isArray(action.payload)
          ? action.payload
          : action.payload.data || [];
      })

      // ---------- FAILED ----------
      .addCase(fetchHomeProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



// ---------------------------------------------------
//                     STORE CONFIG
// ---------------------------------------------------
const store = configureStore({
  reducer: {
    cart: cartslice.reducer,
    coupon: Couponslice.reducer,
    veg: vegSlice.reducer,
    nonveg: nonvegSlice.reducer,
    drinks: drinksSlice.reducer,
    postOrder: postOrderSlice.reducer,
    getOrders: getOrderSlice.reducer,
    // auth : authSlice.reducer,
    registration : registrationSlice.reducer,
     Login: LoginSlice.reducer,
       home: homeSlice.reducer,
    

  },
});



export default store;
