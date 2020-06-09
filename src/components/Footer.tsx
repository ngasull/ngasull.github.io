import React from "react"
import SocialIcon from "~/components/SocialIcon"

export default function Footer(): React.ReactElement {
	return (
		<footer className="site-footer">
			<div className="container">
				<div className="one-half col">
					Copyright © 2019
					{new Date().getFullYear() > 2019 &&
						`-${new Date().getFullYear()}`}{" "}
					<a
						href="/about"
						dangerouslySetInnerHTML={{ __html: "Nicolas&nbsp;Gasull" }}
					/>
				</div>

				<address className="social-list one-half col">
					<a href="https://www.twitter.com/ngasull">
						<SocialIcon icon="twitter" />
					</a>
					<a href="https://www.github.com/ngasull">
						<SocialIcon icon="github" />
					</a>
					<a href="https://stackoverflow.com/users/2219133/ngasull">
						<SocialIcon icon="stackoverflow" />
					</a>
					<a href="https://www.linkedin.com/in/nicolasgasull">
						<SocialIcon icon="linkedin" />
					</a>
					<a href="/about">
						<SocialIcon icon="at" />
					</a>
					<a href="/feed.xml">
						<SocialIcon icon="rss" />
					</a>
				</address>
			</div>
		</footer>
	)
}
