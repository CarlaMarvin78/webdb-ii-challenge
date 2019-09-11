const express = require('express');

const db = require('./data/carsDB');

const router = express.Router();

router.get ('/', (req, res) =>{
    db.get()
    .then (cars => res.status(200).json(cars))
    .catch (error => res.status(500).json({error: "The cars information can not be loaded."}));
});

router.get ('/:id', (req, res) =>{
    db.get(req.params.id)
    .then (car => {
        if(car) {
            res.status(200).json(car);
        } else {
            res.status(404).json({message: "The car with the specified ID could not be loaded."})
        }
    })
    .catch (err => {
        console.log('get', err);
        res.status(500).json({error: "The cars information can not be loaded."})
    });
});

router.post('/', (req, res) => {
    if (req.query.vin == undefined || req.query.make == undefined || req.query.model == undefined || req.query.mileage == undefined) {
        res.status(400).json({errorMessage: "Please provide vin, make, model, and mileage for the car."});
    } else {
        db.getByVin(req.query.vin)
        .then(carVin => {
            if(carVin) {
                res.status(400).json({errorMessage: "A car exists with this vin."})
            } else {
                db.insert(req.query)
                .then(car => res.status(201).json(car))
                .catch(err => {
                    console.log('post',err);
                    res.status(500).json({error: "There was an error while saving the car."});
                });
            }
        })
    }
})

router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
    .then(count => {
        if(count<1) {
            res.status(404).json({errorMessage: "There is no car with this ID."});
        } else {
            res.sendStatus(200);
        }
    })
    .catch(err => {
        console.log('delete',err);
        res.status(500).json({error: "The car could not be deleted."});
    })
})

router.put('/:id', (req, res) => {
    if (req.query.vin == undefined || req.query.make == undefined || req.query.model == undefined || req.query.mileage == undefined) {
        res.status(400).json({errorMessage: "Please provide vin, make, model, and mileage for the car."});
    } else {
        db.update(req.params.id, req.query)
        .then(count => {
            if(count<1) {
                res.status(404).json({errorMessage: "There is no car with this ID."});    
            } else {
                db.get(req.params.id)
                .then(car => res.status(200).json(car));
            }
        })
        .catch(err => {
            console.log('put',err);
            res.status(500).json({error: "The car could not be updated."});
        });
    }
})

module.exports = router;