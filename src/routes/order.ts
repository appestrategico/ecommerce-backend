import { Router } from 'express';
import { Order } from '../models/order';
import { Product } from '../models/product';

const router = Router();

// Crear una orden
router.post('/', async (req, res) => {
  const { products, totalAmount } = req.body;
  const order = new Order({ products, totalAmount });
  await order.save();
  res.status(201).send(order);
});

// Obtener todas las órdenes
router.get('/', async (req, res) => {
  const orders = await Order.find().populate('products');
  res.send(orders);
});

// Obtener una orden por ID
router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id).populate('products');
  if (!order) return res.status(404).send({ message: 'Orden no encontrada' });
  res.send(order);
});

// Actualizar una orden
router.put('/:id', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('products');
  if (!order) return res.status(404).send({ message: 'Orden no encontrada' });
  res.send(order);
});

// Eliminar una orden
router.delete('/:id', async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).send({ message: 'Orden no encontrada' });
  res.send({ message: 'Orden eliminada' });
});

export default router;
