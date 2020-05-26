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
        const byUser = req.user._id
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
        if(!giveaway) throw new Exception('giveaway not found')
        const {numParticipants} = giveaway._doc
        const winningNumbers = randomInRange(0 , numParticipants)
        const winner = await GiveawayRegistration.findOne({giveawayId: giveaway._id, luckyNumber: winningNumbers})
        if(!winner) throw new Exception('winner not found')
        const giveawayResult = new giveawayResultSchema({
            winnerEmail: winner.email,
            winningNumbers: winningNumbers
        })
        giveaway.result = giveawayResult
        await giveaway.save()
		res.status(httpCodes.OK).send({ giveaway });
    } catch (error) {
        next(error)
    }
}

const updateWinnerInfo = async (req, res, next) => {
    try {
        const {fullname, address, phone, giveawayId} = req.body
        if(!fullname || !address || !phone) throw new Exception('invalid info')
        const giveaway = Giveaway.findByIdAndUpdate(giveawayId, {
            'result.winnerInfo': {
                fullname, address, phone
            }
        })
        if(!giveaway) throw new Exception('giveaway not found')
        return res.status(httpCodes.OK).send({message: 'update winner info successful'})
    } catch (error) {
        next(error)
    }
}

const getActiveGiveaways = async (req, res, next) => {
    try {
        let {limit, skip, categoryId} = req.body
        limit = limit ? +limit : 5 
        skip = skip ? +skip : 5 
        let query = {result: {$exists: false}}
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
const removeGiveaway = async (req, res, next) => {
    try {
        const {id} = req.params
        if(!id) throw new Exception('invalid id')
        const giveaway = await Giveaway.findByIdAndDelete(id)
        if(!giveaway) throw new Exception('giveaway not found')
        return res.status(httpCodes.OK).send({message: 'giveaway removed'})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addGiveaway,
    registerReceiveGiveaway,
    updateWinnerInfo,
    startGiveaway,
    getActiveGiveaways
}