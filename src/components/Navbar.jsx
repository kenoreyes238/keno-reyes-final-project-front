export default function Navbar() {
    const handleSignOut = async () => {
        try {
            const jwtToken = localStorage.getItem('jwt'); // Assuming you're storing the JWT token in localStorage
            const response = await fetch('http://localhost:3001/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            if (response.ok) {
                window.location.href = '/login';
            } else {
                console.error('Sign-out failed:', await response.json());
            }
        } catch (error) {
            console.error('Error during sign-out:', error);
        }
    };

    return (
        <div className="navbar">
            <h3>MyInventory</h3>
            <button className="signOut" onClick={handleSignOut}>Sign out</button>
        </div>
    );
}