import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import imagesLoaded from "imagesloaded";

import Breadcrumb from "../../../common/breadcrumb";
import GridProduct from "./grid-airtimebills-products";
import Pagination from "../../../features/pagination";
import { setParallax } from "../../../../utils";

function AirtimeBills(props) {
  const [curPage, setCurPage] = useState(1);
  const [layout, setLayout] = useState("grid");
  const [productCount, setProductCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(12);

  useEffect(() => {
    let imgLoad = imagesLoaded(".product-group");

    if (document.querySelector(".skeleton-body")) {
      document.querySelector(".skeleton-body").classList.remove("loaded");
      imgLoad.on("done", function() {
        document.querySelector(".skeleton-body") &&
          document.querySelector(".skeleton-body").classList.add("loaded");
      });
    }
  });
  useEffect(() => {
    if (document.querySelector(".parallax")) {
      document.addEventListener("scroll", setParallax);
    }

    document.querySelector(".menu") &&
      document.querySelector(".menu").firstChild.classList.add("active");
    document.querySelector(".mobile-menu") &&
      document.querySelector(".mobile-menu").firstChild.classList.add("active");
  });

  const gridType = (layoutParam) => {
    if (layout !== layoutParam) {
      setLayout(layoutParam);
    }
  };

  const onChangeProductCount = (countParam) => {
    if (productCount !== countParam) setProductCount(countParam);
  };

  const onChangeCurPage = (curPageParam) => {
    if (curPage !== curPageParam) {
      setCurPage(curPageParam);
    }
  };

  const onChangeDisplayCount = (countParam) => {
    if (displayCount !== countParam) {
      setDisplayCount(countParam);
    }
  };

  return (
    <>
      <Helmet>
        <title>Customer Portal - Airtime and Bills</title>
      </Helmet>

      <h1 className="d-none">Customer Portal - Airtime and Bills</h1>

      <div class="jumbotron bill-jumbotron jumbotron-fluid">
        <div class="container jumbotron-container d-flex">
          <div className="mx-3">
            <Breadcrumb current="Fashion" parent="Airtime & Bills" />
            <div>
              <h4 className="font-weight-bold text-dark col-md-6 p-0 pt-2">
                Pay for your Airtime & Bills
              </h4>
              <div className="font-weight-normal text-dark w-50">
                Select a bill or airtime coucher to load available vouchers for
                the selected vendors
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="container skeleton-body skel-shop-products">
          <h2 className="mt-3 mb-3 section-title heading-border ls-20 border-0">
            Cable Bills
          </h2>
          <div className="product-wrapper">
            <GridProduct
              curPage={curPage}
              discount
              type={layout}
              productType="flex-grid"
              productCount={onChangeProductCount}
              displayCount={displayCount}
            />
          </div>
          <Pagination
            count={productCount}
            curPage={onChangeCurPage}
            productType="flex-grid"
            layout={layout}
            changeDisplay={onChangeDisplayCount}
            displayCount={displayCount}
            filters={props.filter}
          />
        </div>
        <div className="mb-5"></div>
      </div>
    </>
  );
}

const mapStateToProps = (state, props) => ({
  filter: state.filter ? state.filter : [],
});

export default connect(mapStateToProps, {})(AirtimeBills);
