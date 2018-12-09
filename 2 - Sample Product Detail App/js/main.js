var app = new Vue({
  el: "#app",
  data: {
    product: {
      name: "Sock",
      description: "Warm fuzzy sock"
    },
    image: "./images/green-sock.jpg",
    inventory: 8,
    details: ["80% cotton", "20% polyester", "Gender Natural"],
    variants: [
      { id: 1, color: "green", image: "./images/green-sock.jpg" },
      { id: 2, color: "grey", image: "./images/blue-sock.jpg" }
    ],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart++;
    },
    clearCart() {
      this.cart = 0;
    },
    productChange(image) {
      this.image = image;
    }
  },
  computed: {
    inStock() {
      return this.inventory > 0;
    }
  }
});
