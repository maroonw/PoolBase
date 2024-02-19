const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const poolSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Personal', 'PoolPro', 'Manager']
    },
    waterType: {
        type: String,
        required: true,
        enum: ['Chlorine', 'Saltwater', 'Other']
    },
    maintenanceRecords: [{
        date: Date,
        serviceProvided: String,
        notes: String,
        serviceBy: {
            type: mongoose.Schema.Types.ObjectId
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
    },
    {
    timestamps: true
    }

)

poolSchema.plugin(AutoIncrement, {
    inc_field: 'poolNumber',
    id: 'pool_id',
    start_seq: 1000
})

module.exports = mongoose.model('Pool', poolSchema);