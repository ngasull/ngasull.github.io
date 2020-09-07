import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const AboutPage = () => (
  <Layout lang="fr">
    <SEO title="About" />

    <p>Salut c'est Nico 👋</p>

    <p>
      Ma carrière commence en me forgeant une expertise autour des{" "}
      <b>technologies du web</b>. J'adore l'<b>architecture logicielle</b>,{" "}
      <b>l'efficacité</b>, <b>la théorie des langages de programmation</b> et
      les défis qu'engendre le développement en équipe. J'affectionne aussi
      particulièrement <b>la programmation fonctionnelle</b> et je cherche en
      permanence la <b>simplicité</b> plutôt qu'une complexité qui se voudrait{" "}
      <i>cool</i>.
    </p>

    <p>
      Voilà donc comment je me décris en tant que développeur. J'ai aussi un
      fort désir de création artistique, bien que sans véritable exprérience
      dans ce domaine. Je prends donc aussi le temps de me découvrir
      artistiquement, en particulier autour de la <b>composition musicale</b>{" "}
      pour laquelle le développement de jeux vidéo est un terrain de jeu idéal.
    </p>

    <h2>Me contacter</h2>

    <p>
      Le Web nous informe, nous connecte et nous permet de découvrir des univers
      fascinants tout entiers. Si tu veux discuter avec moi, quelle qu'en soit
      la raison, je serai ravi de te lire depuis le formulaire
      ci-dessous&nbsp;!&nbsp;🙂
    </p>

    <form action="https://formspree.io/myygvdwe" method="POST">
      <p>
        <label>
          Ton email
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
      <button type="submit">Envoyer</button>
    </form>
  </Layout>
)

export default AboutPage
