import Twitter from "./twitter";

const Networks = ({ credentials }) => {
  return (
    <div>
      <Twitter credentials={credentials} />
    </div>
  );
};

export default Networks;
