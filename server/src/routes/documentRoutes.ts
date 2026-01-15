import { Router } from 'express';
import { createDocument, getDocuments, getAllDocuments, getDocumentById, updateDocument } from '../controllers/documentController';

const router = Router();

router.post('/', createDocument);
router.get('/', getDocuments);
router.get('/all', getAllDocuments);
router.get('/:id', getDocumentById);
router.patch('/:id', updateDocument);

export default router;
