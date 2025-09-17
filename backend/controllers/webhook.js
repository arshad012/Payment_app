import { OrderStatus, WebhookLog } from "../models/index.js";

export const webhookLog = async (req, res) => {

    try {
        const webhook = new WebhookLog({
            payload: req.body, // collect_id = corresponding order ID
            collect_id: req.body.order_info.order_id
        });

        await webhook.save();

        // Update transaction in DB
        // const updatedOrderStatus = await OrderStatus.findOneAndUpdate(
        //     { collect_id: orderInfo.order_id }, // collect_id = transaction_id from gateway
        //     {
        //         order_amount: orderInfo.order_amount,
        //         transaction_amount: orderInfo.transaction_amount,
        //         payment_mode: orderInfo.payment_mode,
        //         payment_details: orderInfo.payment_details,
        //         bank_reference: orderInfo.bank_reference,
        //         status: orderInfo.status,
        //         payment_message: orderInfo.Payment_message,
        //         error_message: orderInfo.error_message,
        //         payment_time: orderInfo.payment_time
        //     },
        //     { upsert: true, new: true }
        // );

        const orderInfo = req.body.order_info;
        const orderStatus = new OrderStatus(
            {
                collect_id: orderInfo.order_id, // collect_id = corresponding order ID
                order_amount: orderInfo.order_amount,
                transaction_amount: orderInfo.transaction_amount,
                payment_mode: orderInfo.payment_mode,
                payment_details: orderInfo.payment_details,
                bank_reference: orderInfo.bank_reference,
                status: orderInfo.status,
                payment_message: orderInfo.Payment_message,
                error_message: orderInfo.error_message,
                payment_time: orderInfo.payment_time
            }
        );
        await orderStatus.save();

        return res.status(200).json({
            message: "Webhook received successfully",
            data: req.body
        });

    } catch (error) {
        console.error("Webhook error:", error.message);
        return res.status(500).json({ message: "Webhook processing failed" });
    }
};