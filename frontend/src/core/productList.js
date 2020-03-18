import React from 'react';
import { Link } from 'react-router-dom';
import { List } from '../actions/product';

const ProductList = () => {
    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        List().then(response => {
            if (response.error) {
                console.log(response.error);
            }
            else {
                setProducts(response);
            };
        });
    }, []);

    return (
        <div className="px-md-5 mx-md-5 px-2">
            <h1 className="text-center font-weight-bolder mt-4 py-3">Products List</h1>
            <div className="row">
                {products.map((product, i) => (
                    <div key={i} className="col-12 col-md-2 border">
                        <div className="py-4">
                            <Link
                                to={`/productDetail/${product._id}`}
                                style={{ textDecoration: "none" }}
                                className="bg-danger text-white p-2"
                            >
                                <span>View Detail</span>
                            </Link>
                        </div>
                        <div>
                            <span className="text-warning">Name: </span>
                            <span className="small">{product.drugName.length > 30 ? product.drugName.substring(0, 30) + '...' : product.drugName}</span>
                        </div>
                        <div>
                            <span className="text-success">Company: </span>
                            <span className="small">{product.drugCompany}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList;