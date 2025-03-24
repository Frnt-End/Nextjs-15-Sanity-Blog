import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="pt-8 w-full flex justify-center">
        <div className="w-[95%] m-0 flex justify-around mb-10">
          <div className="text-left">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
            </Link>
          </div>
          <div>
            <Link className="btn" href="https://github.com/Frnt-End">
              github.com/Frnt-End
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
