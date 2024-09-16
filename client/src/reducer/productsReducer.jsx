const productsReducer = (state, action) => {
     switch (action.type) {
        case "API_DATA":
            return {
                ...state,
                products: [...state.products, action.payload]

            }
        case "ADD_TO_CART":
            const productExists = state.cartProducts.find(product => product.id === action.payload.product.id);
            
            return  (!productExists)? {
                ...state,
                cartProducts: [...state.cartProducts, { ...action.payload.product, quantity: action.payload.quantity }]
            } :  {
                ...state,
                cartProducts: state.cartProducts.map(product =>
                    product.id === action.payload.product.id
                        ? { ...product, quantity: product.quantity + action.payload.quantity }
                        : product
                )
            }
            
        case "REMOVE_FROM_CART":
            const filteredUsers = state.cartProducts.filter(product => product.id !== action.payload);
            return {
                ...state,
                cartProducts: filteredUsers

            }
           
        case "PRODUCT_FILTER":
            return {
                ...state,
                searchProducts: [ action.payload]

            }
            
        case "PRODUCT_SEARCH":
            return {
                ...state,
                searchProducts: [ action.payload]

            }
            
        case "RELETER_PRODUCTS":
            return {
                ...state,
                relatedProducts: [ action.payload]

            }

        case "ADD_TO_FAVORITES":
                return {
                    ...state,
                    favoriteProducts: [...state.favoriteProducts, action.payload],
                };
        case "ADD_SALE_PRODUCTS":
                return {
                    ...state,
                    saleProducts: [...state.saleProducts, action.payload],
                };
        case "REMOVE_FROM_FAVORITES":
                return {
                    ...state,
                    favoriteProducts: state.favoriteProducts.filter(product => product.id !== action.payload),
                };    
        case "SET_MESSAGE":
                return {
                    ...state,
                    showMessage: action.payload
                };    
                    
        case "SET_IMAGE":
                return {
                    ...state,
                    image: action.payload
                };    
        case "SET_MODEL":
                return {
                    ...state,
                    isModelOpen: action.payload
                };    
        case "SET_LOADING":
                return {
                    ...state,
                    isLoading: action.payload
                };    
                    
        case "SET_LOGIN":
                return {
                    ...state,
                    isLogin: action.payload
                };    
                    
        case "SET_AVATAR":
                return {
                    ...state,
                    avatar: action.payload
                };    

        case "sort_Criteria":
            return {
                ...state,
                sortCriteria: action.payload
            };               
     
        default:
            break;
     }
}


export default productsReducer;