<template>
    <main>

<!-- breadcrumb area start -->
<section class="breadcrumb__area include-bg pt-95 pb-50" data-bg-color="#EFF1F5">
   <div class="container">
      <div class="row">
         <div class="col-xxl-12">
            <div class="breadcrumb__content p-relative z-index-1">
               <h3 class="breadcrumb__title">Checkout</h3>
               <div class="breadcrumb__list">
                  <span><a href="#">Home</a></span>
                  <span>Checkout</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<!-- breadcrumb area end -->

<!-- checkout area start -->
<section class="tp-checkout-area pb-120" data-bg-color="#EFF1F5">
   <div class="container">
      <form @submit.prevent="placeOrder">
         <div class="row">
            <div class="col-lg-7">
               <div class="tp-checkout-bill-area">
                  <h3 class="tp-checkout-bill-title">Billing Details</h3>
                  <div class="tp-checkout-bill-form">
                     <div class="tp-checkout-bill-inner">
                        <div class="row">
                           
                           <div class="col-md-6">
                              <div class="tp-checkout-input">
                                 <label>Name <span>*</span></label>
                                 <input type="text" placeholder="Last Name" name="name" v-model="billingDetails.name">
                              </div>
                           </div>
                           <div class="col-md-6">
                              <div class="tp-checkout-input">
                                 <label>First Name <span>*</span></label>
                                 <input type="text" placeholder="First Name" name="firstname" v-model="billingDetails.firstname">
                              </div>
                           </div>
                           <div class="col-md-12">
                              <div class="tp-checkout-input">
                                 <label>Email address <span>*</span></label>
                                 <input type="email" placeholder="" name="email" v-model="billingDetails.email">
                              </div>
                           </div>
                           <div class="col-md-12">
                              <div class="tp-checkout-input">
                                 <label>Address <span>*</span></label>
                                 <input type="text" placeholder="" name="address" v-model="billingDetails.address">
                              </div>
                           </div>
                           <div class="col-md-12">
                              <div class="tp-checkout-input">
                                 <label>Phone <span>*</span></label>
                                 <input type="text" placeholder="" name="phone_number" v-model="billingDetails.phone_number">
                              </div>
                           </div>
                           
                           
                           <div class="col-md-12">
                              <div class="tp-checkout-input">
                                 <label>Street address</label>
                                 <input type="text" placeholder="House number and street name" name="city" v-model="billingDetails.city">
                              </div>
                              
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-lg-5">
               <!-- checkout place order -->
               <div class="tp-checkout-place white-bg">
                  <h3 class="tp-checkout-place-title">Your Order</h3>
                  <div class="tp-order-info-list">
                     <ul>
                        <!-- header -->
                        <li class="tp-order-info-list-header">
                           <h4>Product</h4>
                           <h4>Total</h4>
                        </li>
                        <!-- item list -->
                        <li v-for="item in cart" :key="item.id" class="tp-order-info-list-desc">
                           <p>{{ item.name }} <span> x {{ item.quantity }}</span></p>
                           <span>${{ formatPrice(item.price * item.quantity) }}</span>
                        </li>
                        <!-- subtotal -->
                        <li class="tp-order-info-list-subtotal">
                           <span>Subtotal</span>
                           <span>{{ formatPrice(cartTotal) }} FCFA</span>
                        </li>
                        <!-- shipping -->
                        <li class="tp-order-info-list-shipping">
                           <span>Shipping</span>
                           <div class="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
                              <span>
                                 <input id="flat_rate" type="radio" name="shipping" v-model="shippingMethod" value="flat_rate">
                                 <label for="flat_rate">Flat rate: <span>2000 FCFA</span></label>
                              </span>
                              <span>
                                 <input id="local_pickup" type="radio" name="shipping" v-model="shippingMethod" value="local_pickup">
                                 <label for="local_pickup">Local pickup: <span>2500 FCFA</span></label>
                              </span>
                              <span>
                                 <input id="free_shipping" type="radio" name="shipping" v-model="shippingMethod" value="free_shipping">
                                 <label for="free_shipping">Free shipping</label>
                              </span>
                           </div>
                        </li>
                        <!-- total -->
                        <li class="tp-order-info-list-total">
                           <span>Total</span>
                           <span>{{ formatPrice(orderTotal) }} FCFA</span>
                        </li>
                     </ul>
                  </div>
                  <div class="tp-checkout-agree">
                     <div class="tp-checkout-option">
                        <input id="read_all" type="checkbox" v-model="agreementChecked">
                        <label for="read_all">I have read and agree to the website.</label>
                     </div>
                  </div>
                  <div class="tp-checkout-btn-wrapper">
                     <button type="submit" class="primary-btn order-submit" :class="{ 'disabled': !agreementChecked }">Place order</button>
                  </div>
               </div>
            </div>
         </div>
      </form>
   </div>
</section>
<!-- checkout area end -->

</main>

</template>

<script>
import Swal from 'sweetalert2'
import axios from '../services/axios.js'
export default {
  name: 'CheckoutComponent',
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      shippingMethod: 'flat_rate',
      agreementChecked: false,
      billingDetails: {
        name: '',
        firstname: '',
        email: '',
        address: '',
        phone_number: '',
        city: ''
        
        
      }
    }
  },

  mounted() {
    this.loadCustomerData();
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    shippingCost() {
      switch(this.shippingMethod) {
        case 'flat_rate': return 20;
        case 'local_pickup': return 25;
        case 'free_shipping': return 0;
        default: return 0;
      }
    },
    orderTotal() {
      return this.cartTotal + this.shippingCost;
    }
  },
  methods: {
    formatPrice(price) {
      return price.toFixed(2);
    },

    loadCustomerData() {
      const storedCustomerData = JSON.parse(localStorage.getItem('tempCustomerData') || '{}');
      if (storedCustomerData) {
        // Mise à jour des champs billingDetails avec les données stockées
        Object.keys(this.billingDetails).forEach(key => {
          if (storedCustomerData[key]) {
            this.billingDetails[key] = storedCustomerData[key];
          }
        });
      }
    },
  

    
    
    placeOrder() {
      //console.log('billingDetails:', this.billingDetails);
      
        const orderData = {
          ...this.billingDetails,
          total_amount: this.cartTotal,
          products: this.cart.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        };
        //console.log('orderData:', orderData);
        axios.post('/orders/store', orderData)
          .then(response => {
            if (response.data.success) {
              Swal.fire({
                title: 'Succès!',
                text: 'Votre commande a été placée avec succès.',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                this.$router.push('/');
                this.$emit('clear-cart');
              });
            } else {
              this.showError('Une erreur est survenue lors de la commande.');
            }
          })
          .catch(error => {
            console.error('Error placing order:', error);
            this.showError('Une erreur est survenue lors de la commande.');
          });
      
    },
    
    showError(message) {
      Swal.fire({
        title: 'Erreur!',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  },

  
}
</script>