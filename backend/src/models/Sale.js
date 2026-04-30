const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    amount: {
        type: Number,
        required: true
    },
    platformFee: {
        type: Number,
        default: function() {
            return this.amount * 0.05;
        }
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Others'],
        required: true
    },
    installments: {
        type: Number,
        default: 1
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;