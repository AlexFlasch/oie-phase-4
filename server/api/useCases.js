import { Router } from 'express';

var router = Router();

// Mock Users
const useCases = [
    { id: 0, name: 'Use Case 1', desc: 'All Hessen students and their UW choices.' },
    { id: 1, name: 'Use Case 2', desc: 'All UW students and their Hessen choices.' }
];

/* GET users listing. */
router.get('/usecases', function (req, res, next) {
    res.json(useCases);
});

/* GET user by ID. */
router.get('/usecases/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    const useCase = useCases.filter(function(use) {
        return use.id === id;
    })[0];

    console.log(useCase);
    console.log('something');

    if(useCase !== undefined) {
        res.json(useCase);
    } else {
        res.sendStatus(404)
    }
});

export default router;
