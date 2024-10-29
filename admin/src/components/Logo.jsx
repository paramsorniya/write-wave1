import { Link } from "react-router-dom";

const Logo = ({ type }) => {
  return (
    <div className=''>
      <Link
        to='/'
        className={`text-2xl font-semibold ${type && "text-grey text-4xl"}`}
      >
        Write
        <span
          className={`text-3xl text-rose-500 ${type && " text-4xl font-bold"}`}
        >
          Wave
        </span>
      </Link>
    </div>
  );
};

export default Logo;