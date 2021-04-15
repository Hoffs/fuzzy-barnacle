import { Router, json } from 'express';
import { context } from './context';

const router = Router();
router.use(json());

router.get('/:key', async (req, res) => {
  const key = req.params.key;
  if (typeof key !== "string") {
    res.sendStatus(404);
    return;
  }

  const found = await context.prisma.url.findUnique({ where: { key } });
  if (found) {
    res.redirect(found.url);
  } else {
    res.sendStatus(404);
  }
});

export default router;
