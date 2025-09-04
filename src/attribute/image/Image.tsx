import { FC } from "react";
import { Media } from "reactstrap";
import  { ImageProps } from "../../types";

const Image: FC<ImageProps> = (props) => {
  return <Media {...props} alt={props.alt ? props.alt : "image"} loading="lazy" />;
};
export default Image