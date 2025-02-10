import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiService from "../services/apiService";

interface Product {
    id: number;
    productName: string;
    quantity: number;
    country: string;
    price: number;
    productGroup: number;
    productGroupName: string;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>("products/fetchProducts", async () => {
    return await apiService.get<Product[]>("/products");
});


export const createProduct = createAsyncThunk<Product, Omit<Product, "id">>("products/createProduct", 
    async (productData) => {
        return apiService.post<Product>("/products", productData);
    }
);

export const deleteProduct = createAsyncThunk<number, number>(
    "products/deleteProduct",
    async (productId) => {
        await apiService.delete(`/products/${productId}`);
        return productId;
    }
)


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!";
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.unshift(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      });
  },
});

export default productSlice.reducer;