import Link from "@/components/Link"
import { PageSEO } from "@/components/SEO"
import { dayjs } from "@/components/DayJS"
import { Suspense, useMemo, useState } from "react"
import siteMetadata from "@/data/siteMetadata"
import { getCurrentlyReading } from "@/lib/goodreads"
import fetcher from "lib/fetcher"
import useSWR from "swr"
import { FaCloudShowersHeavy } from "react-icons/fa"
import {
  BsCloudDrizzleFill,
  BsCloudsFill,
  BsCloudLightningFill,
  BsCloudSnowFill,
  BsCloudFogFill,
  BsMoonFill,
  BsClock,
  BsSunFill,
  BsFillCloudSunFill,
  BsFillCloudMoonFill,
  BsFillCloudFill,
} from "react-icons/bs"
import SectionContainer from "@/components/SectionContainer"
import Image from "@/components/Image"

export const getServerSideProps = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=-6.2297209&lon=106.664705&appid=926356e81e0f4ed0f5ba6b978ce4523e&units=metric`
  )
  const data = await response.json()

  const currentlyReading = await getCurrentlyReading({ limit: 1 })

  return {
    props: { currentlyReading, data },
  }
}

export default function Now(currentlyReading) {
  const { data } = useSWR("/api/now-playing", fetcher)
  let currentlyReadingData = currentlyReading["currentlyReading"]
  let weatherData = currentlyReading["data"]
  const { temp: temperature } = weatherData.main
  const { icon: weatherIcon, description: weatherDescription } = weatherData.weather[0]

  const icons = {
    _01d: <BsSunFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _01n: <BsMoonFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _02d: <BsFillCloudSunFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _02n: <BsFillCloudMoonFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _03d: <BsFillCloudFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _03n: <BsFillCloudFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _04d: <BsCloudsFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _04n: <BsCloudsFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _09d: <BsCloudDrizzleFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _09n: <BsCloudDrizzleFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _10d: <FaCloudShowersHeavy className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _10n: <FaCloudShowersHeavy className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _11d: <BsCloudLightningFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _11n: <BsCloudLightningFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _13d: <BsCloudSnowFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _13n: <BsCloudSnowFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _50d: <BsCloudFogFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _50n: <BsCloudFogFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
  }

  var year = new Date().getFullYear()
  var month = new Date().getMonth()
  var date = new Date().getDate()
  const [TodayDate, setDate] = useState(() => dayjs().tz("Asia/Jakarta"))

  useMemo(() => {
    const timer = setInterval(() => setDate(() => dayjs().tz("Asia/Jakarta")), 1000)
    return () => clearInterval(timer)
  }, [TodayDate])

  var JamilBirthDate = "2000-04-16"
  var birthDate = new Date(JamilBirthDate)

  var JamilAge = year - birthDate.getFullYear()

  var JamilMonth = 0
  if (month >= birthDate.getMonth()) JamilMonth = month - birthDate.getMonth()
  else {
    JamilAge--
    JamilMonth = 12 + month - birthDate.getMonth()
  }

  var JamilDay = 0
  if (date >= birthDate.getDate()) JamilDay = date - birthDate.getDate()
  else {
    JamilMonth--
    JamilDay = 31 + date - birthDate.getDate()
    if (JamilMonth < 0) {
      JamilMonth = 11
      JamilAge--
    }
  }

  var age = {}
  age = {
    years: JamilAge,
    months: JamilMonth,
    days: JamilDay,
  }

  var ageString = ""
  if (age.years > 0 && age.months > 0 && age.days > 0)
    ageString = age.years + " years, " + age.months + " months, and " + age.days + " days old"
  else if (age.years == 0 && age.months == 0 && age.days > 0)
    ageString = "Only " + age.days + " days old"
  else if (age.years > 0 && age.months == 0 && age.days == 0)
    ageString = age.years + " years old. Happy Birthday!!"
  else if (age.years > 0 && age.months > 0 && age.days == 0)
    ageString = age.years + " years and " + age.months + " months old"
  else if (age.years == 0 && age.months > 0 && age.days > 0)
    ageString = age.months + " months and " + age.days + " days old"
  else if (age.years > 0 && age.months == 0 && age.days > 0)
    ageString = age.years + " years, and" + age.days + " days old"
  else if (age.years == 0 && age.months > 0 && age.days == 0) ageString = age.months + " months old"
  else ageString = "Welcome to Earth! <br> It's first day on Earth!"

  return (
    <SectionContainer>
      <PageSEO
        title={`Now - ${siteMetadata.author}`}
        description="What I'm working on now"
        url={siteMetadata.url}
      />
      <div>
        <div className="my-2">
          <h3>Where am I and what am I doing?</h3>
        </div>
        {/* Misc */}
        <div>
          <div className="flex justify-between gap-5">
            <div className="mb-10 mt-2 w-1/2 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
              <span className="ml-2 font-semibold">Location:</span> <span>Jakarta, Indonesia</span>
              <br />
              <span className="ml-2 font-semibold">Weather:</span>{" "}
              <span>
                <a
                  href="https://weather.com/en-GB/weather/today/l/f42d9f8baa19b4d8d5e034449faa703839993366f64551a56a2b530297075dc2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-1 hover:underline"
                >
                  <Suspense>{icons[`_${weatherIcon}`]}</Suspense> Currently{" "}
                  <b>{parseInt(temperature)}°C</b>
                  {" with "}
                  <span>{weatherDescription}</span>
                </a>
              </span>
            </div>

            <div className="mb-10 mt-2 w-1/2 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
              <span className="ml-2 font-semibold">Reading:</span>{" "}
              <a
                href={currentlyReadingData[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-1 hover:underline"
              >
                <span>{currentlyReadingData[0].title}</span> by{" "}
                <span>{currentlyReadingData[0].author}</span>
              </a>
              <br />
              <span className="ml-2 font-semibold">Age:</span> <span>{ageString}</span>
            </div>
          </div>

          <div className="-my-6 flex justify-between gap-5">
            <div className="mb-10 mt-2 w-1/2 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
              <span className="ml-2 font-semibold">Date:</span>{" "}
              <span>{TodayDate.format("DD/MM/YYYY")}</span>
              <br />
              <span className="ml-2 font-semibold">Time:</span>{" "}
              <span>
                <Suspense>
                  <BsClock className="mb-0.5 inline h-3 w-3 hover:animate-spin" />{" "}
                </Suspense>
                {TodayDate.format("h:mm:ss A")}
              </span>
            </div>

            <div className="mb-10 mt-2 w-1/2 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
              <span className="ml-2 font-semibold">Listening:</span>{" "}
              <span>
                {data?.songUrl ? (
                  <a
                    href={data.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-1 hover:underline"
                  >
                    <Image
                      src={data.albumImageUrl}
                      width={70}
                      height={70}
                      alt={`song image ${data.title}, ${data.artist}`}
                      className="h-25 w-25 rounded-md dark:shadow-gray-800"
                      placeholder="blur"
                      blurDataURL="/static/images/SVG-placeholder.png"
                    />
                    <span>
                      {data.title}, {data.artist}
                    </span>
                  </a>
                ) : (
                  <span>Not Playing</span>
                )}
              </span>
              <br />
              <span className="ml-2 font-semibold">Drinking:</span> <span>Coffee</span>
            </div>
          </div>
        </div>
        <div className="justify-center text-center text-2xl font-medium text-gray-200 dark:text-gray-600">
          &#126;&#126;&#126;
        </div>
      </div>
    </SectionContainer>
  )
}
