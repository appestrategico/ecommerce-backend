import { Router } from 'express';
import { Product } from '../models/product';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: El id auto-generado del producto
 *         name:
 *           type: string
 *           description: El nombre del producto
 *         price:
 *           type: number
 *           description: El precio del producto
 *         description:
 *           type: string
 *           description: La descripción del producto
 *         category:
 *           type: string
 *           description: La categoría del producto
 *         stock:
 *           type: number
 *           description: La cantidad en stock del producto
 *       example:
 *         id: d5fE_asz
 *         name: Producto de Ejemplo
 *         price: 99.99
 *         description: Este es un producto de ejemplo
 *         category: Categoría de Ejemplo
 *         stock: 100
 */

// Crear un producto
router.post('/', async (req, res) => {
  const { name, price, description, category, stock } = req.body;
  const product = new Product({ name, price, description, category, stock });
  await product.save();
  res.status(201).send(product);
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send({ message: 'Producto no encontrado' });
  res.send(product);
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).send({ message: 'Producto no encontrado' });
  res.send(product);
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).send({ message: 'Producto no encontrado' });
  res.send({ message: 'Producto eliminado' });
});

export default router;
