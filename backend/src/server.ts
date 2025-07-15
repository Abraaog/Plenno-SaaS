// backend/src/server.ts
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001; // A porta onde o nosso backend irá correr

app.use(cors()); // Permite que o frontend aceda ao backend
app.use(express.json()); // Permite que o servidor entenda JSON

// Uma rota de teste para garantir que tudo está a funcionar
app.get('/', (req, res) => {
  res.send('Servidor Plenno a funcionar!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Plenno a correr na porta ${PORT}`);
});
