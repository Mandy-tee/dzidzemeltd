import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBagIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import CheckoutSdk from "@hubteljs/checkout";

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Ghana',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    momoProvider: 'mtn',
    momoNumber: '',
    saveInfo: true,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (stepNumber) => {
    const errors = {};

    if (stepNumber === 1) {
      if (!formData.firstName.trim()) errors.firstName = 'First name is required';
      if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
      if (!formData.phone.trim()) errors.phone = 'Phone number is required';
      if (!formData.address.trim()) errors.address = 'Address is required';
      if (!formData.city.trim()) errors.city = 'City is required';
      if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';
    } else if (stepNumber === 2) {
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required';
        if (!formData.cardName.trim()) errors.cardName = 'Name on card is required';
        if (!formData.cardExpiry.trim()) errors.cardExpiry = 'Expiry date is required';
        if (!formData.cardCvc.trim()) errors.cardCvc = 'CVC is required';
      } else if (formData.paymentMethod === 'momo') {
        if (!formData.momoNumber.trim()) errors.momoNumber = 'Mobile money number is required';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep(step)) return;

    setIsProcessing(true);

    // Simulate processing payment
    setTimeout(() => {
      setIsProcessing(false);
      // Order successful
      clearCart();
      navigate('/order-confirmation');
    }, 2000);
  };

  const hubtelCheckout = () => {
    // Initialize the Checkout SDK
    const checkout = new CheckoutSdk();

    // Purchase information
    const purchaseInfo = {
      amount: 50,
      purchaseDescription:
        "Payment of GHS 5.00 for (18013782) (MR SOMUAH STA ADANE-233557913587)",
      customerPhoneNumber: "233557913587",
      clientReference: "unique-client-reference-12345",
    };

    // Configuration options
    const config = {
      branding: "enabled",
      callbackUrl: "https://yourcallbackurl.com",
      merchantAccount: 11334,
      basicAuth: "your-basic-auth-here",
    };

    // A function to open the payment modal
    checkout.openModal({
      purchaseInfo,
      config,
      callBacks: {
        onInit: () => console.log("Iframe initialized: "),
        onPaymentSuccess: (data) => {
          console.log("Payment succeeded: ", data);
          // You can close the popup here
          checkout.closePopUp();
        },
        onPaymentFailure: (data) => console.log("Payment failed: ", data),
        onLoad: () => console.log("Checkout has been loaded: "),
        onFeesChanged: (fees) =>
          console.log("Payment channel has changed: ", fees),
        onResize: (size) =>
          console.log("Iframe has been resized: ", size?.height),
        onClose: (size) => console.log("The modal has closed ", size?.height),
      },
    });
  }

  const subtotal = getCartTotal();
  const shipping = formData.shippingMethod === 'express' ? 15 : (subtotal > 50 ? 0 : 10);
  const total = subtotal + shipping;

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">Checkout</h1>

          <div className="hidden sm:flex items-center text-sm font-medium">
            <Link to="/cart" className={`${step > 1 ? 'text-primary-500' : 'text-slate-800 dark:text-slate-200'}`}>
              Cart
            </Link>
            <ChevronRightIcon className="w-4 h-4 mx-2 text-slate-400" />
            <span className={`${step >= 1 ? 'text-primary-500' : 'text-slate-800 dark:text-slate-200'}`}>
              Information
            </span>
            <ChevronRightIcon className="w-4 h-4 mx-2 text-slate-400" />
            <span className={`${step >= 2 ? 'text-primary-500' : 'text-slate-800 dark:text-slate-200'}`}>
              Payment
            </span>
            <ChevronRightIcon className="w-4 h-4 mx-2 text-slate-400" />
            <span className={`${step >= 3 ? 'text-primary-500' : 'text-slate-800 dark:text-slate-200'}`}>
              Confirmation
            </span>
          </div>
        </div>

        <div className="mb-6">
          <Link
            to={step === 1 ? "/cart" : "#"}
            onClick={step > 1 ? prevStep : undefined}
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-500"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            {step === 1 ? 'Back to Cart' : 'Back to Information'}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-heading font-semibold">
                  {step === 1 ? 'Shipping Information' : 'Payment Method'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block mb-1 font-medium">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`form-input ${formErrors.firstName ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                        />
                        {formErrors.firstName && (
                          <p className="mt-1 text-sm text-accent-500">{formErrors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block mb-1 font-medium">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`form-input ${formErrors.lastName ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                        />
                        {formErrors.lastName && (
                          <p className="mt-1 text-sm text-accent-500">{formErrors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="email" className="block mb-1 font-medium">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-input ${formErrors.email ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-accent-500">{formErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block mb-1 font-medium">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`form-input ${formErrors.phone ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-accent-500">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="address" className="block mb-1 font-medium">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`form-input ${formErrors.address ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                      />
                      {formErrors.address && (
                        <p className="mt-1 text-sm text-accent-500">{formErrors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label htmlFor="city" className="block mb-1 font-medium">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`form-input ${formErrors.city ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                        />
                        {formErrors.city && (
                          <p className="mt-1 text-sm text-accent-500">{formErrors.city}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="state" className="block mb-1 font-medium">
                          State / Region
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label htmlFor="postalCode" className="block mb-1 font-medium">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={`form-input ${formErrors.postalCode ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                        />
                        {formErrors.postalCode && (
                          <p className="mt-1 text-sm text-accent-500">{formErrors.postalCode}</p>
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="country" className="block mb-1 font-medium">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="Ghana">Ghana</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Shipping Method</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className={`border ${formData.shippingMethod === 'standard' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' : 'border-slate-300 dark:border-slate-600'} rounded-lg p-4 cursor-pointer transition-colors`}>
                          <div className="flex items-start">
                            <input
                              type="radio"
                              name="shippingMethod"
                              value="standard"
                              checked={formData.shippingMethod === 'standard'}
                              onChange={handleChange}
                              className="mt-1 mr-3"
                            />
                            <div>
                              <div className="font-medium">Standard Shipping</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                {subtotal > 50 ? 'Free' : '₵10.00'} (2-5 business days)
                              </div>
                            </div>
                          </div>
                        </label>

                        <label className={`border ${formData.shippingMethod === 'express' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' : 'border-slate-300 dark:border-slate-600'} rounded-lg p-4 cursor-pointer transition-colors`}>
                          <div className="flex items-start">
                            <input
                              type="radio"
                              name="shippingMethod"
                              value="express"
                              checked={formData.shippingMethod === 'express'}
                              onChange={handleChange}
                              className="mt-1 mr-3"
                            />
                            <div>
                              <div className="font-medium">Express Shipping</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                ₵15.00 (1-2 business days)
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Link to="/cart" className="btn btn-outline">
                        Back to Cart
                      </Link>
                      <button
                        type="button"
                        onClick={hubtelCheckout}
                        className="btn btn-primary hover:bg-secondary-500"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <h3 className="font-medium mb-3">Payment Method</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <label className={`border ${formData.paymentMethod === 'card' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' : 'border-slate-300 dark:border-slate-600'} rounded-lg p-4 cursor-pointer transition-colors`}>
                          <div className="flex items-start">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="card"
                              checked={formData.paymentMethod === 'card'}
                              onChange={handleChange}
                              className="mt-1 mr-3"
                            />
                            <div>
                              <div className="font-medium">Credit/Debit Card</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Pay with Visa, Mastercard, or other cards
                              </div>
                            </div>
                          </div>
                        </label>

                        <label className={`border ${formData.paymentMethod === 'momo' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' : 'border-slate-300 dark:border-slate-600'} rounded-lg p-4 cursor-pointer transition-colors`}>
                          <div className="flex items-start">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="momo"
                              checked={formData.paymentMethod === 'momo'}
                              onChange={handleChange}
                              className="mt-1 mr-3"
                            />
                            <div>
                              <div className="font-medium">Mobile Money</div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Pay with MTN MoMo, AirtelTigo, or Telecel
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>

                      {formData.paymentMethod === 'card' && (
                        <div className="border border-slate-300 dark:border-slate-600 rounded-lg p-6">
                          <div className="flex items-center mb-6">
                            <LockClosedIcon className="w-5 h-5 text-primary-500 mr-2" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              Your payment information is secure and encrypted
                            </span>
                          </div>

                          <div className="mb-6">
                            <label htmlFor="cardNumber" className="block mb-1 font-medium">
                              Card Number *
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              placeholder="1234 5678 9012 3456"
                              className={`form-input ${formErrors.cardNumber ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                            />
                            {formErrors.cardNumber && (
                              <p className="mt-1 text-sm text-accent-500">{formErrors.cardNumber}</p>
                            )}
                          </div>

                          <div className="mb-6">
                            <label htmlFor="cardName" className="block mb-1 font-medium">
                              Name on Card *
                            </label>
                            <input
                              type="text"
                              id="cardName"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleChange}
                              className={`form-input ${formErrors.cardName ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                            />
                            {formErrors.cardName && (
                              <p className="mt-1 text-sm text-accent-500">{formErrors.cardName}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="cardExpiry" className="block mb-1 font-medium">
                                Expiry Date *
                              </label>
                              <input
                                type="text"
                                id="cardExpiry"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                className={`form-input ${formErrors.cardExpiry ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                              />
                              {formErrors.cardExpiry && (
                                <p className="mt-1 text-sm text-accent-500">{formErrors.cardExpiry}</p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="cardCvc" className="block mb-1 font-medium">
                                CVC *
                              </label>
                              <input
                                type="text"
                                id="cardCvc"
                                name="cardCvc"
                                value={formData.cardCvc}
                                onChange={handleChange}
                                placeholder="123"
                                className={`form-input ${formErrors.cardCvc ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                              />
                              {formErrors.cardCvc && (
                                <p className="mt-1 text-sm text-accent-500">{formErrors.cardCvc}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {formData.paymentMethod === 'momo' && (
                        <div className="border border-slate-300 dark:border-slate-600 rounded-lg p-6">
                          <div className="mb-6">
                            <label htmlFor="momoProvider" className="block mb-1 font-medium">
                              Mobile Money Provider *
                            </label>
                            <select
                              id="momoProvider"
                              name="momoProvider"
                              value={formData.momoProvider}
                              onChange={handleChange}
                              className="form-input"
                            >
                              <option value="mtn">MTN Mobile Money</option>
                              <option value="airtel">AirtelTigo Money</option>
                              <option value="vodafone">Telecel Cash</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor="momoNumber" className="block mb-1 font-medium">
                              Mobile Money Number *
                            </label>
                            <input
                              type="tel"
                              id="momoNumber"
                              name="momoNumber"
                              value={formData.momoNumber}
                              onChange={handleChange}
                              placeholder="0XX XXX XXXX"
                              className={`form-input ${formErrors.momoNumber ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                            />
                            {formErrors.momoNumber && (
                              <p className="mt-1 text-sm text-accent-500">{formErrors.momoNumber}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          name="saveInfo"
                          checked={formData.saveInfo}
                          onChange={handleChange}
                          className="mt-1 mr-3"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Save my information for faster checkout next time
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="btn btn-outline"
                      >
                        Back to Information
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Complete Order'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6 sticky top-24">
              <h2 className="text-xl font-heading font-semibold mb-6">Order Summary</h2>

              <div className="divide-y divide-slate-200 dark:divide-slate-700 mb-6 max-h-[50vh] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 flex items-center justify-between">
                    <div className="flex items-center flex-grow min-w-0">
                      <div className="relative mr-4 flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>

                      <div className="min-w-0 flex-grow">
                        <h4 className="font-medium truncate">{item.name}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                          {item.variant}
                        </p>
                      </div>
                    </div>

                    <div className="font-medium ml-4 flex-shrink-0">
                      ₵{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                  <span className="font-medium">₵{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-success-500">Free</span>
                  ) : (
                    <span className="font-medium">₵{shipping.toFixed(2)}</span>
                  )}
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-xl">₵{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-center mb-2">
                  <LockClosedIcon className="w-4 h-4 mr-1" />
                  <span>Secure Checkout</span>
                </div>
                <p className="text-center">
                  Your payment information is processed securely. We do not store credit card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;