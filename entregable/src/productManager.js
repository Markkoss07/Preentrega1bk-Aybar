import {promises as fs} from 'fs'


export class ProductManager {
  constructor() {
    this.path = 'products.json';
    this.products = [];
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  addProduct = async ({
    title, 
    descripcion,
    thumbanail,
    price,
    code, 
    stock,
    status,
    category
  }) => {
    const id = this.products.length + 1;

    let newProduct = {
      id,
      title,
      descripcion,
      thumbanail,
      price,
      code,
      stock,
      status,
      category
    }

    this.products = await this.getProducts()
    this.products.push(newProduct)

    await fs.writeFile(this.path, JSON.stringify(this.products))

    return newProduct;
  }

  getProducts = async () =>{
    const response = await fs.readFile(this.path, 'utf8')
    const responseJSON = JSON.parse(response)

    return responseJSON;
  }

  getProductById= async (id) => {
    const response = await this.getProducts();

    const product = response.find(product => product.id == id) 
    if(product){
      return product
    } else {
      console.log('Producto no encontrado');
    }
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.saveProducts();
      return this.products[index];
    } else {
      console.log('Producto no encontrado');
    }
  }

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
      products.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(products))
    } else {
      console.log('Producto no encontrado');
    }
  }
}

// export default ProductManager(); 
// En esta linea si al exportar la clase de ProductManager como una funcion no me lo toma correctamente pero si le saco los parentesis, me empieza a crear productos sin parar
// const createInitialProducts = () => {
//   const productManager = new ProductManager('./productos.json');

//   productManager.addProduct({
//     titulo: "La noche estrellada",
//     descripcion: "representa la vista desde la ventana de la habitación del pintor  Vincent van Gogh durante su estancia en un asilo psiquiátrico.",
//     precio: 110000,
//     imagen: "https://media.admagazine.com/photos/618a6acbcc7069ed5077ca7f/master/w_1600,c_limit/68704.jpg",
//     codigo: "A1",
//     stock: 10,
//   });
//   productManager.addProduct({
//     titulo: "La joven de la perla",
//     descripcion: "La posición del retrato y el pendiente de perla que destaca en su vestimenta ha sido uno de los grandes misterios del mundo del arte.",
//     precio: 80000,
//     imagen: "https://media.admagazine.com/photos/618a6acb5e45a526c6be8f9c/master/w_1600,c_limit/68703.jpg",
//     codigo: "A2",
//     stock: 10,
//   });
//   productManager.addProduct({
//     titulo: "El horizonte",
//     descripcion: "El objetivo de esta obra es concienciar sobre la conservación de las montañas, teniendo en cuenta su papel en los ecosistemas.",
//     precio: 18000,
//     imagen: "https://www.p55.art/cdn/shop/articles/Design_sem_nome_1_54a30f84-cf36-484f-a29c-4437cd37ccf3.png?v=1639070159",
//     codigo: "A3",
//     stock: 10,
//   });
//   productManager.addProduct({
//     titulo: "La Mona Lisa, Leonardo da Vinci",
//     descripcion: "Considerada una de las grandes joyas del museo Louvre, en París, y una de las obras de arte más misteriosas del mundo. La técnica con la que fue pintada ha sido estudiada en múltiples ocasiones por los efectos ópticos en los ojos y su sonrisa vacilante",
//     categoria: "bellas artes",
//     precio: 150000,
//     imagen: "https://media.admagazine.com/photos/618a6ac93174d0288cf2d418/master/w_1600,c_limit/68699.jpg",
//     codigo: "A4",
//     stock: 4
//   });
//   productManager.addProduct({
//     titulo: "Camino",
//     descripcion: "Esta obra es considerada un Paisaje hiperrealista natural, el cual está pintado en Óleo en lienzo",
//     categoria: "decorativo",
//     precio: 16000,
//     imagen: "https://1.bp.blogspot.com/-IjRDadbwbic/VOJd_Yzfq9I/AAAAAAAC96c/riQd6_BIHVo/s1600/nombres-de-pintores-de-paisajes-contemporaneos.jpg",
//     codigo: "A5",
//     stock: 10
//   });
//   productManager.addProduct({
//     titulo: "El Rojo",
//     descripcion: "Cuadro Rojo, obra abstracta estilo moderno, pintura minimalista basada en el juego combinación de tonalidades rojizas.",
//     categoria: "decorativo",
//     precio: 15000,
//     imagen: "https://www.todocuadros.ar/media/catalog/product/cache/6/image/386x490/a4b764e5482f62fb51dae89ed3917009/r/o/rojo-abstracto.jpg",
//     codigo: "A6",
//     stock: 10
//   });
//   productManager.addProduct({
//     titulo: "Los girasoles",
//     descripcion: "Solemos generalizar como 'Los girasoles' a una colección de siete cuadros distintos en los que el pintor retrató de manera excepcional dicha planta. El que vemos en la imagen es el jarrón con doce girasoles en el que el pintor contrasta el amarillo y el fondo turquesa.",
//     categoria: "decorativo",
//     precio: 45000,
//     imagen: "https://hips.hearstapps.com/hmg-prod/images/los-girasoles-1646763422.jpg?crop=1xw:1xh;center,top&resize=980:*",
//     codigo: "A8",
//     stock: 10
//   });
//   productManager.addProduct({
//     titulo: "La Pesca",
//     descripcion: "Esta pintura fue creada al óleo sobre lienzo artístico usando la técnica única de espátula de Afremov. La obra tiene textura, se puede sentir los trazos tocando la pintura.",
//     categoria: "blanco y negro",
//     precio: 18000,
//     imagen: "https://afremov.com/media/catalog/product/cache/029c9410eb6b6a309d2f6c6bdfc6e2f2/0895_30X30_FISHING_ON_THE_LAKE.jpg",
//     codigo: "A7",
//     stock: 5
//   });
//   productManager.addProduct({
//     titulo: "Ballet",
//     descripcion: "Una bella obra de arte con una textura sobresaliente, inspirada en una gran foto que le tomaron a una bailarina  ",
//     categoria: "blanco y negro",
//     precio: 12000,
//     imagen: "https://i.pinimg.com/originals/f4/29/42/f429423c38e5fb6a2c53a222ad3a6932.jpg",
//     codigo: "A9",
//     stock: 10
//   });
//   productManager.addProduct({
//     titulo: "Soledad en otoño",
//     descripcion: "Esta pintura fue creada al óleo sobre lienzo artístico usando la técnica única de espátula de Afremov. La obra tiene textura, se puede sentir los trazos tocando la pintura.",
//     categoria: "blanco y negro",
//     precio: 20000,
//     imagen: "https://afremov.com/media/catalog/product/LONELINESS-OF-AUTUMN.jpg",
//     codigo: "A10",
//     stock: 5
//   });

//   return productManager;
// };

// export default createInitialProducts;