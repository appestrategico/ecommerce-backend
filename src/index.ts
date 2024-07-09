import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose, { Schema, Document } from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

// Cadena de conexión obtenida desde MongoDB Atlas
const uri = 'mongodb+srv://appestrategico:x29am1T5FHenO2eI@cluster.mongodb.net/appestrategico@admin';

// Configurar conexión a MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

// Definición del esquema de Producto
interface Product extends Document {
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock?: number;
}

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  stock: { type: Number },
});

const ProductModel = mongoose.model<Product>('Product', ProductSchema);

// Middleware para parsear JSON
app.use(bodyParser.json());

// Rutas de productos
// CRUD endpoints para productos

// Obtener todos los productos
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Obtener un producto por ID
app.get('/api/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Crear un nuevo producto
app.post('/api/products', async (req: Request, res: Response) => {
  const { name, price, description, category, stock } = req.body;
  const newProduct = new ProductModel({ name, price, description, category, stock });
  try {
    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Actualizar un producto por ID
app.put('/api/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description, category, stock } = req.body;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { name, price, description, category, stock },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Eliminar un producto por ID
app.delete('/api/products/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
