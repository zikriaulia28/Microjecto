import Image from "next/image";
import Link from "next/link";
import placeholder from "../../assets/header/Placeholder.png";

function CardReceiver(props) {
  const imgUrl =
    "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/" +
    props.img;
  return (
    <Link
      href={`/transfer/${props.userId}`}
      className="flex w-full rounded-xl border px-5 py-2 hover:shadow-xl hover:scale-[1]  cursor-pointer"
    >
      <div className="avatar">
        <div className="w-16 mask mask-squircle">
          <Image
            src={props.img ? imgUrl : placeholder}
            alt="display-profile"
            width={50}
            height={50}
            className="w-full"
          />
        </div>
      </div>
      <span className="flex flex-col max-w-[66%] md:w-fit justify-between ml-5">
        <h1 className="md:text-lg font-bold">
          {props.firstName && props.lastName
            ? props.firstName + " " + props.lastName
            : "No Name"}
        </h1>
        <p className="text-grey text-sm md:text-base">
          {props.tlp ? props.tlp : "-"}
        </p>
      </span>
    </Link>
  );
}

export default CardReceiver;
