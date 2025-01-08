<script setup>
import { ref, onMounted, computed } from 'vue'
import '../assets/lp.css'
import PaymentModal from './PaymentModal.vue'

const IntroSection = ref(null)
const productSection = ref(null)

const handleCTAClick = () => {
  IntroSection.value.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const sections = document.querySelectorAll('.animate-on-scroll')
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  sections.forEach(section => {
    observer.observe(section)
  })
})

const reviews = [
  {
    name: "Andra Pratama",
    rating: 5,
    text: "Kopi Kuning Garut ini benar-benar istimewa! Aroma dan rasanya sangat khas, jadi favorit baru saya.",
    role: "Coffee Enthusiast"
  },
  {
    name: "Diana Putri",
    rating: 5,
    text: "Saya suka sekali dengan after taste-nya yang lembut. Cocok untuk teman kerja setiap pagi.",
    role: "Barista"
  },
  {
    name: "Rizky Rahman",
    rating: 5,
    text: "Pengiriman cepat dan packaging aman. Rasa kopinya premium banget!",
    role: "Coffee Lover"
  },
  {
    name: "Maya Sari",
    rating: 5,
    text: "Cita rasa yang unik dan berbeda dari kopi lainnya. Worth it untuk dicoba!",
    role: "Food Blogger"
  },
  {
    name: "Budi Santoso",
    rating: 5,
    text: "Sudah langganan 6 bulan, konsisten kualitasnya. Recommended!",
    role: "Coffee Shop Owner"
  }
]

const orderForm = ref({
  product: '',
  weight: 250,
  name: '',
  phone: '',
  address: ''
})

const products = [
  { id: 'Wine', name: 'Wine', price: 760000 },
  { id: 'Original', name: 'Original', price: 760000 },
  { id: 'Aerob', name: 'Aerob', price: 760000 }
]

const weights = [
  { gram: 250, label: '250 gram' },
  { gram: 500, label: '500 gram' },
  { gram: 1000, label: '1 kg' }
]

const totalPrice = computed(() => {
  const product = products.find(p => p.id === orderForm.value.product)
  return product ? (product.price * orderForm.value.weight / 1000) : 0
})

const showPaymentModal = ref(false)

const handleSubmit = () => {
  showPaymentModal.value = true
}
</script>

