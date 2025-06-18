export default function CancelPage() {
  return (
    <main className="max-w-2xl mx-auto text-center p-10">
      <h1 className="text-3xl font-bold mb-4 text-red-600">❌ Payment Cancelled</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your payment was not completed. You can try again or contact support.
      </p>
      <a href="/cart" className="text-blue-600 underline text-lg">
        Return to Cart
      </a>
    </main>
  );
}
