Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    inventory: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      product: {
        name: "Sock",
        description: "Warm fuzzy sock"
      },
      details: ["80% cotton", "20% polyester", "Gender Natural"],
      variants: [
        { id: 1, color: "green", image: "./images/green-sock.jpg" },
        { id: 2, color: "grey", image: "./images/blue-sock.jpg" }
      ],
      cart: 0,
      selectedVariant: 0,
      reviews: []
    };
  },
  methods: {
    updateProduct(index) {
      this.selectedVariant = index;
    },
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    clearCart() {
      this.$emit("clear-cart");
    },
    productChange(index) {
      this.selectedVariant = index;
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    }
  },
  computed: {
    inStock() {
      return this.inventory > 0;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    }
  },
  template: `
  <div class="product">
  <div class="product-image"><img :src="image" /></div>

  <div class="product-info">
    <h1>{{ product.name }}</h1>
    <p v-if="premium">Free shipping (because you are a premium user)</p>
    <p v-else>Shipping Fees - 2.5$</p>
    <p v-if="inventory >= 10">In Stock</p>
    <p v-else-if="inventory < 10 & inventory > 0">
      Almost out of stock ({{ inventory }} items left)
    </p>
    <p v-else>Out of Stock</p>
    <ul>
      <li v-for="(detail,index) in details" :key="index">{{ detail }}</li>
    </ul>
    <div
      v-for="(variant,index) in variants"
      :key="variant.id"
      @mouseover="productChange(index)"
      class="color-box"
      :style="{backgroundColor: variant.color}"
    ></div>
    <br />
    <button
      @click="addToCart"
      :disabled="!inStock"
      :class="{disabledButton : !inStock}"
    >
      Add to Cart
    </button>
    <button @click="clearCart">Clear Cart</button>   

    <div>
    <p v-if="!reviews.length">There are no reviews yet.</p>
    <ul v-else>
        <li v-for="(review, index) in reviews" :key="index">
          <p>{{ review.name }}</p>
          <p>Rating:{{ review.rating }}</p>
          <p>{{ review.review }}</p>
        </li>
    </ul>
  </div>
  
  <product-review @review-submitted="addReview"></product-review>

  </div>
 </div>
  `
});

Vue.component("product-review", {
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {      
      if (this.name && this.review && this.rating && this.recommend) {

        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };
        this.$emit("review-submitted", productReview);        
        this.clearForm();                     
      } else {
        this.errors = [];
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommendation required.");
      }
    },
    clearForm() {
      this.errors = [];
      this.name = null;
      this.review = null;
      this.rating = null;
      this.recommend = null;   
    }
  },
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  
    <p class="error" v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>Would you recommend this product?</p>
    <label>
      Yes
      <input type="radio" value="Yes" v-model="recommend"/>
    </label>
    <label>
      No
      <input type="radio" value="No" v-model="recommend"/>
    </label>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
</form>
`
});

var app = new Vue({
  el: "#app",
  data: {
    premiumUser: true,
    cart: []
  },
  methods: {
    addToCart(id) {
      this.cart.push(id);
    },
    clearCart() {
      this.cart = [];
    }
  }
});
