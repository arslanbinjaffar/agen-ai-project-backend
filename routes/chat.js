const {Router}= require ('express');
const {chatController} = require( '../controllers/chat.controller.js');
const router = Router();

router.get('/chat', (req, res) => {
  res.json({message: 'Hello from the chat route!'});
});
router.post('/chat', chatController);
module.exports = router;