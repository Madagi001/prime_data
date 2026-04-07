export const mockData = {
    user: {
        name: "Ibrahim",
        walletBalance: 14500.50,
        commission: 250.00
    },
    categories: [
        {
            id: 'c1', name: 'Data', icon: 'Wifi', color: '#3EAEFF', desc: 'SME, CG, Gifting',
            services: [
                { id: 'd1', name: 'Buy Data', icon: 'Wifi', color: '#3EAEFF', badge: 'Hot' },
                { id: 'd2', name: 'SME Data', icon: 'Database', color: '#8B5CF6', badge: 'Cheap' },
                { id: 'd3', name: 'Data Pins', icon: 'CreditCard', color: '#14B8A6' },
                { id: 'd4', name: 'Corporate Data', icon: 'Briefcase', color: '#6366F1' },
            ]
        },
        {
            id: 'c2', name: 'Airtime', icon: 'Phone', color: '#10B981', desc: 'Buy & Convert',
            services: [
                { id: 'a1', name: 'Buy Airtime', icon: 'Phone', color: '#10B981' },
                { id: 'a2', name: 'Airtime to Cash', icon: 'Repeat', color: '#F59E0B' },
                { id: 'a3', name: 'Airtime Transfer', icon: 'Send', color: '#6366F1' },
            ]
        },
        {
            id: 'c3', name: 'Bills', icon: 'Zap', color: '#F59E0B', desc: 'Power & TV',
            services: [
                { id: 'b1', name: 'Electricity', icon: 'Zap', color: '#F59E0B' },
                { id: 'b2', name: 'Cable TV', icon: 'Tv', color: '#8B5CF6' },
                { id: 'b3', name: 'Internet Subscription', icon: 'Globe', color: '#3B82F6' },
                { id: 'b4', name: 'Exam Pins', icon: 'GraduationCap', color: '#EF4444' },
            ]
        },
        {
            id: 'c4', name: 'Wallet', icon: 'Wallet', color: '#6366F1', desc: 'Fund & Transfer',
            services: [
                { id: 'w1', name: 'Fund Wallet', icon: 'PlusCircle', color: '#10B981' },
                { id: 'w2', name: 'Transfer to User', icon: 'Users', color: '#3B82F6' },
                { id: 'w3', name: 'Withdraw Money', icon: 'ArrowDownCircle', color: '#EF4444' },
                { id: 'w4', name: 'History', icon: 'Clock', color: '#8B5CF6' },
            ]
        },
        {
            id: 'c5', name: 'Rewards', icon: 'Gift', color: '#F43F5E', desc: 'Bonus & Promos',
            services: [
                { id: 'r1', name: 'Auto Renew Bonus', icon: 'RefreshCw', color: '#10B981' },
                { id: 'r2', name: 'Referral Program', icon: 'UserPlus', color: '#6366F1', badge: 'Hot' },
                { id: 'r3', name: 'Daily Cashback', icon: 'Coins', color: '#F59E0B' },
            ]
        },
        {
            id: 'c6', name: 'Reseller', icon: 'TrendingUp', color: '#14B8A6', desc: 'Business API',
            services: [
                { id: 'rs1', name: 'Become Reseller', icon: 'Award', color: '#F59E0B' },
                { id: 'rs2', name: 'Bulk Purchase', icon: 'Package', color: '#8B5CF6' },
                { id: 'rs3', name: 'Earnings Board', icon: 'BarChart2', color: '#10B981' },
            ]
        },
        {
            id: 'c7', name: 'Support', icon: 'LifeBuoy', color: '#9CA3AF', desc: 'Help & FAQ',
            services: [
                { id: 's1', name: 'WhatsApp Support', icon: 'MessageCircle', color: '#10B981' },
                { id: 's2', name: 'FAQs', icon: 'HelpCircle', color: '#3B82F6' },
                { id: 's3', name: 'Report Issue', icon: 'AlertTriangle', color: '#EF4444' },
            ]
        }
    ],
    transactions: [
        { id: '1', type: 'Data Purchase', desc: 'MTN 1GB (SME)', amount: 260, status: 'Successful', date: 'Today, 10:42 AM', isCredit: false },
        { id: '2', type: 'Wallet Funding', desc: 'Bank Transfer via Monnify', amount: 5000, status: 'Successful', date: 'Yesterday, 2:15 PM', isCredit: true },
        { id: '3', type: 'Airtime', desc: 'Airtel VTU N500', amount: 490, status: 'Successful', date: 'Mar 28, 8:20 AM', isCredit: false },
        { id: '4', type: 'Cable TV', desc: 'GOTV Jinja', amount: 2700, status: 'Successful', date: 'Mar 25, 4:00 PM', isCredit: false },
    ]
};
