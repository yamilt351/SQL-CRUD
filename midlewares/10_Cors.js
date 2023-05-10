import cors from 'cors';

export default cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
  credentials: true,
  maxAge: 48000,
  exposedHeaders: ['Authorization'],
});
