import siteMetadata from "@/data/siteMetadata"
import ContactLink from "@/components/ContactLink"
import { PageSEO } from "@/components/SEO"

const Contact = () => {
  return (
    <>
      <PageSEO title={`Contact - ${siteMetadata.author}`} description="All my contacts" />
      <div className="mx-auto max-w-3xl overflow-hidden">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Contact
        </h1>
        <div className="pb-8 pt-10">
          <ul className="font-semi-bold flex flex-col space-y-4">
            <ContactLink
              href="mailto:jamielmuhammadd@gmail.com"
              title="gmail"
              icon="jamielmuhammadd"
              data-umami-event="Contact Social: Email"
            />
            <ContactLink
              href="https://github.com/jamilmuhammad"
              title="github"
              icon="jamilmuhammad"
              data-umami-event="Contact Social: Github"
            />
            <ContactLink
              href="https://twitter.com/jamilmuhammaddd"
              title="twitter"
              icon="jamilmuhammaddd"
              data-umami-event="Contact Social: Twitter"
            />
            <ContactLink
              href="https://www.linkedin.com/in/jamilmuhammad/"
              title="linkedin"
              icon="jamilmuhammad"
              data-umami-event="Contact Social: Linkedin"
            />
          </ul>
        </div>
      </div>
    </>
  )
}

export default Contact
