import React, { JSX } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Artemis is designed is to be easy to use and collect data with
        minimal system impact. Collecting data is as easy as: <b>artemis acquire prefetch</b>
      </>
    ),
  },
  {
    title: "Collect large number of artifacts ",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Artemis supports 100+ artifacts across Linux, macOS, Windows, and FreeBSD. You
        can collect this data locally or upload to cloud services such as AWS,
        Azure, or GCP.
      </>
    ),
  },
  {
    title: "Rust with a TypeScript API",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Artemis is written in Rust. However, it has TypeScript API that
        can be used to script and filter collections.
      </>

    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
