import Image from "next/image";
import imgPhone from "../assets/img-landing.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Title from "@/components/Title";
import playstore from "../assets/playstore.svg";
import appstore from "../assets/appstore.svg";
import img1 from "../assets/microsoft.svg";
import img2 from "../assets/dropbox.svg";
import img3 from "../assets/h&m.svg";
import img4 from "../assets/airbnb.svg";
import img5 from "../assets/canon.svg";
import img6 from "../assets/dell.svg";
import img7 from "../assets/peopel.png";
import PublicRoute from "@/utils/wrapper/publicRoute";

function Home() {
  return (
    <Title title={"Home"}>
      <Header />
      <main className="font-nunitosans bg-secondary ">
        <section className="flex px-4 py-10 xl:px-32 xl:pb-32">
          <div className="flex-1 relative">
            <div className="hidden md:flex md:w-52 md:h-96 xl:w-[22.808rem] xl:h-[45.514rem] absolute md:left-14 xl:-top-24 xl:left-10">
              <Image
                src={imgPhone}
                alt="img-phone"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:flex-1 xl:mt-20">
            <h1 className="xl:w-[30rem] text-4xl xl:text-6xl font-extrabold mb-10">
              Awesome App For Saving <span className="text-primary">Time.</span>
            </h1>
            <p className="xl:w-[27rem] text-lg">
              We bring you a mobile app for banking problems that oftenly
              wasting much of your times.
            </p>
            <button className="bg-primary text-white py-4 px-11 rounded-xl my-12">
              Try It Free
            </button>
            <p className="text-lg">Available on</p>
            <div className="flex gap-11 mt-7">
              <div>
                <Image src={playstore} alt="playstore" />
              </div>
              <div>
                <Image src={appstore} alt="appstore" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-home px-4 py-10 xl:px-32 xl:py-28 flex justify-between items-center">
          <div className="xl:w-40 xl:h-[7.5rem]">
            <Image
              src={img1}
              alt="sponsor"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="xl:w-40 xl:h-[7.5rem]">
            <Image
              src={img2}
              alt="sponsor"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="xl:w-40 xl:h-[7.5rem]">
            <Image
              src={img3}
              alt="sponsor"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="xl:w-40 xl:h-[7.5rem]">
            <Image
              src={img4}
              alt="sponsor"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="xl:w-40 xl:h-[7.5rem]">
            <Image
              src={img5}
              alt="sponsor"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Image src={img6} alt="sponsor" />
          </div>
        </section>

        <section className="flex flex-col items-center px-4 py-10 xl:px-32 xl:py-32">
          <h1 className="text-center text-4xl xl:text-6xl font-extrabold mb-8">
            <span className="text-primary">About</span> the Application.
          </h1>
          <p className="text-center text-lg lg:w-[567px]">
            We have some great features from the application and it’s totally
            free to use by all users around the world.
          </p>
          <div className="flex flex-col md:flex-row gap-5 justify-between mt-[4.4rem]">
            <div className="flex flex-col justify-center items-center gap-4 xl:w-[20rem] xl:h-[18rem] py-10 px-7 hover:bg-white hover:rounded-xl">
              <div className="flex justify-center items-center w-14 h-14 rounded-full  bg-[#473AD11A]">
                <i className="bi bi-telephone text-primary text-2xl"></i>
              </div>
              <p className="text-xl font-bold">24/7 Support</p>
              <p className="text-center w-[267px] md:w-[167px] xl:w-fit">
                We have 24/7 contact support so you can contact us whenever you
                want and we will respond it.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center gap-4 xl:w-[20rem] xl:h-[18rem] py-10 px-7 hover:bg-white hover:rounded-xl">
              <div className="flex justify-center items-center w-14 h-14 rounded-full  bg-[#473AD11A]">
                <i className="bi bi-lock text-primary text-2xl"></i>
              </div>
              <p className="text-xl font-bold">Data Privacy</p>
              <p className="text-center w-[267px] md:w-[167px] xl:w-fit">
                We make sure your data is safe in our database and we will
                encrypt any data you submitted to us.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center gap-4 xl:w-[20rem] xl:h-[18rem] py-10 px-7 hover:bg-white hover:rounded-xl">
              <div className="flex justify-center items-center w-14 h-14 rounded-full  bg-[#473AD11A]">
                <i className="bi bi-download text-primary text-2xl"></i>
              </div>
              <p className="text-xl font-bold">Easy Download</p>
              <p className="text-center w-[267px] md:w-[167px] xl:w-fit">
                Zwallet is 100% totally free to use it’s now available on Google
                Play Store and App Store.
              </p>
            </div>
          </div>
        </section>

        <section className="relative bg-home flex px-4 py-10 xl:px-32 xl:py-20">
          <div className="flex-1 ">
            <div className="hidden md:flex md:w-52 md:h-96 xl:w-[22.808rem] xl:h-[45.514rem] absolute md:left-14 xl:-top-10 xl:left-24">
              <Image
                src={imgPhone}
                alt="img-phone"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:flex-1">
            <h1 className="xl:w-[32rem] text-4xl xl:text-6xl font-extrabold mb-10">
              All The <span className="text-primary">Great</span> FazzPay
              Features.
            </h1>
            <div className="flex flex-col gap-7">
              <div className="bg-secondary p-6 rounded-xl">
                <p className="font-bold text-xl">
                  <span className="text-primary">1.</span> Small Fee
                </p>
                <p className="text-lg md:w-[400px] xl:w-[565px]">
                  We only charge 5% of every success transaction done in FazzPay
                  app.
                </p>
              </div>
              <div className="bg-secondary p-6 rounded-xl">
                <p className="font-bold text-xl">
                  <span className="text-primary">2.</span> Data Secured
                </p>
                <p className="text-lg md:w-[400px] xl:w-[565px]">
                  All your data is secured properly in our system and it’s
                  encrypted.
                </p>
              </div>
              <div className="bg-secondary p-6 rounded-xl">
                <p className="font-bold text-xl">
                  <span className="text-primary">3.</span> User Friendly
                </p>
                <p className="text-lg md:w-[400px] xl:w-[565px]">
                  FazzPay come up with modern and sleek design and not
                  complicated.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-between items-center relative px-4 py-10 xl:px-32  xl:py-32">
          <div className="absolute xl:relative bg-white w-10 h-10 left-2 md:left-4 rounded-2xl grid place-items-center cursor-pointer">
            <i className="bi bi-arrow-left"></i>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="font-extrabold text-4xl xl:text-6xl text-center">
              What Users are <span className="text-primary">Saying.</span>
            </h1>
            <p className="text-lg mt-7 w-[80%] text-center">
              We have some great features from the application and it’s totally
              free to use by all users around the world.
            </p>
            <div className="w-4/5 md:w-3/4 xl:w-full flex flex-col items-center p-6 md:p-14 bg-white mt-14 rounded-3xl">
              <div className="w-[7.5rem] h-[7.5rem]">
                <Image
                  src={img7}
                  alt="peopel"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <p className="text-2xl font-bold mt-7">Alex Hansinburg</p>
              <p className="text-xl text-font-primary-blur">Designer</p>
              <p className="xl:w-[869px] text-center text-lg text-font-primary mt-11">
                “This is the most outstanding app that I’ve ever try in my live,
                this app is such an amazing masterpiece and it’s suitable for
                you who is bussy with their bussiness and must transfer money to
                another person aut there. Just try this app and see the power!”
              </p>
            </div>
          </div>
          <div className="absolute xl:relative right-2 md:right-4 bg-white w-10 h-10 rounded-2xl grid place-items-center cursor-pointer">
            <i className="bi bi-arrow-right"></i>
          </div>
        </section>
      </main>
      <Footer />
    </Title>
  );
}

export default PublicRoute(Home);
