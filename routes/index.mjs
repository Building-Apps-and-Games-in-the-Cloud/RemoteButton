import express from 'express';

const router = express.Router();

// Home page - just render the index
router.get('/', (request, response) => {
    response.render('index.ejs');
});


export { router as index };