import express from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const app = express()
app.use(express.json())


app.post('/usuarios', async ( req, res) =>{

    const criar = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age

        }
    })

    res.status(201).json({users:criar})

})

app.get('/usuarios', async ( req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json({users:users})
})

app.put('/usuarios/:id', async (req, res) =>{
    //console.log(req.body);
    
    let body = req.body
     let update = await prisma.user.update({
        where : {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(update)
})

app.delete('/usuarios/:id', async (req, res) => {
    try {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })
        res.status(200).json({ message: 'Deletado com sucesso!'})
} catch {
        res.status(403).json({ message: 'usuario ja Deletado!'})
}
})


app.listen(3000)


/*  
    users do bd: ffa35922
    password do bd: dwu19YeJYVL0IqVN
*/