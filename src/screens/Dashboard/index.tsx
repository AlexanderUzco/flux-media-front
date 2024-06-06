import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard {user?.username && `, welcome ${user.username}`}</h1>
    </div>
  );
};

export default Dashboard;