<template>
  <div class="landing">
    <section class="hero">
      <div class="hero-content">
        <h1>Kenikmatan Kopi Kuning<br>Oleh-Oleh Istimewa dari Garut!</h1>
        <p class="hero-subtitle">Aroma Harum, Rasa Istimewa: Kopi Kuning Khas Garut,<br>
          Warisan Rasa dari Jantung Garut!</p>
        <button @click="handleCTAClick" class="cta-button">
          Mulai Petualangan Kopi Anda
        </button>
      </div>
    </section>

    <!-- Introduction Section -->
    <section ref="IntroSection" class="intro-section animate-on-scroll">
      <div class="intro-content">
        <h2>Kopi Kuning Arabica Khas Garut: Cita Rasa yang Menggoda!</h2>
        <p>Nikmati secangkir kopi yang memikat hati, Kopi Kuning Arabica asli dari dataran tinggi Garut. Dipetik langsung dari kebun pilihan, kopi ini memiliki rasa yang lembut, aroma yang harum, dan sentuhan asam khas yang memanjakan lidah.</p>
      </div>
      <div class="center-bean">
        <img src="../assets/cofe-bean.png" alt="Coffee Bean">
      </div>
    </section>

    <!-- list Section -->
    <section ref="ListSection" class="list-section">
      <div class="list-content">
        <h2>Rasa Berkelas dengan Sentuhan Fermentasi!</h2>
        <p>Nikmati kekayaan rasa kopi dari dataran tinggi Garut dengan tiga varian unggulan yang siap memanjakan lidah Anda. Setiap jenisnya membawa cerita dan sensasi yang berbeda!</p>
      </div>
    </section>

    <!-- Product Showcase Section -->
    <section ref="productSection" class="product-section animate-on-scroll">
      <div class="section-header">
        <h2>Coffee Build</h2>
        <p>Produk Pilihan</p>
      </div>
      
      <div class="product-features-layout">
        <!-- Left Features -->
        <div class="features-column left">
          <div class="feature-item">
            <img src="../assets/build-coffee-img1-1.png" alt="Premium Quality">
            <div class="feature-content">
              <h3>Premium Quality</h3>
              <p>100% Arabica pilihan dengan cita rasa khas Priangan</p>
            </div>
          </div>
          <div class="feature-item">
            <img src="../assets/build-coffee-img2-1.png" alt="Fresh Roasted">
            <div class="feature-content">
              <h3>Fresh Roasted</h3>
              <p>Dipanggang dengan metode tradisional untuk rasa terbaik</p>
            </div>
          </div>
        </div>

        <!-- Center Product Image -->
        <div class="center-product">
          <img src="../assets/kontenkopi.png" alt="Kopi Kuning Garut">
        </div>

        <!-- Right Features -->
        <div class="features-column right">
          <div class="feature-item">
            <img src="../assets/build-coffee-img4-1.png" alt="Expert Selected">
            <div class="feature-content">
              <h3>Expert Selected</h3>
              <p>Dipilih oleh ahli untuk kualitas terbaik</p>
            </div>
          </div>
          <div class="feature-item">
            <img src="../assets/build-coffee-img1-1.png" alt="Natural Process">
            <div class="feature-content">
              <h3>Natural Process</h3>
              <p>Diproses secara alami untuk menjaga keaslian rasa</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Review Section -->
    <section class="review-section animate-on-scroll">
      <div class="section-header-review">
        <h2>Testimonials</h2>
        <p>Apa Kata Mereka?</p>
      </div>
      
      <div class="reviews-container">
        <div class="reviews-grid">
          <div v-for="(review, index) in reviews" 
               :key="index" 
               class="review-card animate-on-scroll">
            <div class="review-content">
              <div class="stars">★★★★★</div>
              <p class="review-text">{{ review.text }}</p>
              <div class="reviewer-info">
                <div class="reviewer-name">{{ review.name }}</div>
                <div class="reviewer-role">{{ review.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
     <!-- closing Section -->
     <section ref="ClosingSection" class="closing-section animate-on-scroll">
      <div class="closing-content">
        <h2>Jangan Tunggu Lagi, Nikmati Kopi Terbaik Sekarang!</h2>
        <p>
          Rasa istimewa dari Kopi Kuning Arabica khas Garut ini sudah menunggu Anda.
          Jangan ragu, checkout sekarang dan rasakan kelezatannya di rumah Anda.
          Stok terbatas! Pesan hari ini, esok nikmati!
        </p>
        <div class="price-info">
          <span class="original-price">Rp 500.000</span>
          <span class="discounted-price">Rp 190.000</span>
          <span class="note-price">*Harga Sudah Termasuk Ongkir</span>
        </div>
        <button class="buy-button" @click="handleBuyNow">Beli Sekarang</button>
      </div>
    </section>
    
    <!-- Order Section -->
    <section class="order-section">
      <div class="order-header">
        <h2>Pemesanan</h2>
        <p>Pesan Kopi Anda</p>
      </div>

      <form @submit.prevent="handleSubmit" class="order-form">
        <div class="form-group">
          <label>Pilih Jenis Kopi</label>
          <select v-model="orderForm.product" required>
            <option value="">Pilih varian</option>
            <option v-for="product in products" 
                    :key="product.id" 
                    :value="product.id">
              {{ product.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Pilih Berat</label>
          <select v-model="orderForm.weight" required>
            <option v-for="weight in weights" 
                    :key="weight.gram" 
                    :value="weight.gram">
              {{ weight.label }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Quantity</label>
            <input type="number" v-model.number="orderForm.quantity" min="1" required>
        </div>
        <div class="form-group">
          <label>Nama</label>
          <input type="text" v-model="orderForm.name" required>
        </div>

        <div class="form-group">
          <label>WhatsApp</label>
          <input 
            type="tel" 
            v-model="orderForm.phone" 
            pattern="[0-9]*"
            @input="orderForm.phone = orderForm.phone.replace(/[^0-9]/g, '')"
            maxlength="13"
            placeholder="Contoh: 081234567890"
            required>
        </div>

        <div class="form-group">
          <label>Alamat Lengkap</label>
          <textarea v-model="orderForm.address" required></textarea>
        </div>

        <div class="form-group">
          <label>Catatan</label>
          <textarea v-model="orderForm.notes"></textarea>
        </div>

        <div class="form-group">
          <label>Total Harga: Rp {{ totalPrice }}</label>
        </div>
        <button type="submit" class="order-button">Pesan Sekarang</button>
      </form>
    </section>
  </div>

  <PaymentModal 
    :is-open="showPaymentModal"
    :order-details="orderForm"
    :total-price="totalPrice"
    @close="showPaymentModal = false"
  />

  <section class="footer">
    <div class="footer-content">
      <p>© 2021 Kopi Kuning Garut. All Rights Reserved.</p>
    </div>
  </section>
</template>