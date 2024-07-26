import React from 'react';

const BanAccount = ({ id, ban, onToggle }) => {
    const handleClick = () => {
        onToggle(id, ban);
    };

    return (
        <button
            className={`btn btn-${ban ? 'success' : 'warning'}`}
            onClick={handleClick}
        >
            {ban ? 'Unban' : 'Ban'}
        </button>
    );
};

export default BanAccount;
