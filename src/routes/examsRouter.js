import {Router} from "express";
import {
    postAsync,
    getAsync,
    deleteExamAsync,
    getExamByIdAsync,
    putAsync,
    getExamByIdAsyncJson
} from "../controllers/examsController.js";

export const router = Router();
router.get('/', getAsync)
// router.get("/:id", getExamByIdAsyncJson)
router.post('/', postAsync)
router.post('/delete/:id', deleteExamAsync);
router.post('/edit/:id', putAsync);

router.get('/new', (req, res) => {
    res.render("examForm")
})
router.get('/edit/:id', getExamByIdAsync);