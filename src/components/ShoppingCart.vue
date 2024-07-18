<template>
    <main>

<!-- breadcrumb area start -->
<section class="breadcrumb__area include-bg pt-95 pb-50">
   <div class="container">
      <div class="row">
         <div class="col-xxl-12">
            <div class="breadcrumb__content p-relative z-index-1">
               <h3 class="breadcrumb__title">Shopping Cart</h3>
               <div class="breadcrumb__list">
                  <span><a href="#">Home</a></span>
                  <span>Shopping Cart</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<!-- breadcrumb area end -->

<!-- cart area start -->
<section class="tp-cart-area pb-120">
    <div class="container">
      <div class="row">
        <div class="col-xl-9 col-lg-8">
          <div class="tp-cart-list mb-25 mr-30">
            <table class="table">
              <thead>
                <tr>
                  <th colspan="2" class="tp-cart-header-product">Product</th>
                  <th class="tp-cart-header-price">Price</th>
                  <th class="tp-cart-header-quantity">Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart" :key="item.id">
                  <td class="tp-cart-img"><a href="#"> <img :src="'http://127.0.0.1:8000/storage/' + item.photo" :alt="item.name"></a></td>
                  <td class="tp-cart-title"><a href="#">{{ item.name }}</a></td>
                  <td class="tp-cart-price"><span>${{ formatPrice(item.price) }}</span></td>
                  <td class="tp-cart-quantity">
                    <div class="tp-product-quantity mt-10 mb-10">
                      <span class="tp-cart-minus" @click="decreaseQuantity(item)">
                        <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                                                             
                      </span>
                      <input class="tp-cart-input" type="text" :value="item.quantity" readonly>
                      <span class="tp-cart-plus" @click="increaseQuantity(item)">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 1V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M1 5H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </td>
                  <td class="tp-cart-action">
                    <button class="tp-cart-action-btn" @click="removeItem(item)">
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
        </div>
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="tp-cart-checkout-wrapper">
            <div class="tp-cart-checkout-top d-flex align-items-center justify-content-between">
              <span class="tp-cart-checkout-top-title">Subtotal</span>
              <span class="tp-cart-checkout-top-price">${{ formatPrice(cartTotal) }}</span>
            </div>
            <div class="tp-cart-checkout-proceed">
              <a href="checkout.html" class="tp-cart-checkout-btn w-100">Proceed to Checkout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
<!-- cart area end -->

</main>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'ShoppingCart',
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
    }
  },
  methods: {
    increaseQuantity(item) {
      const newCart = JSON.parse(JSON.stringify(this.cart)); // Copie profonde
      const updatedItem = newCart.find(cartItem => cartItem.id === item.id);
      if (updatedItem) {
        updatedItem.quantity = (updatedItem.quantity || 0) + 1;
      }
      this.$emit('update:cart', newCart);
      this.showToast(`Increased quantity of ${item.name}`);
    },
    decreaseQuantity(item) {
      const newCart = JSON.parse(JSON.stringify(this.cart)); // Copie profonde
      const updatedItem = newCart.find(cartItem => cartItem.id === item.id);
      if (updatedItem && updatedItem.quantity > 1) {
        updatedItem.quantity -= 1;
        this.$emit('update:cart', newCart);
        this.showToast(`Decreased quantity of ${item.name}`);
      }
    },
    removeItem(item) {
      const newCart = this.cart.filter(cartItem => cartItem.id !== item.id);
      this.$emit('update:cart', newCart);
      this.showToast(`Removed ${item.name} from cart`);
    },
    formatPrice(price) {
      return price != null ? Number(price).toFixed(2) : '0.00';
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