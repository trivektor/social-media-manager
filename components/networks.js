import Twitter from "./twitter";
import Reddit from "./reddit";

const Networks = ({ credentials }) => {
  return (
    <div>
      <Twitter credentials={credentials} />
      <Reddit credentials={credentials} />
    </div>
  );
};

export default Networks;
