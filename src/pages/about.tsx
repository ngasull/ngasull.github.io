import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />

    <p>Hi 👋 I am Nicolas Gasull.</p>

    <p>
      I started my carrer building a software development expertise specialized
      in <b>web technologies</b>. I love <b>software architecture</b>,{" "}
      <b>efficiency</b>,<b>programming languages theory</b> and challenges that
      come with developing sofware as a team. I&apos;m also a{" "}
      <b>functional programming</b> enthusiast who always seeks for effective{" "}
      <b>simplicity</b> over fancy complexity.
    </p>

    <p>
      As much as I just defined myself as a developer, I also crave artistic
      creativity. My experience is much lower in this domain and I&apos;m
      spending more time exploring it. I especially enjoy analyzing{" "}
      <b>music composition</b>
      which I intend to express through <b>game dev tools development</b>.
    </p>

    <h2>Contact me</h2>

    <p>
      The Web brings us so much knowledge and connection between communities and
      digging into new worlds became fascinating. If you just want to discuss
      with me for any reason, I would love to hear from you through the form
      below!&nbsp;🙂
    </p>

    <form action="https://formspree.io/myygvdwe" method="POST">
      <p>
        <label>
          Your email
          <br />
          <input type="email" name="_replyto" required />
        </label>
      </p>
      <p>
        <label>
          Message
          <br />
          <textarea name="message" rows={6}></textarea>
        </label>
      </p>
      <button type="submit">Send</button>
    </form>
  </Layout>
)

export default AboutPage
