import { createContext, useContext, useEffect, useState } from "react";
import { authoLogin, getAllUsers, loginUser, logoutUser, signupUser, updateUser } from "../services/authservice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');

    useEffect(() => {
        const checkUser = async () => {

            try {
                const { data } = await authoLogin();
                setUser(data.user);
            } catch (err) {
                console.log("Not logged in:", err.response?.data?.message || err.message);
            }
        }
        checkUser();

        fetchUsers();

    }, []);

    const signup = async (data) => {
        const toastId = toast.loading('Signing up...');
        try {
            const response = await signupUser(data);
            if (!response) {
                throw new Error('Signup failed');
            }
            toast.update(toastId, {
                render: 'Signup successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            setActiveTab("login")
        } catch (error) {
            toast.update(toastId, {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    console.log("heyyy", user);

    const login = async (data) => {
        const toastId = toast.loading('logining...');
        try {
            const response = await loginUser(data);
            if (!response) {
                throw new Error('Login failed');
            }
            setUser(response.data.user);


            await fetchUsers();

            toast.update(toastId, {
                render: 'Login successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            navigate('/')

        }
        catch (error) {
            toast.update(toastId, {
                render: error.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    }


    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            if (!response) {
                throw new Error('Failed to load users');
            }
            setUsers(response.data.users);
            if (user.role === 'admin') {
                await fetchUsers();
            }

        } catch (err) {
            console.log(err)

        }
    }

    const updateUserrr = async (id, updateData) => {
        const toastId = toast.loading('Updating...');

        try {
            const { data } = await updateUser(id, updateData);
            // update local users state
            setUsers((prev) =>
                prev.map((u) => (u._id === id ? data.user : u))
            );

            toast.update(toastId, {
                render: 'Updated successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            return data.user;
        } catch (err) {
            toast.update(toastId, {
                render: err.response?.data?.message || "Failed to update user",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            throw err;
        }
    };

    const logout = async () => {
        const toastId = toast.loading('Logging out...');
        try {
            await logoutUser()
            setUser(null);
            toast.update(toastId, {
                render: 'Logout successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
            navigate('/authentication');

        } catch (err) {
            toast.update(toastId, {
                render: err.response.data.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    }
    return (
        <AuthContext.Provider value={{ userCount: users.length, user, users, activeTab, setActiveTab, signup, login, logout, updateUserrr }}>
            {children}
        </AuthContext.Provider>
    )

}