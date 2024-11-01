import express from 'express';
const msgRoutes = express.Router();

msgRoutes.get('/send-message', (req, res) => {
  res.send('Hello send route!');
});
msgRoutes.get('/get-message/:userToChatId', (req, res) => {
  res.send('Hello send route!');
});

export default msgRoutes;