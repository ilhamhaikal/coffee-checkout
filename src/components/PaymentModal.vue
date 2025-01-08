<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  orderDetails: Object,
  totalPrice: Number
})

const emit = defineEmits(['close'])

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

const getCurrentDate = () => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const copyAccountNumber = () => {
  navigator.clipboard.writeText('1770020540834')
  alert('Nomor rekening telah disalin!')
}

const generateInvoiceNumber = () => {
  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2)
  const randomNum = Math.floor(Math.random() * (9999 - 900 + 1)) + 900
  return `INV/${day}${month}${year}/${randomNum}`
}

const invoiceNumber = generateInvoiceNumber()

const generateWhatsAppMessage = () => {
  const message = `Halo ka, saya mau konfirmasi untuk:\nNo Invoice: ${invoiceNumber}\nPembayaran untuk pesanan ${props.orderDetails.product} (${props.orderDetails.weight}g)`
  return encodeURIComponent(message)
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <button class="close-button" @click="emit('close')">&times;</button>
      
      <div class="invoice">
        <div class="invoice-header">
          <h2>Invoice Pembayaran</h2>
          <p class="invoice-number">{{ invoiceNumber }}</p>
            <p class="invoice-note" style="color: red;">*Mohon masukkan nomor invoice di atas pada keterangan transfer</p>
          <p class="invoice-date">{{ getCurrentDate() }}</p>
        </div>

        <div class="invoice-sections">
          <!-- Customer Details -->
          <div class="invoice-section">
            <h3>Detail Pelanggan</h3>
            <div class="detail-row">
              <span>Nama:</span>
              <span>{{ orderDetails.name }}</span>
            </div>
            <div class="detail-row">
              <span>WhatsApp:</span>
              <span>{{ orderDetails.phone }}</span>
            </div>
            <div class="detail-row">
              <span>Alamat:</span>
              <span>{{ orderDetails.address }}</span>
            </div>
            <div class="detail-row">
              <span>Catatan:</span>
              <span>{{ orderDetails.notes }}</span>
            </div>
          </div>

          <!-- Order Details -->
          <div class="invoice-section">
            <h3>Detail Pesanan</h3>
            <div class="detail-row">
              <span>Produk:</span>
              <span>{{ orderDetails.product }}</span>
            </div>
            <div class="detail-row">
              <span>Berat:</span>
              <span>{{ orderDetails.weight }}g</span>
            </div>
            <div class="detail-row">
              <span>Jumlah:</span>
              <span>{{ orderDetails.quantity }}</span>
            </div>
          </div>

          <!-- Payment Details -->
            <div class="invoice-section payment-section">
            <div class="total-row">
              <span>Total Pembayaran:</span>
              <span class="total-amount">Rp {{ formatPrice(totalPrice * orderDetails.quantity) }}</span>
            </div>
            </div>
          </div>

        <div class="payment-info">
          <h3>Transfer Bank Mandiri</h3>
          <div class="bank-card">
            <div class="card-chip"></div>
            <div class="card-number" @click="copyAccountNumber" style="cursor: pointer" title="Click to copy">
              1770020540834
            </div>
            <div class="card-name">Kopi Kuning Garut</div>
            <img src="../assets/mandiri-logo.png" alt="Mandiri" class="bank-logo">
          </div>
          <p class="account-info">A/N: Ilham Muhammad Haika</p>
        </div>

        <div class="payment-info">
          <p>Silahkan kirim bukti transfer ke:</p>
          <a :href="`https://wa.me/6282129539778?text=${generateWhatsAppMessage()}`" 
             class="whatsapp-button">
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
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  margin-top: 2rem;
  position: relative;
  overflow-y: auto;
  max-height: calc(90vh - 4rem);
}

.invoice {
  padding: 2rem;
  overflow-y: auto;
  max-height: calc(90vh - 4rem);
}

.close-button {
  position: sticky;
  right: 0;
  top: 0;
  width: 24px;
  height: 24px;
  background: #C17817;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1002;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.close-button:hover {
  background: #a66813;
}

.close-button:active {
  transform: scale(0.95);
}

.invoice-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
}

.invoice-date {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.invoice-number {
  font-weight: bold;
  color: #C17817;
  margin: 0.5rem 0;
}

.invoice-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.invoice-section {
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 8px;
}

.invoice-section h3 {
  color: #C17817;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #ddd;
  word-break: break-word; /* Added for long text */
}

detail-row:last-child {
  border-bottom: none;
}

.detail-row span:first-child {
  color: #666;
  font-weight: 500;
  flex: 0 0 auto;
  margin-right: 1rem;
}

.detail-row span:last-child {
  flex: 1;
  text-align: right;
}

.payment-section {
  background: #C17817;
  color: white;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.total-amount {
  font-size: 1.5rem;
}

.payment-info {
  margin-top: 2rem;
  text-align: center;
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
  cursor: pointer;
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .modal-content {
    margin: 1rem auto;
    width: 95%;
  }

  .invoice {
    padding: 1rem;
  }

  .detail-row {
    flex-direction: column;
  }

  .detail-row span {
    text-align: left !important;
  }

  .detail-row span:last-child {
    margin-top: 0.25rem;
  }

  .close-button {
    right: 1.5rem;
  }
}

@media (max-width: 576px) {
  .card-number {
    font-size: 1.2rem;
  }
}
</style>