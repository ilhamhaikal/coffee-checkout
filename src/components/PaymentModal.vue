<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  isOpen: Boolean,
  orderDetails: Object,
  totalPrice: Number
})

const emit = defineEmits(['close'])

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <button class="close-button" @click="emit('close')">&times;</button>
      
      <div class="invoice">
        <h2>Invoice Pembayaran</h2>
        <div class="invoice-details">
          <div class="detail-row">
            <span>Produk:</span>
            <span>{{ orderDetails.product }}</span>
          </div>
          <div class="detail-row">
            <span>Berat:</span>
            <span>{{ orderDetails.weight }}g</span>
          </div>
          <div class="detail-row">
            <span>Total:</span>
            <span>Rp {{ formatPrice(totalPrice) }}</span>
          </div>
        </div>

        <div class="payment-info">
          <h3>Transfer Bank Mandiri</h3>
          <div class="bank-card">
            <div class="card-chip"></div>
            <div class="card-number" @click="navigator.clipboard.writeText('1770020540834')" style="cursor: pointer" title="Click to copy">1770020540834</div>
            <div class="card-name">KOPI KUNING GARUT</div>
            <img src="../assets/mandiri-logo.png" alt="Mandiri" class="bank-logo">
          </div>
          <p class="account-info">A/N: Ilham Muhammad Haika</p>
        </div>

        <div class="confirmation">
          <p>Silahkan kirim bukti transfer ke:</p>
          <a href="https://wa.me/6282129539778" class="whatsapp-button">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close-button {
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
}

.invoice {
  text-align: center;
}

.invoice-details {
  margin: 2rem 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.bank-card {
  background: linear-gradient(135deg, #0046AF 0%, #002B6B 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  margin: 1.5rem 0;
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-chip {
  width: 50px;
  height: 40px;
  background: #ffd700;
  border-radius: 8px;
}

.card-number {
  font-size: 1.4rem;
  letter-spacing: 2px;
  margin: 1rem 0;
}

.card-name {
  font-size: 1rem;
  text-transform: uppercase;
}

.bank-logo {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  height: 40px;
}

.whatsapp-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #25D366;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  margin-top: 1rem;
}

@media (max-width: 576px) {
  .card-number {
    font-size: 1.2rem;
  }
}
</style>