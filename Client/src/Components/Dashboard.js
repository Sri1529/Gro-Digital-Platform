import { useSpring, animated } from "react-spring";
import Confetti from "react-confetti";
import { FaRocket, FaStar, FaGlobe, FaSignOutAlt, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { logout } from "../store/reducer/loginReducer";
import { ValidateTokenAction } from "../store/actions/validateTokenAction";
import {
  DashboardContainer,
  WelcomeCard,
  InfoCards,
  InfoCard,
  LogoutButton,
  TokenValidationButton
} from './styles/DashboardStyles';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const welcomeShownRef = useRef(false);

  const { isValid, loading, user, error } = useSelector((state) => state.validateToken);
  const { accessToken } = useSelector((state) => state.login);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login', { replace: true });
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (user && !welcomeShownRef.current && window.toast) {
      window.toast.auth(`Welcome back, ${user.name || 'User'}!`, 4000);
      welcomeShownRef.current = true;
    }
  }, [user]);

  const floatProps = useSpring({
    from: { transform: "translateY(0px)" },
    to: { transform: "translateY(-20px)" },
    config: { duration: 2000 },
    loop: { reverse: true },
  });

  // useEffect(() => {
  //   const validateToken = async () => {
  //     try {
  //       const result = await dispatch(ValidateTokenAction()).unwrap();
  //       if (window.toast) {
  //         window.toast.auth(`Token validated successfully! Welcome ${result.user?.name || 'User'}!`, 4000);
  //       }
  //     } catch (error) {
  //       console.log("Token validation failed:", error);
  //       // If token validation fails, logout and redirect
  //       dispatch(logout());
  //       navigate('/login', { replace: true });
  //     }
  //   };
  //   const timer = setTimeout(validateToken, 1000);
  //   return () => clearTimeout(timer);
  // }, [dispatch, navigate]);

  const handleLogout = () => {
    window.toast?.logout("Logging out...", 2000);
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const validateTokenManually = async () => {
    try {
      window.toast?.info("Validating token...", 2000);
      const result = await dispatch(ValidateTokenAction()).unwrap();

      if (window.toast) {
        window.toast.auth(`Token is valid! User: ${result.user?.name || 'Unknown'}`, 4000);
      }
    } catch (error) {
      console.log("Manual token validation failed:", error);

    }
  };

  return (
    <DashboardContainer>
      <Confetti numberOfPieces={100} recycle={true} gravity={0.1} />


      <LogoutButton
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaSignOutAlt size={16} />
        Logout
      </LogoutButton>


      <TokenValidationButton
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        onClick={validateTokenManually}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaShieldAlt size={16} />
        Validate Token
      </TokenValidationButton>


      <WelcomeCard
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Welcome to <span className="highlight">Gro Digital Platform</span></h1>
        <p>Grow your digital presence, insights, and creativity here!</p>

        <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}> Token Status</h3>
          <p
            style={{
              margin: '5px 0',
              fontSize: '20px',
              fontWeight:"bold",
              color: loading ? 'black' : isValid ? 'black' : 'red',
            }}
          >
            Status: {loading ? 'Validating...' : isValid ? 'Valid' : 'Invalid'}
          </p>

          {user && (
            <p style={{ margin: '5px 0', fontSize: '14px' }}>
              User: {user.name} ({user.email})
            </p>
          )}
          {error && (
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#ff6b6b' }}>
              Error: {error.message || 'Unknown error'}
            </p>
          )}
        </div>
      </WelcomeCard>

      {/* Animated Info Cards */}
      <InfoCards>
        <InfoCard
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="gradient1"
        >
          <animated.div style={floatProps} className="icon">
            <FaRocket size={40} color="white" />
          </animated.div>
          <h2>Boost</h2>
          <p>Accelerate your growth</p>
        </InfoCard>

        <InfoCard
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="gradient2"
        >
          <animated.div style={floatProps} className="icon">
            <FaStar size={40} color="white" />
          </animated.div>
          <h2>Shine</h2>
          <p>Stand out in your field</p>
        </InfoCard>

        <InfoCard
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="gradient3"
        >
          <animated.div style={floatProps} className="icon">
            <FaGlobe size={40} color="white" />
          </animated.div>
          <h2>Global</h2>
          <p>Reach worldwide audience</p>
        </InfoCard>
      </InfoCards>
    </DashboardContainer>
  );
};

export default Dashboard;



