import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const ChangePassword = () => {
    const { changeUserPassword } = useAuth();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false); // დავამატოთ ლოუდინგი

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true); // პროცესი დაიწყო
        try {
            // ველოდებით სერვერის პასუხს
            await changeUserPassword({
                currentPassword,
                newPassword,
            });
            
            alert("Password changed successfully!");
            
            // ფორმის გასუფთავება მხოლოდ წარმატების შემთხვევაში
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            // შეცდომის ჩვენება (მაგ: არასწორი ძველი პაროლი)
            alert(error.message || "Failed to change password");
        } finally {
            setLoading(false); // პროცესი დასრულდა
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: 400 }}>
            <h2>Change Password</h2>

            <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6} // უსაფრთხოებისთვის კარგია მინიმალური ზღვარი
            />

            <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Change password"}
            </button>
        </form>
    );
}

export default ChangePassword;