import { Fragment } from "react";
import CountUp from "react-countup";
import SvgIcon from "../../attribute/icons/SvgIcon";
import { Breadcrumbs } from "../../coreComponents";

const DashboardContainer = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Dashboard" parent="Pages" />
      <div className="container-fluid">
        <div className="default-dashboard">
          <div className="row">
            <div className="col-lg-4 col-sm-12 box-col-6">
              <div className="main-card-box bg-light-secondary analytics-tread-card p-20 height-equal">
                <div className="header-top">
                  <div>
                    <h2 className="mb-2">
                      ₹<CountUp end={1222222} separator="," />
                    </h2>
                    <span className="mb-1">Total Income</span>
                  </div>
                  <div className="analytics-tread secondary">
                    <SvgIcon className="stroke-icon" iconId="analytics-user" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 box-col-6">
              <div className="main-card-box bg-light-info analytics-tread-card p-20 height-equal">
                <div className="header-top">
                  <div>
                    <h2 className="mb-2">
                      ₹<CountUp end={1222222} separator="," />
                    </h2>
                    <span className="mb-1">Total Workshop</span>
                  </div>
                  <div className="analytics-tread info">
                    <SvgIcon className="stroke-icon" iconId="analytics-session" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 box-col-6">
              <div className="card overflow-hidden analytics-tread-card height-equal main-card-box">
                <div className="card-header card-no-border total-analytics-tread bg-light-warning">
                  <div className="header-top">
                    <div>
                      <h2 className="mb-2">
                        ₹<CountUp end={1222222} separator="," />
                      </h2>
                      <span className="mb-1">Total Course</span>
                    </div>
                    <div className="analytics-tread warning">
                      <SvgIcon className="stroke-icon" iconId="analytics-duration" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-3">
          <div className="card">
            <div className="row">
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-secondary">
                      <SvgIcon className="svg-fill" iconId="stroke-user" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total User Registration</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-info">
                      <SvgIcon className="svg-fill" iconId="stroke-file" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total Workshop</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-dark">
                      <SvgIcon className="svg-fill" iconId="stroke-to-do" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total Workshop Register</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-warning">
                      <SvgIcon className="svg-fill" iconId="stroke-sample-page" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total Courses</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-secondary">
                      <SvgIcon className="svg-fill" iconId="stroke-table" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total Courses Register</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-info">
                      <SvgIcon className="svg-fill" iconId="stroke-project" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total Language</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-dark">
                      <SvgIcon className="svg-fill" iconId="stroke-icons" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total Achievements</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-warning">
                      <SvgIcon className="svg-fill" iconId="stroke-contact" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total Contact Us</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-secondary">
                      <SvgIcon className="svg-fill" iconId="stroke-button" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total Testimonials</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-info">
                      <SvgIcon className="svg-fill" iconId="stroke-faq" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total FAQ</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-dark">
                      <SvgIcon className="svg-fill" iconId="stroke-blog" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total Blog</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 sales-border">
                <div className="sales-card">
                  <div className="e-commerce-card">
                    <div className="svg-box bg-light-warning">
                      <SvgIcon className="svg-fill" iconId="stroke-bookmark" />
                    </div>
                    <div>
                      <h4 className="counter">214</h4>
                      <span>Total News Letter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardContainer;
