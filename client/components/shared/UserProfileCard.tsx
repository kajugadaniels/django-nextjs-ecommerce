import React from 'react';
import Image from 'next/image';
import { UserResource } from '@clerk/types';

interface UserProfileCardProps {
    user: UserResource | null | undefined;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
    if (!user) return null;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-20 h-20 mb-4">
                <img
                    src={user.imageUrl || 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg'}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full"
                />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{user.fullName}</h3>
            <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
            <div className="mt-4 text-sm text-gray-600">
                <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
                <p>Last sign in: {new Date(user.lastSignInAt || '').toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default UserProfileCard;