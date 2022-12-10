const conditioModel = require("../model/condition");
const outputModel = require("../model/output")
const recordsModel = require("../model/records")
let cron = require("node-cron")

let createRecords = async (req, res) => {
    try {
        let create = await recordsModel.create(req.body)
        return res.status(201).send({ success: true, data: create })

    } catch (err) {
        return res.status(500).send({ success: false, error: err.message })
    }
}
let createCondition = async (req, res) => {
    try {
        let create = await conditioModel.create(req.body)
        return res.status(201).send({ success: true, data: create })

    } catch (err) {
        return res.status(500).send({ success: false, error: err.message })
    }
}

// cron.schedule("*/5* * * * *", async function () {
//     try {
//         let condition = await conditioModel.find({ ischeck: false })
//         for (let el of condition) {
//             let v = el.value.split(",")
//             for (let value of v) {
//                 if (el.field == "age") {
//                     if (el.criteria == "greater") var records1 = await recordsModel.find({ [el.field]: { $gt: value } })
//                     if (el.criteria == "lesser")  var records1 = await recordsModel.find({ [el.field]: { $lt: value } })
//                     for (el of records1) {
//                         let object = {}
//                         object.name = el.name,
//                             object.phone_no = el.phone_no,
//                             object.age = el.age,
//                             object.email = el.email
//                         let createdByRecords = await outputModel.create(object)
//                     }
//                 }
//                 else {
//                     var records = await recordsModel.findOne({ [el.field]: value })
//                     let object = {}
//                     object.name = records.name,
//                         object.age = records.age,
//                         object.phone_no = records.phone_no,
//                         object.email = records.email
//                     let createdByRecords = await outputModel.create(object)
//                 } 
//             }
//             let update = await conditioModel.findOneAndUpdate({ _id: el._id }, { ischeck: true })   
//         }
//     }
//     catch (err) {
//         return res.status(500).send({ success: false, error: err.message })
//     }
// })
const configuration={
    greater:{
        criteria:"$gt",
        valueOperation:"",
    },
    includes:{
        criteria:"$in",
        valueOperation:[],
    },
    lesser:{
        criteria:"$lt",
        valueOperation:"",
    }
}
cron.schedule("*/1 * * * * *", async function () {
    try {
        let condition = await conditioModel.find({ ischeck: false })
        for (let el of condition) {
            const config = configuration[el.criteria];
            const criteria = config.criteria;
            let value = el.value;
            if(Array.isArray(config.valueOperation)) {
                value= value.split(",")
            }
            else{
                value= config.valueOperation+value 
            }
            let querry = {}
            querry[el.field] = {       
                [criteria]: value
            }
            let records = await recordsModel.find(querry)
            for (let  el of records) {
                let object = {}
                object.name = el.name,
                    object.phone_no = el.phone_no,
                    object.age = el.age,
                    object.email = el.email
                let createdByRecords = await outputModel.create(object)
            }
            let update = await conditioModel.findOneAndUpdate({ _id: el._id}, { ischeck: true }) 
        }
    } catch (err) {
        return res.status(500).send({ success: false, error: err.message })
    }
})

module.exports = { createCondition, createRecords }

