class UserSerializer {
    static base(user) {
        if (!user) return null;

        return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
};

export default UserSerializer;