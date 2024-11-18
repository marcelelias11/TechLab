async function exibirCalculo(req,res){
    const {nome} = req.body
    try{
        res.send(nome)
    }catch(error){
        console.log(error)
        return res.sendStatus(500)
    }

}

export {
    exibirCalculo
}