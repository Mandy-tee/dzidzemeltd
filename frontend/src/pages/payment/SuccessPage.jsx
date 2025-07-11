import { FaCheckCircle } from 'react-icons/fa';

const SuccessPage = () => {
    return (
        <div className="min-h-screen mt-20 bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <header className="flex flex-col items-center mb-8">
                <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                <h1 className="text-4xl font-extrabold text-gray-900 text-center">Payment Successful! 🎉</h1>
            </header>

            <section className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mb-8 text-center">
                <p className="text-lg text-gray-700 mb-4">
                    Thank you for your payment. Your transaction has been completed successfully.
                    You'll receive a confirmation shortly.
                </p>
            </section>
        </div>
    );
};

export default SuccessPage;