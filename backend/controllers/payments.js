import { config } from 'dotenv';
import axios from 'axios';
import { generateSign } from "../JWT_services/index.js";
import { Order, OrderStatus, WebhookLog } from "../models/index.js";
import { BASE_URL } from '../base_url/index.js';

config();
const API_KEY = process.env.API_KEY;
const SCHOOL_ID = process.env.SCHOOL_ID;

export const createPayment = async (req, res) => {

    const CALLBACK_URL = `${BASE_URL}/payment-status`;
    const { student_info, amount } = req.body;

    if (!amount) {
        return res.status(200).json({
            message: 'Amount is required'
        })
    }

    try {
        const trustee_id = req.userId;

        const signPayload = {
            school_id: SCHOOL_ID,
            amount,
            callback_url: CALLBACK_URL
        }

        const sign = await generateSign(signPayload);

        const response = await axios.post('https://dev-vanilla.edviron.com/erp/create-collect-request',
            {
                school_id: SCHOOL_ID,
                amount,
                callback_url: CALLBACK_URL,
                sign
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        const newOrder = new Order({
            school_id: SCHOOL_ID,
            trustee_id,
            student_info,
            gateway_name: 'PhonePay',
            gateway_order_id: response.data.collect_request_id,
            order_amount: amount,
        })
        await newOrder.save();

        return res.status(200).json({
            order_id: newOrder._id,
            collect_request_id: response.data.collect_request_id,
            payment_url: response.data.collect_request_url,
        })

    } catch (error) {
        console.log('Error occured while maling this payment:', error.message);
        return res.status(500).json({
            message: 'Payment failed'
        })
    }
}


export const paymentStatus = async (req, res) => {
    const { order_id, updatedStatus } = req.query;

    try {
        const order = await Order.findById(order_id);

        // const orderStatus = await OrderStatus.findOneAndUpdate(
        //     { collect_id: order_id },
        //     { $set: { status: updatedStatus, order_amount: order.order_amount } }
        // );
        // webhook work start here
        const webhook = new WebhookLog({
            payload: {
                status: 200,
                order_info: {
                    order_id: order._id,
                    order_amount: order.order_amount,
                    transaction_amount: order.order_amount + 100,
                    gateway: "PhonePay",
                    bank_reference: "YESBNK222",
                    payment_mode: "upi",
                    payment_details: "success@ybl",
                    Payment_message: "payment success",
                    payment_time: order.createdAt,
                    error_message: "NA"
                }
            },
            collect_id: order._id
        });

        await webhook.save();

        const orderStatus = new OrderStatus(
            {
                collect_id: order._id, // collect_id = corresponding order ID
                order_amount: order.order_amount,
                transaction_amount: order.order_amount+100,
                payment_mode: 'upi',
                payment_details: "success@ybl",
                bank_reference: "YESBNK222",
                status: updatedStatus,
                payment_message: "payment success",
                error_message: "N/A",
                payment_time: order.createdAt
            }
        );
        await orderStatus.save();
        // webhook work end here

        return res.status(200).json({
            message: 'Successfully updated the status of order',
            order
        })
    } catch (error) {
        console.log('error:', error);
        return res.status(400).json({
            message: error.message
        })
    }
}


export const all_transactions = async (req, res) => {
    let { status } = req.query;

    switch (status) {
        case 'success': {
            try {
                const all_orders_status = await OrderStatus.find({ status });

                return res.status(200).json({
                    message: 'All orders fetched successfully',
                    data: all_orders_status
                })
            } catch (error) {
                console.log('error:', error);

                return res.status(404).json({
                    message: error.message
                })
            }
        }
        case 'cancelled': {
            try {
                const all_orders_status = await OrderStatus.find({ status });

                return res.status(200).json({
                    message: 'All orders fetched successfully',
                    data: all_orders_status
                })
            } catch (error) {
                console.log('error:', error);

                return res.status(404).json({
                    message: error.message
                })
            }
        }
        default: {
            try {
                const all_orders_status = await OrderStatus.find();

                return res.status(200).json({
                    message: 'All orders fetched successfully',
                    data: all_orders_status
                })
            } catch (error) {
                console.log('error:', error);

                return res.status(404).json({
                    message: error.message
                })
            }
        }
    }
}