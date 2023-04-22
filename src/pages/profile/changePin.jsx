import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Title from "@/components/title";
import Aside from "@/components/Aside";

function ChangePin() {
  return (
    <Title>
      <Header />
      <main className="flex gap-5 px-4 xl:px-36 py-10 bg-secondary font-nunitosans">
        <Aside />
        <section className="flex flex-col p-8 md:w-[736px] xl:w-[53.125rem] xl:h-[42.375rem] bg-white rounded-xl shadow-lg">
          <h1 className="font-bold text-lg">Change PIN</h1>
          <p className="w-[21.375rem] text-font-primary-blur mt-6">
            Enter your current 6 digits Fazzpay PIN below to continue to the
            next steps.
          </p>
        </section>
      </main>
      <Footer />
    </Title>
  );
}

export default ChangePin;
