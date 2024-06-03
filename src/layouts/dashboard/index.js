import { Navigate, Outlet } from "react-router-dom";
import { Stack } from '@mui/material';
import SideBar from "./SideBar";

const DashboardLayout = () => {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
//   const isAuthenticated = ![undefined, null, ''].includes(localStorage.getItem('user_name'));
// if(!isAuthenticated){
//   console.log('not login')
//   return <Navigate to='/auth/login'/>;
// }
  return (
    <Stack direction='row' sx={{ height: '100%' }}>
      {/* SideBar */}
      {/* <SideBar/> */}
      <Outlet />
    </Stack>
    
  );
};

export default DashboardLayout;
