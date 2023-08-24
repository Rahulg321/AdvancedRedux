import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "Book",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    id: "p2",
    title: "Laptop",
    price: 800,
    description: "Powerful laptop for all your computing needs.",
  },
  {
    id: "p3",
    title: "Headphones",
    price: 50,
    description: "High-quality headphones for immersive audio experience.",
  },
  // Add more items here...
  {
    id: "p8",
    title: "Smartwatch",
    price: 120,
    description: "Stay connected with this feature-rich smartwatch.",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
