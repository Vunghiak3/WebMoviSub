import logo from "./logo.png";
import google from "./google.png";
import facebook from "./facebook.png";
import github from "./github.png";
import user from "./user.png";
import { StaticImageData } from "next/image";

interface ImageInfo {
  src: StaticImageData;
  alt: string;
}

const images: Record<string, ImageInfo> = {
  imgLogo: {
    src: logo,
    alt: "Logo MoviSubs",
  },
  google: {
    src: google,
    alt: "Icon Google",
  },
  github: {
    src: github,
    alt: "Icon Github",
  },
  facebook: {
    src: facebook,
    alt: "Icon Facebook",
  },
  user: {
    src: user,
    alt: "Image User",
  },
};

export default images;
