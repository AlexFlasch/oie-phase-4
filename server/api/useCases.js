import { Router } from 'express';
import { Sequelize } from 'sequelize';

var router = Router();

var sequelize = new Sequelize('mariadb://flasca50:0625150@localhost:3306/flasca50');


var uc1 =" select \
    a.FirstName as `First Name`, \
    a.LastName as `Last Name`, \
    a.Email, \
    s.Name as `Home University`, \
    priority1.Name as `First Choice`, \
    priority2.Name as `Second Choice` \
from \
    Accounts as a \
    inner join InboundInfo as ii on ii.AccountId = a.Id \
    inner join HomeSchool as hs on hs.Accounts_Id = a.Id \
    inner join Schools as s on hs.Schools_Id = s.Id \
    inner join ApplicationAnswers as aa on aa.AccountId = a.Id \
    inner join SchoolsWishlist as sw on aa.Id = sw.AnswersId \
    inner join ( \
        select \
            s.Name as Name, \
            sw.AnswersId as AnswersId \
        from \
            SchoolsWishlist as sw \
            inner join Schools as s on sw.SchoolId = s.Id \
        where \
            sw.Priority = 1 \
    ) as priority1 on priority1.AnswersId = sw.AnswersId \
    inner join ( \
        select \
            s.Name as Name, \
            sw.AnswersId as AnswersId \
        from \
            SchoolsWishlist as sw \
            inner join Schools as s on sw.SchoolId = s.Id \
        where \
            sw.Priority = 2 \
    ) as priority2 on priority2.AnswersId = sw.AnswersId \
order by \
    hs.Schools_Id;"

var uc2 =" select \
    a.FirstName as `First Name`, \
    a.LastName as `Last Name`, \
    a.Email, \
    s.Name as `Home University`, \
    priority1.Name as `First Choice`, \
    priority2.Name as `Second Choice` \
from \
    Accounts as a \
    inner join OutboundInfo as ii on ii.AccountId = a.Id \
    inner join HomeSchool as hs on hs.Accounts_Id = a.Id \
    inner join Schools as s on hs.Schools_Id = s.Id \
    inner join ApplicationAnswers as aa on aa.AccountId = a.Id \
    inner join SchoolsWishlist as sw on aa.Id = sw.AnswersId \
    inner join ( \
        select \
            s.Name as Name, \
            sw.AnswersId as AnswersId \
        from \
            SchoolsWishlist as sw \
            inner join Schools as s on sw.SchoolId = s.Id \
        where \
            sw.Priority = 1 \
    ) as priority1 on priority1.AnswersId = sw.AnswersId \
    inner join ( \
        select \
            s.Name as Name, \
            sw.AnswersId as AnswersId \
        from \
            SchoolsWishlist as sw \
            inner join Schools as s on sw.SchoolId = s.Id \
        where \
            sw.Priority = 2 \
    ) as priority2 on priority2.AnswersId = sw.AnswersId \
order by \
    hs.Schools_Id;"

function getQuery(req,res,next){
    var qID = parseInt(req.params.id);
    switch(qID){
        case 0: var query = uc1;
                break;
        case 1: var query = uc2;
                break;
        case 2: var query = uc1;
                break;
        case 3: var query = uc1;
                break;
        default:
                var query = uc1;
    }
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
    .then(function(data) {
        res.status(200)
        .json(data);
    })
    .catch(err => {
        return next(err);
    });
}

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
router.get('/usecases/:id', getQuery);

export default router;
