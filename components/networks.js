import Twitter from "./twitter";
import Reddit from "./reddit";
import LinkedIn from "./linkedin";
import Instagram from "./instagram";

const Networks = ({ credentials }) => {
  return (
    <div>
      <Twitter credentials={credentials} />
      <Reddit credentials={credentials} />
      <LinkedIn credentials={credentials} />
      <Instagram credentials={credentials} />
    </div>
  );
};

export default Networks;
