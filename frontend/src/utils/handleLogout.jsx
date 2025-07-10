

const HandleLogout = (navigate) => {
  return () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
};

export default HandleLogout;




