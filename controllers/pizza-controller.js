const { Pizza } = require('../models');

const pizzaController = {

    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                // The minus sign - in front of the field indicates that we don't want it to be returned
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbPizzadata => res.json(dbPizzadata))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                // The minus sign - in front of the field indicates that we don't want it to be returned
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzadata => {
                // If no pizza is found, send 404
                if (!dbPizzadata) {
                    res.status(404).json({ message: 'no pizza found with this id' });
                    return;
                }
                res.json(dbPizzadata)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //create pizza 
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzadata => res.json(dbPizzadata))
            .catch(err => res.status(400).json(err));
    },
    // update pizza by id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbPizzadata => {
                if (!dbPizzadata) {
                    res.status(404).json({ message: 'no pizza found with this id' });
                    return;
                }
                res.json(dbPizzadata);
            }).catch(err =>
                res.status(400).json(err));
    },
    // delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzadata => {
                // If no pizza is found, send 404
                if (!dbPizzadata) {
                    res.status(404).json({ message: 'no pizza found with this id' });
                    return;
                }
                res.json(dbPizzadata)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
}
module.exports = pizzaController;