import Twitter from "./twitter";
import Reddit from "./reddit";
import LinkedIn from "./linkedin";

const Networks = ({ credentials }) => {
  return (
    <div>
      <Twitter credentials={credentials} />
      <Reddit credentials={credentials} />
      <LinkedIn credentials={credentials} />
    </div>
  );
};

export default Networks;
