export default function Loading() {
    return (
        <div className="mt-4 space-y-6 min-h-screen max-w-7xl mx-auto p-8">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-4">
                    <div className="flex justify-between items-center border-neutral-800 border p-4 rounded animate-pulse">
                        <div className="flex-grow flex space-x-4">
                            <div className="h-6 bg-neutral-800 rounded w-32"></div>
                        </div>
                        <div className="space-x-2">
                            <div className="h-8 w-16 bg-neutral-800 rounded"></div>
                            <div className="h-8 w-16 bg-neutral-800 rounded"></div>
                        </div>
                    </div>
                    <div className="pl-20 space-y-3">
                        {[...Array(2)].map((_, index) => (
                            <div key={index} className="flex justify-between items-center border-neutral-800 border p-4 rounded animate-pulse">
                                <div className="h-6 bg-neutral-800 rounded w-24"></div>
                                <div className="space-x-2">
                                    <div className="h-8 w-16 bg-neutral-800 rounded"></div>
                                    <div className="h-8 w-16 bg-neutral-800 rounded"></div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center border-neutral-800 border p-4 rounded animate-pulse">
                            <div className="h-6 bg-neutral-800 rounded w-32"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
