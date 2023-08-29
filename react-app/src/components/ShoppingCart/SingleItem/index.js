import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../AllShoppingCartItems/AllShoppingCartItems.css";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton/index";
import { OrderCompleteModal } from "../OrderCompleteModal";

//!need to add when click on item card redirect to product detail page
import { deleteItemThunk } from "../../../store/shoppingCartReducer";
//!need to add when click on remove it removes the item from cart


export default function SingleItems({ item, product }) {
  const productQuantity = item.product.quantity;
  const quantityArr = [...Array(productQuantity + 1).keys()];
  quantityArr.shift(); //1......productQuantity

  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  
  const price = item.product.price;
  const itemTotal = (item.product.price * purchaseQuantity).toFixed(2);
  const discount = (price * 0.2 * purchaseQuantity).toFixed(2);
  const subtotal = (price * 0.8 * purchaseQuantity).toFixed(2);
  const shipping = (price * 0.1 * purchaseQuantity).toFixed(2);
  const total = (price * 1.1 * purchaseQuantity).toFixed(2);
  
  // const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const removeItem = async () => {
    await dispatch(deleteItemThunk(item))
  };


  // if (!sessionUser) return null;
  return (
    <div className="components-border row space-between margin-bottom">
      <div className="item container row card">
        <div className="owner-item-delete column margin-right">
          <div className=" product-owner row space-between">
            <div>{product?.ownerName}</div>
            <div>Contact shop</div>
          </div>
          <div className="item-detail container row">
            <div className="img-delete column">
              <div className="">
                <img
                  src={product?.product_image[0]}
                  alt=""
                  className="cart-img"
                />
              </div>
              <div>
              <button onClick={removeItem}><i className="fa-solid fa-x" ></i> Remove</button>
              </div>
            </div>
            <div className="description-quantity column">
              <div>{item.product.name}</div>
              <div>Quantity</div>
              <label>
                <select
                  name="selectedPurchaseQuantity"
                  value={purchaseQuantity}
                  onChange={(e) => setPurchaseQuantity(e.target.value)}
                >
                  {quantityArr.map((number) => (
                    <option value={number}>{number}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="item-price container column">
          <div>${price}</div>
          <div className="red">
            Only {item.product.quantity} available and it's in 2 people's carts
          </div>
          {/* <div>3 sold in the past 24 hours</div> */}
        </div>
      </div>
      <div className="payment container column margin-right padding">
        <div className="column">
          <div>How you'll pay</div>
          <label>
            <input type="radio" name="myRadio" value="option1" />
            Credit cards
          </label>
          <label>
            <input type="radio" name="myRadio" value="option2" />
            Paypal
          </label>
          <label>
            <input type="radio" name="myRadio" value="option3" />G pay
          </label>
        </div>
        <div className="row space-between">
          <div>Item(s) total</div>
          <div>${itemTotal}</div>
        </div>
        <div className="row space-between">
          <div>Shop discount</div>
          <div>-${discount}</div>
        </div>
        <div className="row space-between">
          <div>Subtotal</div>
          <div>${subtotal}</div>
        </div>
        <div className="row space-between">
          <div>Shipping</div>
          <div>${shipping}</div>
        </div>
        <div className="row space-between">
          <div>Total (1 item)</div>
          <div>${total}</div>
        </div>
        <div className="row center">
          <OpenModalButton
            buttonStyle="black-button"
            buttonText="Order up!"
            modalComponent={<OrderCompleteModal item={item} />}
          />
        </div>
      </div>
    </div>
  );
}
