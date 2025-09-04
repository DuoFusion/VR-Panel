import { Fragment } from "react";
import { Breadcrumbs } from "../../coreComponents";

const DashboardContainer = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Dashboard" parent="Pages" />

      {/* Fallback iframe */}
      <iframe title="drive-player" src="https://drive.google.com/file/d/1KSpTSiSuyB-yi1Ypw6x6zESAW3Wum-Tx/preview" width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture"/>
    </Fragment>
  );
};

export default DashboardContainer;
