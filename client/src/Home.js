import { ConnectWallet } from "@thirdweb-dev/react";
import BackVideo from './media/BackVideo.mp4';
import './styles/Home.css';
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <ConnectWallet 
      className="connect-btn"
      detailsBtn={() => {
        return navigate('/marketplace');
      }}
      />
      <video id='BackgroundVideo' src={BackVideo} loop muted autoPlay></video>
    </div>
  );
}

export default Home;