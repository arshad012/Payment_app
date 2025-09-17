import { Schema, model } from "mongoose";
import { orderStatusEnum } from "../utils/index.js";

const OrderStatusSchema = new Schema({
    collect_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    order_amount: {
        type: Number,
        required: true
    },
    transaction_amount: {
        type: Number,
        required: true
    },
    payment_mode: {
        type: String,
        required: true
    },
    payment_details: {
        type: String,
        required: true
    },
    bank_reference: {
        type: String,
        required: true
    },
    payment_message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(orderStatusEnum),
        default: orderStatusEnum.PROCESSED,
    },
    error_message: {
        type: String,
    },
    payment_time: {
        type: Date,
        default: Date.now
    }
})

export const OrderStatus = model("OrderStatus", OrderStatusSchema);