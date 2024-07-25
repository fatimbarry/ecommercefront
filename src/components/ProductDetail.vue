<template>
	<!-- NAVIGATION -->
	<nav id="navigation">
			<!-- container -->
			<div class="container">
				<!-- responsive-nav -->
				<div id="responsive-nav">
					<!-- NAV -->
					<ul class="main-nav nav navbar-nav">
						<li class="active"><router-link to="/">Home</router-link></li>
						<li><router-link to="/shop">Shop</router-link></li>
						<!-- <li><a href="#">Categories</a></li>
						<li><a href="#">Laptops</a></li> -->
						<li><a href="/faq">FAQ</a></li>
						<li><a href="/contact">Contact</a></li>
						<!-- <li><a href="#">Cameras</a></li>
						<li><a href="#">Accessories</a></li> -->
					</ul>
					<!-- /NAV -->
				</div>
				<!-- /responsive-nav -->
			</div>
			<!-- /container -->
		</nav>
		<!-- /NAVIGATION -->
		<div id="breadcrumb" class="section">
			<!-- container -->
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<ul class="breadcrumb-tree">
							<li><a href="#">Home</a></li>
							<li><a href="#">All Categories</a></li>
							<li><a href="#">Accessories</a></li>
							<li class="active">Headphones (227,490 Results)</li>
						</ul>
					</div>
				</div>
				<!-- /row -->
			</div>
			<!-- /container -->
		</div>
	<div class="section">
	<div class="container">
		<div class="row" v-if="product">
		<!-- Product main img -->
		<div class="col-md-6">
			<div id="product-main-img">
			<div class="product-preview">
				<img :src="'http://localhost:8000/storage/' + product.photo" alt="Product Image" class="img-fluid">
			</div>
			</div>
		</div>
  
		<!-- Product details -->
		<div class="col-md-6">
			<div class="product-details">
			<h2 class="product-name">{{ product.name }}</h2>
			<div class="rating-review">
				<div class="product-rating">
				<i v-for="n in 5" :key="n" :class="['fa', n <= product.rating ? 'fa-star' : 'fa-star-o']"></i>
				</div>
				<!-- <a class="review-link" href="#">{{ product.reviews_count }} Review(s) | Add your review</a> -->
			</div>
			<div class="product-price-stock">
				<h3 class="product-price">
				{{ product.price }} FCFA 
				<del v-if="product.old_price" class="product-old-price">{{ product.old_price }} FCFA</del>
				</h3>
				<span class="product-available" v-if="product.quantity > 0">In Stock</span>
				<span class="out-of-stock" v-else>Out of Stock</span>
			</div>
			<p class="product-description">{{ product.description }}</p>
  
			<div class="add-to-cart">
				<div class="qty-label">
				<!-- Qty -->
				<!-- <div class="input-number">
					<input type="number" v-model.number="quantity" min="1">
					<span class="qty-up" @click="increaseQuantity">+</span>
					<span class="qty-down" @click="decreaseQuantity">-</span>
				</div> -->
				</div>
				<button class="add-to-cart-btn" @click="$emit('add-to-cart', product)" :disabled="product.quantity <= 0">
				<i class="fa fa-shopping-cart"></i> add to cart
				</button>
			</div>
  
			<div class="product-meta">
				<!-- <ul class="product-btns">
				<li><a href="#"><i class="fa fa-heart-o"></i> add to wishlist</a></li>
				<li><a href="#"><i class="fa fa-exchange"></i> add to compare</a></li>
				</ul> -->
  
				<ul class="product-links">
				<li>Category:</li>
				<li><a href="#">{{ product.category }}</a></li>
				</ul>
  
				
			</div>
			</div>
		</div>
		</div>
	</div>
	</div>
  </template>
  

  <script>
  export default {
    name: 'ProductDetail',
    props: ['id'],
    data() {
      return {
        product: null,
        quantity: 1
      };
    },
    created() {
      this.fetchProductDetails();
    },
    methods: {
      increaseQuantity() {
        this.quantity++;
      },
      decreaseQuantity() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
      fetchProductDetails() {
        console.log(`Fetching product details for ID: ${this.id}`);
        fetch(`http://localhost:8000/api/products/show/${this.id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Product data:', data);
            this.product = data;
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
      }
    }
  };
  </script>
  <style scoped>
  .section {
	padding: 40px 0;
  }
  .container {
	max-width: 1200px;
	margin: 0 auto;
  }
  .img-fluid {
	max-width: 400px;
	height: auto;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .product-details {
	padding: 20px;
	background-color: #fff;
	border: 1px solid #eaeaea;
	border-radius: 8px;
  }
  .product-name {
	margin-bottom: 15px;
  }
  .rating-review {
	display: flex;
	align-items: center;
	margin-bottom: 15px;
  }
  .product-rating {
	margin-right: 10px;
  }
  .product-rating .fa {
	color: #ffcc00;
  }
  .product-price-stock {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
  }
  .product-price {
	margin: 0;
  }
  .product-old-price {
	color: #999;
	margin-left: 10px;
  }
  .product-available {
	color: #28a745;
	font-weight: bold;
  }
  .out-of-stock {
	color: #dc3545;
	font-weight: bold;
  }
  .product-description {
	margin-bottom: 20px;
  }
  .add-to-cart {
	display: flex;
	align-items: center;
	margin-bottom: 20px;
  }
  .qty-label {
	margin-right: 15px;
  }
  .input-number {
	display: inline-flex;
	align-items: center;
  }
  .add-to-cart-btn {
	background-color: #ff5722;
	color: #fff;
	border: none;
	padding: 10px 20px;
	cursor: pointer;
	border-radius: 4px;
	transition: background-color 0.3s;
  }
  .add-to-cart-btn:hover {
	background-color: #e64a19;
  }
  .product-meta {
	border-top: 1px solid #eaeaea;
	padding-top: 20px;
  }
  .product-btns, .product-links, .product-share {
	list-style: none;
	padding: 0;
	margin-bottom: 10px;
  }
  .product-btns li, .product-links li, .product-share li {
	display: inline-block;
	margin-right: 10px;
  }
  </style>
  