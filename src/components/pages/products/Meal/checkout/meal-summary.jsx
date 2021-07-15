import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { AuctionContext } from "../../../../../context/Auctions.js";
import LoaderContext from "../../../../../context/Loading.js";
import { isStateHandled } from "./../../../../../../src/utils/index.js";
import SuccessModalWithButton from "../../../../common/modals/SuccessModalWithButton.jsx";
import Loading from "../../../../features/Loader/Loading.jsx";

import dodo from "./../assets/company-logos/dodo.svg";
import "./../meal.css";

function MealSummary(props) {
  const { cartItmes, deliveryData } = props;
  const { calculateDelivery, deliveryState } = useContext(AuctionContext);
  const { loading } = useContext(LoaderContext);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (
      isStateHandled(deliveryState) &&
      !isStateHandled(deliveryState).status
    ) {
      swal({
        title: "Oops!",
        text: isStateHandled(deliveryState).message,
        icon: "error",
        button: "Ok",
      });
      return;
    }

    if (isStateHandled(deliveryState) && isStateHandled(deliveryState).status) {
      setShowSuccess(true);
      return;
    }
  }, [deliveryState.data]);

  const proceedToPay = () => {
    setShowSuccess(true);
    return;
    const data = {
      auction_ref_no: deliveryData.auction_ref_no,
      member_no: deliveryData.member_no,
      to_city: deliveryData.city_id,
      to_address: deliveryData.address,
    };

    calculateDelivery(data);
  };
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="card cap-table grey-bg p-3">
        <div className="card-body">
          <h5>Summary</h5>
          <div
            style={{ borderTop: "1px solid #DFDFDF", paddingTop: "10px" }}
            className="row"
          >
            <img className="w-25" src={dodo} alt="" />
            <div className="col-md-8">
              <h5 style={{ color: "#22242A" }}>
                Nike Air Jordan 13 XIII Retro Low Clot Terracotta Sepia Size 13
              </h5>
            </div>
            <hr
              style={{
                color: "grey",
                backgroundColor: "grey",
                height: 5,
              }}
            />{" "}
            <div className="col-md-12 p-0 m-0 mt-3">
              <div className="mb-2 d-flex justify-content-between">
                <div className="subtext">
                  Beef Shawarma with double hotdog x2
                </div>
                <div class="black-text subtext">
                  2,000 <span class="ruby-tag">Rubies</span>
                </div>
              </div>
              <div className="mb-2 d-flex justify-content-between">
                <div className="subtext">
                  Beef Shawarma with double hotdog x2
                </div>
                <div class="black-text subtext">
                  2,000 <span class="ruby-tag">Rubies</span>
                </div>
              </div>
              <div className="mb-2 d-flex justify-content-between">
                <p className="subtext">Beef Shawarma with double hotdog x2</p>
                <p class="black-text subtext">
                  2,000 <span class="ruby-tag">Rubies</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginBottom: "0rem",
            border: "none",
            borderTop: "1px solid #DFDFDF",
          }}
          className="card"
        >
          <div className="card-body">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div>
                <p>Subtotal</p>
                <p>Delivery cost</p>
                <p className="bold">Grand total</p>
              </div>
              <div>
                <p>10,500 Rubies</p>
                <p>500 Rubies</p>
                <p className="bold">11,000 Rubies</p>
              </div>
            </div>
            <button
              onClick={() => proceedToPay()}
              className="btn btn-block btn-sm btn-primary float-right"
            >
              <i className="fas fa-hourglass-start mr-4"></i>
              Process Order & Pay
            </button>
          </div>
        </div>
      </div>
      {showSuccess === true ? (
        <SuccessModalWithButton
          hidemodal={() => setShowSuccess(false)}
          data={{
            messageTitle: `Order Successful`,
            messageBody: `Your order has been submited successfully`,
            buttonText: `View Order Details`,
            link: `${process.env.PUBLIC_URL}/pages/order_receipts/meal`,
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default MealSummary;
