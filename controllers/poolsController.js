const User = require('../models/User')
const Pool = require('../models/Pool')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc    Get all pools
// @route   GET /pools
// @access  Private
const getAllPools = asyncHandler(async (req, res) => {
    // Get all pools from MongoDB
    const pools = await Pool.find().lean()

    // If no pools
    if (!pools?.length) {
        return res.status(400).json({ message: 'No pools found' })
    }

    res.json(pools)
})

// @desc    Create new pool
// @route   POST /pools
// @access  Private
const createNewPool = asyncHandler(async (req, res) => {
    const { poolname, address, gallons } = req.body

    // Confirm data
    if (!poolname || !address || !gallons) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate name, address, and gallons
    const duplicate = await Pool.findOne({ poolname, address, gallons }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'This pool already exists' })
    }

    const poolObject = { poolname, address, gallons }

    // Create and store new pool
    const pool = await Pool.create(poolObject)

    if (pool) { //created 
        res.status(201).json({ message: `New pool created` })
    } else {
        res.status(400).json({ message: 'Invalid pool data received' })
    }
})

// @desc    Update a pool
// @route   PATCH /pools
// @access  Private
const updatePool = asyncHandler(async (req, res) => {
    const { id, poolname, address, gallons } = req.body

    // Confirm data 
    if (!id || !poolname || !address || !gallons) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the pool exist to update?
    const pool = await Pool.findById(id).exec()

    if (!pool) {
        return res.status(400).json({ message: 'Pool not found' })
    }

    // Check for duplicate 
    const duplicate = await Pool.findOne({ poolname }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate poolname' })
    }

    pool.poolname = poolname
    pool.address = address
    pool.gallons = gallons

    const updatedPool = await pool.save()

    res.json({ message: `${updatedPool.poolname} updated` })

})

// @desc    Delete a pool
// @route   DELETE /pools
// @access  Private

const deletePool = asyncHandler (async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'ID is required' })
    }

    const pool = await Pool.findByIdAndDelete(id).exec()

    if (!pool) {
        return res.status(400).json({ message: 'Pool not found' })
    }

    const result = await pool.deleteOne()

    const reply = `Pool ${result.poolname} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllPools,
    createNewPool,
    updatePool,
    deletePool
}