import React from 'react';
import { Read } from '../actions/product';
import { addItem, updateItem, removeItem } from "../redux-store/actions/cart";
import { connect } from "react-redux";

const ProductDetail = (props) => {
    const [product, setProduct] = React.useState([]);
    const { image, drugName, drugCompany, price, stock, drugCode } = product;
    const [count, setcount] = React.useState(0);

    React.useEffect(() => {
        Read(props.match.params.productid).then(response => {
            if (response.error) {
                console.log(response.error);
            }
            else {
                setProduct(response);
                setcount(response.stock);
                console.log(response)
            };
        });
    }, []);

    const decreaseCount = () => {
        let newcount = count - 1;
        if (newcount < 0) {
            newcount = 0;
        }
        setcount(newcount);
        addItem(product, () => {
            console.log("added")
        });
    };

    return (
        <div className="px-md-5 mx-md-5 px-2 text-center">
            <h1 className="text-center font-weight-bolder mt-4 py-3">Product Details</h1>
            <div className="product-wrapper border p-4">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <img src={image} className="w-100" />
                    </div>
                    <div className="col-12 col-md-8 text-left">
                        <div className="mt-3">
                            <span>Name: </span>
                            <span>{drugName}</span>
                        </div>
                        <div className="mt-3">
                            <span>Company: </span>
                            <span>{drugCompany}</span>
                        </div>
                        <div className="mt-3">
                            <span >price: </span>
                            <span className="text-success font-weight-bolder">${price}</span>
                        </div>
                        <div className="mt-3">
                            <span>Stock: </span>
                            <span className="text-danger font-weight-bolder" style={{fontSize: '4rem'}}>{count === 0 ? 'Out of stock': count}</span>
                        </div>
                        <div className="mt-3">
                            <span>Code: </span>
                            <span className="text-warning font-weight-bolder">{drugCode}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mt-5 text-center">
                        <button
                           onClick={() => decreaseCount(product)}
                            style={{ textDecoration: "none" }}
                            className="bg-danger text-white px-5 py-3"
                        >
                            <span>Add To Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStatetoProps = state => ({
    numberOfItem: state.cart.item
});
const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    addItem: product => dispatch(addItem(product)),
    updateItem: (id, value) => dispatch(updateItem(id, value))
});

export default connect(mapStatetoProps, mapDispatchToProps)(ProductDetail);
