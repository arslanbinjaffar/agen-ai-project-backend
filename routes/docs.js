const {Router}= require ('express');
const {docsController} = require( '../controllers/doc.controller');
const router = Router();

router.get('/docs', (req, res) => {
  res.json({message: 'Hello from the docs route!'});
});
router.post('/docs', docsController);
module.exports = router;