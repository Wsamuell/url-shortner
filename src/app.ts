import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Load Server');
});

app.listen(port, () => {
  console.log(`App is Listening on port ${port}`);
});
