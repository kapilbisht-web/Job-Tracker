// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';

// const AppRouter = () => {
//   const user = JSON.parse(localStorage.getItem('user'));

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Default route shows Register */}
//         <Route
//           path="/"
//           element={!user ? <Register /> : <Navigate to="/dashboard" />}
//         />
//         <Route
//           path="/login"
//           element={!user ? <Login /> : <Navigate to="/dashboard" />}
//         />
//         <Route
//           path="/dashboard"
//           element={user ? <Dashboard /> : <Navigate to="/" />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRouter;