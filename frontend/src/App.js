import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, MainContent, Register, NotFound } from './containers/public';
import { LayoutAdmin, MainContentAdmin, ListRoomType, AddRoomType, UpdateRoomType, AddHotel,UpdateHotel,ListHotel } from './containers/admin';

function ProtectedRoute({ children, allowedRole }) {
    const userRole = parseInt(localStorage.getItem('role'), 10);
    if (userRole !== allowedRole) {
        return <Navigate to="/not-found" />;
    }
    return children;
}
function App() {
    return (
        <div className="h-screen bg-primary">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}>
                        <Route index element={<MainContent />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/notfound" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="/notfound" />} />
                    </Route>
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute allowedRole={1}>
                                <LayoutAdmin />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<MainContentAdmin />} />
                        <Route path="addRoomType" element={<AddRoomType />} />
                        <Route path="roomType" element={<ListRoomType />} />
                        <Route path="updateRoomType/:id" element={<UpdateRoomType />} />
                        <Route path="addHotel" element={<AddHotel />} />
                        <Route path="hotel" element={<ListHotel />} />
                        <Route path="updateHotel/:id" element={<UpdateHotel />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
