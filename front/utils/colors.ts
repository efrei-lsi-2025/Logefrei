export const bookingStatusColor: Record<
    'Accepted' | 'Pending' | 'Rejected' | 'Canceled',
    { color: string; textColor: string }
> = {
    Accepted: {
        color: '#10B981',
        textColor: 'white'
    },
    Pending: {
        color: '#F59E0B',
        textColor: 'white'
    },
    Rejected: {
        color: '#EF4444',
        textColor: 'white'
    },
    Canceled: {
        color: '#6B7280',
        textColor: 'white'
    }
};
