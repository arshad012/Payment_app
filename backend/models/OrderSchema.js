import { Schema, model } from 'mongoose'
import { StudentInformationSchema } from './StudentInformationSchema.js'

const OrderSchema = new Schema({
    school_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trustee_id : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    student_info : {
        type: StudentInformationSchema,
        required: true
    },
    gateway_name: {
        type: String,
        required: true
    },
    gateway_order_id: {
      type: String,
      required: true,
    },
    order_amount: {
      type: Number,
      required: true,
    },
}, {timestamps: true});


export const Order = model("Order", OrderSchema);