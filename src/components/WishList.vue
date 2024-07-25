<template>
   
   
   <main>

<!-- breadcrumb area start -->
<section class="breadcrumb__area include-bg pt-95 pb-50">
   <div class="container">
      <div class="row">
         <div class="col-xxl-12">
            <div class="breadcrumb__content p-relative z-index-1">
               <h3 class="breadcrumb__title">Wishlist</h3>
               <div class="breadcrumb__list">
                  <span><a href="#">Home</a></span>
                  <span>Wishlist</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<!-- breadcrumb area end -->

<!-- wishlist area start -->
<section class="tp-cart-area pb-120">
   <div class="container">
      <div class="row">
         <div class="col-xl-12">
            <div class="tp-cart-list mb-45 mr-30">
               <table class="table">
                  <thead>
                             <tr>
                               <th colspan="2" class="tp-cart-header-product">Product</th>
                               <th class="tp-cart-header-price">Price</th>
                               <th class="tp-cart-header-quantity">Quantity</th>
                               <th>Action</th>
                               <th></th>
                             </tr>
                           </thead>
                  <tbody>
                     <tr v-for="product in localWishlist" :key="product.id">
                        <!-- img -->
                        <td class="tp-cart-img"><a href="#"> <img :src="'http://127.0.0.1:8000/storage/' + product.photo" :alt="product.name"></a></td>
                        <!-- title -->
                        <td class="tp-cart-title"><a href="#">{{ product.name }}</a></td>
                        <!-- price -->
                        <td class="tp-cart-price"><span>{{ product.price }} FCFA</span></td>
                        <!-- quantity -->
                        <td class="tp-wishlist-quantity">
                           <div class="tp-product-quantity mt-10 mb-10">
                              <span class="tp-cart-minus" @click="decreaseQuantity(product)">
                                 <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                 </svg>                                                             
                              </span>
                              <input class="tp-cart-input" type="text" v-model.number="product.quantity">
                              <span class="tp-cart-plus" @click="increaseQuantity(product)">
                                 <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 1V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1 5H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                 </svg>
                              </span>
                           </div>
                        </td>
                        <td class="tp-cart-add-to-cart">
                           <button @click="addToCart(product)" type="button" class="tp-btn tp-btn-2 tp-btn-blue">Add To Cart</button>
                        </td>
                        <!-- action -->
                        <td class="tp-wishlist-action">
                           <button @click="removeFromWishlist(product)" class="tp-wishlist-action-btn">
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path fill-rule="evenodd" clip-rule="evenodd" d="M9.53033 1.53033C9.82322 1.23744 9.82322 0.762563 9.53033 0.46967C9.23744 0.176777 8.76256 0.176777 8.46967 0.46967L5 3.93934L1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L3.93934 5L0.46967 8.46967C0.176777 8.76256 0.176777 9.23744 0.46967 9.53033C0.762563 9.82322 1.23744 9.82322 1.53033 9.53033L5 6.06066L8.46967 9.53033C8.76256 9.82322 9.23744 9.82322 9.53033 9.53033C9.82322 9.23744 9.82322 8.76256 9.53033 8.46967L6.06066 5L9.53033 1.53033Z" fill="currentColor"/>
                              </svg>
                              <span>Remove</span>
                           </button>
                        </td>
                     </tr>
                  </tbody>
                </table>
            </div>
            <div class="tp-cart-bottom">
                        <div class="row align-items-end">
                           <div class="col-xl-6 col-md-4">
                              <div class="tp-cart-update">
                                 <router-link to="/ShoppingCart" class="tp-cart-update-btn">Go To Cart</router-link>
                                 
                              </div>
                           </div>
                        </div>
                     </div>
         </div>
      </div>
   </div>
</section>
<!-- wishlist area end -->
</main>
</template>
<script>
import Swal from 'sweetalert2';
export default {
   name: 'WishList',
   props: {
     wishlist: {
       type: Array,
       required: true
     }
   },
   data() {
     return {
       localWishlist: []
     }
   },
   watch: {
     wishlist: {
       immediate: true,
       deep: true,
       handler(newWishlist) {
         this.localWishlist = newWishlist.map(item => ({
           ...item,
           quantity: item.quantity || 1
         }));
       }
     }
   },
   methods: {
     addToCart(product) {
       this.$emit('add-to-cart', { ...product, quantity: product.quantity });
     },
     removeFromWishlist(product) {
       const index = this.localWishlist.findIndex(item => item.id === product.id);
       if (index !== -1) {
         this.localWishlist.splice(index, 1);
         this.updateWishlist();
         this.showToast(`Removed ${product.name} from wishlist`);
       }
     },
     increaseQuantity(product) {
       const item = this.localWishlist.find(item => item.id === product.id);
       if (item && item.quantity < 99) {
         item.quantity++;
         this.updateWishlist();
         this.showToast(`Increased quantity of ${product.name}`);
       }
     },
     decreaseQuantity(product) {
       const item = this.localWishlist.find(item => item.id === product.id);
       if (item && item.quantity > 1) {
         item.quantity--;
         this.updateWishlist();
         this.showToast(`Decreased quantity of ${product.name}`);
       }
     },
     updateWishlist() {
       this.$emit('update:wishlist', [...this.localWishlist]);
     },
     showToast(message) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 3000
      });
   }
 }
} 
</script>