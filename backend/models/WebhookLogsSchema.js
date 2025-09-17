import { Schema, model } from 'mongoose'
import { webhookLogStatusEnum } from '../utils/index.js';

const WebhookLogSchema = new Schema({
        event: { 
            type: String 
        },
        payload: { 
            type: Object,
            required: true 
        },
        collect_id: {
            type: String,
        },
        received_at: { 
            type: Date, 
            default: Date.now 
        },
        status: {
            type: String,
            enum: Object.values(webhookLogStatusEnum),
            default: webhookLogStatusEnum.PROCESSED
        },
        error_message: { 
            type: String, 
            default: "NA" 
        }
    },
    { timestamps: true }
);

export const WebhookLog = model("WebhookLog", WebhookLogSchema);