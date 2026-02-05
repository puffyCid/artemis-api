import React, { JSX } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: JSX.Element;
  image: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    description: (
      <>
        Data collection is as easy as: <br></br> <b>artemis acquire processes</b>
      </>
    ),
    image: require("@site/static/img/cat_chill.png").default,
  },
  {
    title: "Collect a large number of artifacts ",
    description: (
      <>
        Support for over 100 artifacts across Linux, macOS, Windows, and FreeBSD. 
      </>
    ),
    image: require("@site/static/img/cat_scientist.png").default,
  },
  {
    title: "Rust with a TypeScript API",
    description: (
      <>
        Create scripts with TypeScript that
        leverages Rust.
      </>

    ),
    image: require("@site/static/img/cat_coder.png").default,
  },
];

function Feature({ title, description, image }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={image} className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => <Feature key={idx} {...props} />)}
        </div>
      </div>
    </section>
  );
}
