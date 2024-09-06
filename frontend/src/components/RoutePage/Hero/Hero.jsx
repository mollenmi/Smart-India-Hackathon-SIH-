import React from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../../utils";
import bc from "../../.././components/RoutePage/Hero/bc_logo_dm1.png"

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Beyond Classroom</h1>
        <p className={styles.description}>
        Welcome to Beyond Classroom, the platform designed to bridge the gap between current students and alumni. Whether you're seeking career guidance, mentorship, or networking opportunities, our platform allows you to connect with experienced alumni who can support and inspire you. Join us in building a thriving community where knowledge and experiences are shared for mutual growth.
        </p>
        <a href="#Signup" className={styles.contactBtn}>
          Join us now
        </a>
      </div>
      <img
        src={bc}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
