const Giveaway = require('../models/giveaway')
const {giveawayResultSchema} = require('../models/giveaway')
const GiveawayRegistration = require('../models/giveaway-registration')
const { Exception, randomInRange } = require('../utils');
const { httpCodes } = require('../utils/constant');

const addGiveaway = async (req, res, next) => {
    try {
        const {
            categoryId, title, description, 
            giftImg, giftTitle, 
            begin, numParticipants
        } = req.body
        const byUser = req.auth._id
        const giveaway = new Giveaway({
            byUser, category: categoryId,
            title, description,
            gift: {image: giftImg, title: giftTitle},
            begin, numParticipants
        })
        await giveaway.save()
		res.status(httpCodes.OK).send({ giveaway });
    } catch (error) {
        next(error)
    }
}

const registerReceiveGiveaway = async (req, res, next) => {
    try {
        const {email, luckyNumber, giveawayId} = req.body
        // check register email is existed
        const isExisted = await GiveawayRegistration.exists({email, giveawayId})
        if(isExisted) throw new Exception('email existed')
        const registration = new GiveawayRegistration({email, luckyNumber, giveawayId})
        const giveaway  = await Giveaway.findById(id)
        if(giveaway.result) {
            throw new Exception('giveaway has ended')
        }
        await registration.save()
        return res.status(httpCodes.OK).send({registration})
    } catch (error) {
        next(error)
    }
}

const startGiveaway = async (req, res, next) => {
    try {
        const {id} = req.params
        const giveaway  = await Giveaway.findById(id)
        if(!giveaway) throw new Exception('giveaway not found', httpCodes.NOT_FOUND)
        const numParticipants = giveaway.numParticipants
        const winningNumbers = randomInRange(1 , numParticipants)
        const winner = await GiveawayRegistration.findOne({giveawayId: giveaway._id, luckyNumber: winningNumbers})
        const giveawayResult = {
            winningNumbers: winningNumbers
        }
        if(winner) {
            giveawayResult.winnerEmail = winner.email
        }
        giveaway.result = giveawayResult
        giveaway.end = new Date()
        await giveaway.save()
		res.status(httpCodes.OK).send({ giveaway });
    } catch (error) {
        next(error)
    }
}

const updateWinnerInfo = async (req, res, next) => {
    try {
        const {id} = req.params
        const {fullname, address, phone, email} = req.body
        if(!fullname || !address || !phone || !email) 
            throw new Exception('invalid info')
        const giveaway = await Giveaway.findById(id)
        if(!giveaway) 
            throw new Exception('giveaway not found', httpCodes.NOT_FOUND)
        if(giveaway.result.winnerInfo) 
            throw new Exception('winner info registered')
        if(giveaway.result.winnerEmail !== email) 
            throw new Exception('invalid email')
        giveaway.result.winnerInfo = {fullname, address, phone}
        await giveaway.save()
        return res.status(httpCodes.OK).send({message: 'register winner info successful'})
    } catch (error) {
        next(error)
    }
}

const getGiveaways = async (req, res, next) => {
    try {
        let {limit, skip, categoryId, ended} = req.params
        limit = limit ? +limit : 5 
        skip = skip ? +skip : 0
        let query = {result: {$exists: ended ? true : false}}
        if(categoryId) query.category = categoryId
        const giveaways = await Giveaway.find(query, null, {skip, limit})
            .populate('byUser', 'username')
            .populate('category')
            .exec()
        if(!giveaways) throw new Exception('giveaway not found')
        return res.status(httpCodes.OK).send({giveaways})
    } catch (error) {
        next(error)
    }
}

const getRegistrationsOfGiveaway = async (req, res, next) => {
    try {
        const {id} = req.params
        if(!id) throw new Exception('invalid id')
        const registrations = await GiveawayRegistration.find({giveawayId: id})
        if(!registrations) throw new Exception('registration not found')
        return res.status(httpCodes.OK).send({registrations})
    } catch (error) {
        next(error)
    }
}

const removeGiveaway = async (req, res, next) => {
    try {
        const {id} = req.params
        if(!id) throw new Exception('invalid id')
        const giveaway = await Giveaway.findByIdAndDelete(id)
        if(!giveaway) throw new Exception('giveaway not found')
        return res.status(httpCodes.OK).send({npm: 'giveaway removed'})
    } catch (error) {
        next(error)
    }
}



module.exports = {
    addGiveaway,
    registerReceiveGiveaway,
    updateWinnerInfo,
    startGiveaway,
    getGiveaways,
    removeGiveaway,
    getRegistrationsOfGiveaway
}