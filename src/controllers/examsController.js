import { Exam } from "../models/exams.js";

export const getAsync = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.render('examList', { exams });
    } catch (err) {
        res.status(500).json({ message: `Error fetching exams: ${err.message}` });
    }
};

export const postAsync = async (req, res) => {
    console.log(req.body)
    try {
        const newExam = new Exam(req.body);
        await newExam.save();
        res.redirect('/exams');
    } catch (err) {
        res.status(400).json({ message: `Error creating exam: ${err.message}` });
    }
};

export const deleteExamAsync = async (req, res) => {
    try {
        console.log(req.params.id)
        const examId = req.params.id;
        await Exam.findByIdAndDelete(examId);
        res.redirect('/exams'); // Redirect to exam list (or another desired page)
    } catch (err) {
        // Handle errors (e.g., render an error view)
        res.status(500).render('error', { error: err });
    }
};

export const putAsync = async (req, res) => {
    try {
        const examId = req.params.id;
        const updatedData = req.body;
        const updatedExam = await Exam.findByIdAndUpdate(examId, updatedData, {
            new: true, // Return the updated document
            runValidators: true // Run validators on the update
        });

        if (!updatedExam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.redirect('/exams');
    } catch (err) {
        console.error('Error updating exam:', err);
        res.status(500).json({ message: 'Error updating exam', error: err.message });
    }
};

export const getExamByIdAsync = async (req, res) => {
    try {
        const examId = req.params.id;
        const exam = await Exam.findById(examId);

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.render('examEditForm', { exam })
    } catch (err) {
        console.error("Error fetching exam:", err);
        res.status(500).json({ message: 'Error fetching exam', error: err.message });
    }
};

export const getExamByIdAsyncJson = async (req, res) => {
    try {
        const examId = req.params.id;
        const exam = await Exam.findById(examId);

        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(exam)
    } catch (err) {
        console.error("Error fetching exam:", err);
        res.status(500).json({ message: 'Error fetching exam', error: err.message });
    }
};
