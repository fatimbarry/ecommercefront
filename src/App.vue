<template>
  <div id="app">
    <HeaderComponent :cart="cart" :wishlist="wishlist" />
    <router-view v-model:cart="cart"  @updateCart="updateCart"
    @add-to-cart="addToCart" 
    :wishlist="wishlist" 
    @Quick-View="addToWishlist" 
    @remove-from-wishlist="removeFromWishlist" 
    ></router-view>
    <FooterComponent />
    
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import Swal from 'sweetalert2';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  },

  data() {
    return {
      cart: [],
      wishlist: [],
      localCart: []  // Ajout d'une copie locale du panier
    }
  },

  methods: {
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          photo:product.photo
        });
      }
      
      // Afficher une notification
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${product.name} a été ajouté au panier`,
        showConfirmButton: false,
        timer: 3000
      });
    },

    addToWishlist(product) {
      if (!this.wishlist.some(item => item.id === product.id)) {
        this.wishlist.push(product);
        
        // Afficher une notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `${product.name} a été ajouté à la liste de souhaits`,
          showConfirmButton: false,
          timer: 3000
        });
      }
    },

    updateCart(newItem) {
      const existingProduct = this.localCart.find(item => item.id === newItem.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.localCart.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1
        });
      }

      // Copier le localCart dans le cart pour maintenir la réactivité
      this.cart = [...this.localCart];

      // Afficher une notification
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${newItem.name} a été mis à jour dans le panier`,
        showConfirmButton: false,
        timer: 3000
      });
    },

    loadCart() {
      // Implémentez ici la logique pour charger le panier
      this.localCart = [...this.cart];  // Charger le panier dans la copie locale
    }
  },

  created() {
    // Charger le panier au démarrage du composant
    this.loadCart();
  }
}

</script>