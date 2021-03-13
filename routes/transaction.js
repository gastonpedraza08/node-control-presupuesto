const router = require('express').Router()
const { Transaction } = require('../database')

router.post('/transaction/view', async (req, res) => {
    const id = Number(req.body.id);
    const desde = Number(req.body.desde) || 0
    const hasta = Number(req.body.hasta) || 10
    const tipo = req.body.tipo;
    let condition;
    if(tipo!==undefined){
        condition = {
            userId: id,
            tipo,
            estado: 1
        }
    }else{
        condition = {
            userId: id,
            estado: 1
        }
    }
    try{
        const transactions = await Transaction.findAll({
            where: condition,
            offset: desde,
            limit: hasta,
            order: [
                ['createdAt', 'DESC'],
            ]});
        res.json({
            ok: true,
            transactions
        })
    }catch(e){
        res.status(400).json({
            e
        })
    }
})

router.post('/transaction/create', async (req, res) => {
    const body = req.body;
    try {
        const transaction = await Transaction.create(req.body)
        res.json({
            ok: true,
            transaction
        })
    } catch(e) {
        let error = e.errors[0].message
        res.status(400).json({
            ok: false,
            error
        })
    }
})

router.put('/transaction/update/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try{
        let transaction = await Transaction.findByPk(id);
        transaction.concepto = body.concepto;
        transaction.monto = body.monto;
        transaction.fecha = body.fecha;
        await transaction.save();
        res.json({
            ok: true,
            transaction
        })
    }catch(e){
        res.status(400).json({
            ok: false,
            error:  e.errors[0].message
        })
    }
})

router.delete('/transaction/delete', async (req, res) => {
    const id = req.body.id;
    console.log("el id "+id)
    try{
        let transaction = await Transaction.findByPk(id);
        transaction.estado = false;
        await transaction.save();
        res.json({
            ok: true,
            transaction
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            ok: false,
            error:  e.errors[0].message
        })
    }
})


module.exports = {
    router
}