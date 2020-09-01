import express from 'express';


const router: any = express.Router();


router.get('/user', (req: express.Request, res: express.Response) =>{
 res.status(200).send('USUARIOS')
});


export default router;