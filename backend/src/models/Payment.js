const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    saleId: { type: String, required: true },
    paymentMethod: { type: String, enum: ['PIX', 'boleto', 'credit card'], required: true },
    amount: { type: Number, required: true },
    installmentDetails: { type: Object },
    status: { type: String, required: true },
    timestamps: {
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    }
});

module.exports = mongoose.model('Payment', paymentSchema);