 import { log } from "console";
import express from "express";
import { resourceUsage } from "process";
import { stringify } from "querystring";
import { json } from "stream/consumers";
 
const app = express();
app.use(express.json())

const users = [
    {"id":1, "nombre":"Juan Pérez"},
    {"id":2, "nombre":"Ana Gómez"},
    {"id":3, "nombre":"Carlos Rivera"},
    {"id":4, "nombre":"María López"},
    {"id":5, "nombre":"Luis Rodríguez"},
    {"id":6, "nombre":"Elena Martínez"},
    {"id":7, "nombre":"Jorge Herrera"},
    {"id":8, "nombre":"Sofía Morales"},
    {"id":9, "nombre":"Pedro Sánchez"},
    {"id":10, "nombre":"Lucía Fernández"}
  ]

  const products = [
    {"id":101, "nombre":"Laptop"},
    {"id":102, "nombre":"Smartphone"},
    {"id":103, "nombre":"Camiseta"},
    {"id":104, "nombre":"Zapatos"},
    {"id":105, "nombre":"Mochila"},
    {"id":106, "nombre":"Reloj"},
    {"id":107, "nombre":"Libro"},
    {"id":108, "nombre":"Auriculares"},
    {"id":109, "nombre":"Silla de oficina"},
    {"id":110, "nombre":"Mesa de comedor"}
  ]


  // PETICION DONDE OBTIENE TODOS LOS PRODUCTOS Y USUARIOS
app.get("/productos", (req, res) => {
  const allProductos = products.map((products) => products.nombre);
  res.status(200).json({allProductos});
});

app.get("/users", (req, res) => {

  const allClientes = users.map((cliente) => cliente.nombre);
  console.log(allClientes);
  
  res.status(200).json({allClientes});
});




// busca un producto en el array y lo devuelve

app.get("/productos/:id", (req,res) => {

  const id =  parseInt( req.params.id)
  const productoId = products.find((lista) => lista.id === id)
  if(!productoId) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
 res.status(200).json({ nombre: productoId.nombre });
});

// Actualizar un producto con su id 

app.put("/productos/:id", (req,res) =>{
  const idUrl = parseInt(req.params.id)
  const nuevoNombre =  stringify(req.body.nombre)
  console.log("nuevoNombre:", nuevoNombre);


  const idModificar = products.find((item)=>
      item.id === idUrl)
  console.log(idModificar)
  if (idModificar) {
    idModificar.nombre = nuevoNombre
  }
  else{
    return res.status(404).json({error:"No se modifico el producto"})
  }

  res.status(200).json(idModificar.nombre)
  
});
//vamos a borrar un producto cuando el usuario lo pida
app.delete("/productos/:id", (req,res)=>{

 const id =  parseInt(req.params.id)
const index = products.findIndex(producto => producto.id === id);
if (index !== -1) {
  products.splice(index, 1);
}
else{

    return res.status(404).json({error:"No se borro el producto"})
}

  res.status(200).json(products)

  




})
// agrega  un producto al array 
app.post("/productos",(req,res)=>{
  const productoNuevo = req.body.nombre
  
  if (!productoNuevo) {
return res.status(400).json({ error: "El nombre del producto es requerido." });
}
  const nuevoId =   products[products.length-1].id + 1
  products.push({"id":nuevoId, "nombre":productoNuevo})

  res.status(201).json(products[products.length-1])
}

)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
}); 
